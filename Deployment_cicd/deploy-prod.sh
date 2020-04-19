#!/bin/bash


# read the yml template from a file and substitute the string 


template=`cat "./Deployment_cicd/deployment-prod.yaml" | sed "s@{{Users_image}}@$Users_image@g"`
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

#Apply HPA  
kubectl apply -f ./Deployment_cicd/hpa.yaml 

#temp=`cat "./Deployment_cicd/ingress.yaml" | sed "s@{{Ingress_tls_secret}}@$Ingress_tls_secret@g"


#echo "$temp" | kubectl apply -f -

