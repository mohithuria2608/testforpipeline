![](./cover.png)

# Hands-on-Microservices-with-TypeScript-3
Hands-on Microservices with TypeScript 3 

## Sample prerequisites:
* NodeJS 10.17.0 or higher 
* Aerospike 3.13.0 or higher
* Typescript (npm i typescript -g)
* Mocha (npm i mocha -g)
* Docker (can use docker for windows/mac)
* Docker-compose 

## Sample code Usage:
* clone the whole repository to disk.

* for non-docker examples : 
    * run all service : 
        * local environment : sh local.sh
        * development environment : sh dev.sh
        * testing environment : sh qa.sh
    * run individual service : 
        * go into each service directory that has a package.json file in it, and install dependencies (npm install).
        * local environment : gulp local
        * development environment : gulp dev
        * testing environment : gulp qa

* for dockerized examples build container images 
    * use build.bat or run the same commands on mac
    * use run.bat to run the example, or run similar commands on mac cmdline.

.........................................................................................................................
# VPN connection data
* vpn.americana-food.com
* username : 
    Kfcapptestuser1
    Kfcapptestuser2 
    Kfcapptestuser3
* password : kfc@pp01 

# SDM Credentials
* HOST = 192.168.204.72
* PORT = 1521
* SERVICE_NAME =sdm.americana.global
* User : mobility
* Pass : u10mob34amr

# DEVELOPMENT
* ssh : 
    * ssh americana-nodeapi@40.123.210.73		
    * jy9ypeF8DQf2ZTLT
    * https://americananode.appskeeper.com/

* aerospike
    * ssh aerospikeusr@40.123.212.40
    * GM2nGDQkN5yMdPZs

* mongoDB 
    * 54.176.239.44:2798
    * americana_db
    * americana_dbusr
    * 96fMUpk2PGzbu8Hn

# TESTING 
* ssh :
    * ssh americana-qa@40.123.196.7
    * 99eL78gctCEbaYVC
    * http://americanaqa.appskeeper.com/

* aerospike
    * localhost

* mongoDB 
    * 54.176.239.44:2798
    * americana_db
    * americana_dbusr
    * 96fMUpk2PGzbu8Hn

# UAT
* ssh
    * ssh localadmin@13.74.15.162
    * Localadmin@2020
    * login to jenkins server :
        * ssh localadmin@amfuatnejnkvm02
        * kubectl get pods -n nodeapp
        * kubectl logs auth-service-5686bf859d-r8flt  -n nodeapp

* aerospike
    * kubectl exec -it aerospike-0 bash -n aerospikedb

* mongoDB
    * 40.127.244.213:10006
    * mongo url : mongodb://americana_dbusr_uat:AppInvDbUser@10.2.0.5:27017/americana_db

# Code commit on UAT
* URL : http://40.127.244.213:10004/americana/backend
* git add .
* git commit -m "update merge"
* git push http://40.127.244.213:10004/americana/backend.git ${current branch name of current origin}:${target branch name of target origin}

# Blob url
* 205 server : https://bloobstorage.blob.core.windows.net/americana/testing/kfc_uae_1_En.json
* 207 server : https://bloobstorage.blob.core.windows.net/americana/models/kfc_uae_1_En.json

# dev sdm url 
* https://sdkliveuae.americana.com.sa:2200/?wsdl

# prod sdm url
* https://sdkliveuae.americana.com.sa:2200/?wsdl


# retry option for kafka
* https://blog.pragmatists.com/retrying-consumer-architecture-in-the-apache-kafka-939ac4cb851a

# install aerospike prerequisite 
* sudo apt-get install g++ libssl1.0.0 libssl-dev libz-dev

# Aerospike error codes
* https://github.com/aerospike/aerospike-client-java/blob/master/client/src/com/aerospike/client/ResultCode.java

