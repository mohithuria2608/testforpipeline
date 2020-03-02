#!/bin/bash


# read the yml template from a file and substitute the string 


template=`cat "./Deployment_cicd/deployment.yaml" | sed "s@{{Users_image}}@$Users_image@g"`
template=`echo "$template" | sed "s@{{Auth_image}}@$Auth_image@g"`
template=`echo "$template" | sed "s@{{Menu_image}}@$Menu_image@g"`
template=`echo "$template" | sed "s@{{Order_image}}@$Order_image@g"`
template=`echo "$template" | sed "s@{{Deeplink_image}}@$Deeplink_image@g"`
template=`echo "$template" | sed "s@{{Kafka_image}}@$Kafka_image@g"`
template=`echo "$template" | sed "s@{{Sync_image}}@$Sync_image@g"`
template=`echo "$template" | sed "s@{{Location_image}}@$Location_image@g"`
template=`echo "$template" | sed "s@{{Upload_image}}@$Upload_image@g"`
template=`echo "$template" | sed "s@{{Payment_image}}@$Payment_image@g"`
template=`echo "$template" | sed "s@{{Promotion_image}}@$Promotion_image@g"`
template=`echo "$template" | sed "s@{{Notification_image}}@$Notification_image@g"`
template=`echo "$template" | sed "s@{{Log_image}}@$Log_image@g"`
template=`echo "$template" | sed "s@{{Home_image}}@$Home_image@g"`




# apply the yml with the substituted value
echo "$template" | kubectl apply -f -

# Deploy the HPA for Application pods
 for dep in `kubectl get deploy -n nodeapp|grep -i service|awk '{print $1}'`
  do
  echo "---"
  echo "apiVersion: autoscaling/v1
kind: HorizontalPodAutoscaler
metadata:
  name: "$dep"autoscaler
  namespace: nodeapp
spec:
  maxReplicas: 8
  minReplicas: 3
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: "$dep"
  targetCPUUtilizationPercentage: 70"
  done > ./Deployment_cicd/hpa.yaml
  
kubectl apply -f ./Deployment_cicd/hpa.yaml 

kubectl apply -f ./Deployment_cicd/ingress.yaml

