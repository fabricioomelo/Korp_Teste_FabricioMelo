package main

import (
    "encoding/json"
    "log"
    "net/http"
    "github.com/rs/cors"
)

type Invoice struct {
    ID      int               `json:"id"`
    Number  int               `json:"number"`
    Status  string            `json:"status"`
    Items   map[string]int    `json:"items"`
}

var invoices = []Invoice{}
var invoiceCount = 0

func getInvoices(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(invoices)
}

func addInvoice(w http.ResponseWriter, r *http.Request) {
    var inv Invoice
    json.NewDecoder(r.Body).Decode(&inv)
    invoiceCount++
    inv.ID = invoiceCount
    inv.Number = invoiceCount
    inv.Status = "Aberta"
    invoices = append(invoices, inv)
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(inv)
}

func main() {
    mux := http.NewServeMux()

    mux.HandleFunc("/invoices", func(w http.ResponseWriter, r *http.Request) {
        if r.Method == http.MethodGet {
            getInvoices(w, r)
        } else if r.Method == http.MethodPost {
            addInvoice(w, r)
        }
    })

    handler := cors.New(cors.Options{
            AllowedOrigins: []string{"http://localhost:4200"},
            AllowCredentials: true,
            Debug: true,
    }).Handler(mux)

    log.Println("Service Billing running on port 8082")
    log.Fatal(http.ListenAndServe(":8082", handler))
}
