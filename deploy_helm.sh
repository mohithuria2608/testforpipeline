#!/bin/bash


# read the yml template from a file and substitute the string 

cat "./deployment.yaml"
template=`cat "./deployment.yaml" | sed "s/{{Users_image}}/$Users_image/g"`
template=`cat $template | sed "s/{{Auth_image}}/$Auth_image/g"`
template=`cat $template | sed "s/{{Menu_image}}/$Menu_image/g"`

# apply the yml with the substituted value
echo $template