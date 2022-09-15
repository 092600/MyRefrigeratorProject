package getIngre

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"math"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"
)

// source data
type Ingredient struct {
	Response struct {
		Header struct {
			ResultCode string `json:"resultCode"`
			ResultMsg  string `json:"resultMsg"`
			Type       string `json:"type"`
		} `json:"header"`
		Body struct {
			Items []struct {
				FoodCd       string `json:"foodCd"`
				FoodNm       string `json:"foodNm"`
				DataCd       string `json:"dataCd"`
				TypeNm       string `json:"typeNm"`
				FoodOriginCd string `json:"foodOriginCd"`
				FoodOriginNm string `json:"foodOriginNm"`
				FoodLv3Cd    string `json:"foodLv3Cd"`
				FoodLv3Nm    string `json:"foodLv3Nm"`
				FoodLv4Cd    string `json:"foodLv4Cd"`
				FoodLv4Nm    string `json:"foodLv4Nm"`
				FoodLv5Cd    string `json:"foodLv5Cd"`
				FoodLv5Nm    string `json:"foodLv5Nm"`
				FoodLv6Cd    string `json:"foodLv6Cd"`
				FoodLv6Nm    string `json:"foodLv6Nm"`
				FoodLv7Cd    string `json:"foodLv7Cd"`
				FoodLv7Nm    string `json:"foodLv7Nm"`
				Enerc        string `json:"enerc"`
				Water        string `json:"water"`
				Prot         string `json:"prot"`
				Fatce        string `json:"fatce"`
				Ash          string `json:"ash"`
				Chocdf       string `json:"chocdf"`
				Sugar        string `json:"sugar"`
				Fibtg        string `json:"fibtg"`
				Ca           string `json:"ca"`
				Fe           string `json:"fe"`
				P            string `json:"p"`
				K            string `json:"k"`
				Nat          string `json:"nat"`
				VitaRae      string `json:"vitaRae"`
				Retol        string `json:"retol"`
				Cartb        string `json:"cartb"`
				Thia         string `json:"thia"`
				Ribf         string `json:"ribf"`
				Nia          string `json:"nia"`
				Vitc         string `json:"vitc"`
				Vitd         string `json:"vitd"`
				Chole        string `json:"chole"`
				Fasat        string `json:"fasat"`
				Fatrn        string `json:"fatrn"`
				SrcCd        string `json:"srcCd"`
				SrcNm        string `json:"srcNm"`
				ServSize     string `json:"servSize"`
				MfrNm        string `json:"mfrNm"`
				ImptNm       string `json:"imptNm"`
				DistNm       string `json:"distNm"`
				DataProdCd   string `json:"dataProdCd"`
				DataProdNm   string `json:"dataProdNm"`
				CrtYmd       string `json:"crtYmd"`
				CrtrYmd      string `json:"crtrYmd"`
				InsttCode    string `json:"insttCode"`
			} `json:"items"`
			TotalCount string `json:"totalCount"`
			NumOfRows  string `json:"numOfRows"`
			PageNo     string `json:"pageNo"`
		} `json:"body"`
	} `json:"response"`
}

type IngreRes struct {
	IngreName string `json:"ingreName"`
	Brand     string `json:"brand"`
}

// error check
func checkErr(err error) {
	if err != nil {
		log.Fatalln(err)
	}
}

// check statuscode
func checkCode(res *http.Response) {
	if res.StatusCode != 200 {
		log.Fatalln("StatusCode:", res.StatusCode)
	}
}

// hit page
func hitPage(URL string) []byte {
	res, err := http.Get(URL)
	checkErr(err)
	checkCode(res)
	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)
	checkErr(err)
	return body
}

// JSON UnMarshal
func toJSON(data []byte, ingre Ingredient) Ingredient {
	err := json.Unmarshal(data, &ingre)
	checkErr(err)

	return ingre
}

// count page num
func GetPageNum() int {
	var URL string = fmt.Sprintf("http://api.data.go.kr/openapi/tn_pubr_public_nutri_process_info_api?serviceKey=%s&pageNo=0&numOfRows=100&type=json", os.Getenv("API_KEY"))
	var ingre Ingredient
	ing := toJSON(hitPage(URL), ingre)
	cnt, err := strconv.ParseFloat(ing.Response.Body.TotalCount, 64)
	checkErr(err)

	return int(math.Ceil(cnt/100)) + 1
}

// extract data
func extractIngre(ingre Ingredient, index int, c chan<- IngreRes) {
	var ingreName string

	if strings.Contains(ingre.Response.Body.Items[index].FoodNm, "_") {
		ingreName = strings.Split(ingre.Response.Body.Items[index].FoodNm, "_")[1]
	} else {
		ingreName = ingre.Response.Body.Items[index].FoodNm
	}

	d := IngreRes{
		IngreName: ingreName,
		Brand:     ingre.Response.Body.Items[index].MfrNm,
	}

	c <- d
}

// extract all pages
func ExtractAllIngre(page int, ch chan []IngreRes) {
	var ingre Ingredient
	ingreJson := toJSON(hitPage(fmt.Sprintf("http://api.data.go.kr/openapi/tn_pubr_public_nutri_process_info_api?serviceKey=%s&pageNo=%d&numOfRows=100&type=json", os.Getenv("API_KEY"), page)), ingre)

	c := make(chan IngreRes)
	var res []IngreRes

	for i := 0; i < len(ingreJson.Response.Body.Items); i++ {
		go extractIngre(ingreJson, i, c)
	}

	for i := 0; i < len(ingreJson.Response.Body.Items); i++ {
		r := <-c
		res = append(res, r)
	}

	ch <- res
}

// save file
func ToFile(fullData []IngreRes) {
	fmt.Println(len(fullData))

	now := time.Now().Format("2006-01-02")
	j, err := json.Marshal(fullData)
	checkErr(err)

	err = os.WriteFile(fmt.Sprintf("Ingre_%s.json", now), j, 0644)
	checkErr(err)
}
