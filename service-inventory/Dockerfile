FROM golang:1.20 AS builder
WORKDIR /app
COPY go.mod ./
RUN go mod download
COPY . .
RUN go build -o estoque-service

FROM alpine:latest
WORKDIR /root/
COPY --from=builder /app/estoque-service .
EXPOSE 8001
CMD ["./estoque-service"]
