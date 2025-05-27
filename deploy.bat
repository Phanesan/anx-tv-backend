@echo off

echo === Aplicando Namespace ===
kubectl apply -f k8s/00-namespace.yaml

echo === Aplicando PersistentVolume ===
kubectl apply -f k8s/01-storage-class.yaml

echo === Aplicando PersistentVolumeClaim en DB ===
kubectl apply -f k8s/02-pvc-db.yaml

echo === Aplicando Deployment ===
kubectl apply -f k8s/03-deployment.yaml

echo === Aplicando Service ===
kubectl apply -f k8s/04-service.yaml

echo === Despliegue completado! ===
kubectl get pods -n prod

pause