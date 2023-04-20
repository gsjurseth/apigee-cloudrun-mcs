#!/bin/bash

docker build . -t  anothersimple-service
docker tag anothersimple-service gcr.io/apigee-product-demo/anothersimple-service
docker push gcr.io/apigee-product-demo/anothersimple-service
