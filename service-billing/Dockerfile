FROM golang:1.25-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o faturamento-service

FROM alpine:latest
WORKDIR /root/
COPY --from=builder /app/faturamento-service .
EXPOSE 8082
CMD ["/root/faturamento-service"]
