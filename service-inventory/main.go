package main

import (
    "encoding/json"
    "log"
    "net/http"
    "github.com/rs/cors"
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
    mux := http.NewServeMux()

    mux.HandleFunc("/products", func(w http.ResponseWriter, r *http.Request) {
        if r.Method == http.MethodGet {
            getProducts(w, r)
        } else if r.Method == http.MethodPost {
            addProduct(w, r)
        }
    })

    handler := cors.New(cors.Options{
            AllowedOrigins: []string{"http://localhost:4200"},
            AllowCredentials: true,
            Debug: true,
    }).Handler(mux)

    log.Println("Service Inventory running on port 8081")
    log.Fatal(http.ListenAndServe(":8081", handler))
}
