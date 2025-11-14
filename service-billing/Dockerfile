FROM golang:1.20 AS builder
WORKDIR /app
COPY go.mod  ./
RUN go mod download
COPY . .
RUN go build -o faturamento-service

FROM alpine:latest
WORKDIR /root/
COPY --from=builder /app/faturamento-service .
EXPOSE 8002
CMD ["./faturamento-service"]
