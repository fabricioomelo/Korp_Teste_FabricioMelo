package main

import (
    "encoding/json"
    "log"
    "net/http"
)

type Product struct {
    ID          int     `json:"id"`
    Code        string  `json:"code"`
    Description string  `json:"description"`
    Stock       int     `json:"stock"`
}

var products = []Product{}

func getProducts(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(products)
}

func addProduct(w http.ResponseWriter, r *http.Request) {
    var p Product
    json.NewDecoder(r.Body).Decode(&p)
    p.ID = len(products) + 1
    products = append(products, p)
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(p)
}

func main() {
    http.HandleFunc("/products", func(w http.ResponseWriter, r *http.Request) {
        if r.Method == http.MethodGet {
            getProducts(w, r)
        } else if r.Method == http.MethodPost {
            addProduct(w, r)
        } else {
            w.WriteHeader(http.StatusMethodNotAllowed)
        }
    })

    log.Println("Service Inventory running on port 8081")
    log.Fatal(http.ListenAndServe(":8081", nil))
}
