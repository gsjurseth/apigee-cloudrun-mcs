#!/bin/bash

gcloud run services replace $1.yaml

if [ "$1" != "caller-service" ] 
then
  echo Y | gcloud run services set-iam-policy $1 policy.yaml --region=europe-west1> /dev/null 2>&1
fi
