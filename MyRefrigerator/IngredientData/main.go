package main

import (
	"github.com/JngMkk/MyRefrigeratorProject/IngredientData/bulkData"
	"github.com/JngMkk/MyRefrigeratorProject/IngredientData/getIngre"
)

func main() {
	var ingres []getIngre.IngreRes
	ch := make(chan []getIngre.IngreRes)
	pages := getIngre.GetPageNum()

	for i := 0; i < pages; i++ {
		go getIngre.ExtractAllIngre(i, ch)
	}

	for i := 0; i < pages; i++ {
		ires := <-ch
		ingres = append(ingres, ires...)
	}

	getIngre.ToFile(ingres)

	bulkData.MakeBulk()
	bulkData.PostBulk("localhost:9200")
}
