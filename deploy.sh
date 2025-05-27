#!/bin/bash

kubectl apply -f k8s/00-namespace.yaml

kubectl apply -f k8s/01-storage-class.yaml

kubectl apply -f k8s/02-pvc.yaml

kubectl apply -f k8s/03-deployment.yaml

kubectl apply -f k8s/04-service.yaml

kubectl get pods -n prod