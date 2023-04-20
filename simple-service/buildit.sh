#!/bin/bash

docker build . -t  simple-service
docker tag simple-service gcr.io/apigee-product-demo/simple-service
docker push gcr.io/apigee-product-demo/simple-service
