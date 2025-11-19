FROM golang:1.25-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o estoque-service

FROM alpine:latest
WORKDIR /root/
COPY --from=builder /app/estoque-service .
EXPOSE 8081
CMD ["/root/estoque-service"]
