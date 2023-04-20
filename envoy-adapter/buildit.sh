#!/bin/bash

docker build . -t  envoy_adapter
docker tag envoy_adapter gcr.io/apigee-product-demo/envoy_adapter
docker push gcr.io/apigee-product-demo/envoy_adapter
