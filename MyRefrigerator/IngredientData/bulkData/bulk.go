package bulkData

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"os"
	"os/exec"
	"time"
)

// data
type IngreRes struct {
	IngreName string `json:"ingreName"`
	Brand     string `json:"brand"`
}

// 오늘 날짜
var today string = time.Now().Format("2006-01-02")

// make bulk file
func MakeBulk() {
	var ingre []IngreRes

	d, err := os.Open(fmt.Sprintf("%s/src/github.com/JngMkk/sideProject/Ingre_%s.json", os.Getenv("GOPATH"), today))
	if err != nil {
		log.Fatalln(err)
	}

	byteVal, _ := io.ReadAll(d)

	err = json.Unmarshal(byteVal, &ingre)
	if err != nil {
		log.Fatalln(err)
	}

	body := []byte{}
	for i := 0; i < len(ingre); i++ {
		str1 := []byte(fmt.Sprintf("{\"index\": {\"_index\": \"ingre_%s\", \"_id\": %d}}\n", today, i+1))
		str2 := []byte(fmt.Sprintf("{\"ingreName\": \"%s\", \"brand\": \"%s\"}\n", ingre[i].IngreName, ingre[i].Brand))
		body = append(body, append(str1, str2...)...)
	}

	err = os.WriteFile(fmt.Sprintf("./Ingre_Bulk_%s.json", today), body, 0644)
	if err != nil {
		log.Fatalln(err)
	}
}

// insert bulkdata
func PostBulk(URL string) {
	app := "curl"
	arg1 := "-H"
	arg2 := "Content-Type: application/x-ndjson"
	arg3 := "-XPOST"
	arg4 := fmt.Sprintf("%s/ingre_%s/_bulk", URL, today)
	arg5 := "--data-binary"
	arg6 := fmt.Sprintf("@./Ingre_Bulk_%s.json", today)

	cmd := exec.Command(app, arg1, arg2, arg3, arg4, arg5, arg6)

	err := cmd.Run()
	if err != nil {
		log.Fatalln(err)
	}
}
