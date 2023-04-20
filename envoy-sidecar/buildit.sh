#!/bin/bash

docker build . -t  envoy-sidecar
docker tag envoy-sidecar gcr.io/apigee-product-demo/envoy-sidecar
docker push gcr.io/apigee-product-demo/envoy-sidecar
