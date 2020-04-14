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
        * ssh localadmin@amfuatnejnkvm01
        * kubectl get pods -n nodeapp
        * kubectl logs auth-service-5686bf859d-r8flt  -n nodeapp
* aerospike new on UAT 
    * ssh :
        * ssh localadmin@10.2.0.30
        * pass = Localadmin@2020
* hpa 
    * kubectl get hpa -n nodeapp
* mongoDB
    * 40.127.244.213:10006
    * mongo url : mongodb://americana_dbusr_uat:AppInvDbUser@10.2.0.5:27017/americana_db
* GIT 
    * URL : https://gitlab.americanarest.com/americana-foods/amf_backend
    * git add .
    * git commit -m "update merge"
    * git push https://gitlab.americanarest.com/americana-foods/amf_backend uat:uat

# PROD 
* ssh
    * ssh Localadmin@13.74.178.42
    * FoodMob@1996
    * login to jenkins server :
        * ssh Localadmin@10.1.1.6
        * Mob@pp@@2020
        * kubectl get pods -n nodeapp
        * kubectl logs auth-service-5686bf859d-r8flt  -n nodeapp
* hpa 
    * kubectl get hpa -n nodeapp
* mongoDB
    * 52.142.115.201:10005
    * mongo url : mongodb://admin:ebaN4cnM7hnu35Km@52.142.115.201:10005/?authSource=admin

* Graphana 
    * URL : http://52.142.115.201:10004/?orgId=1    
    * username = admin
    * password = WebApp@2020
    
* https://prod-api.americanarest.com/
* public ip : https://51.104.147.206/
* aerospike.aerospike.svc.cluster.local:3000  :: old aerospike


* GIT :
    * git pull https://gitlab.americanarest.com/americana-foods/amf_backend -b prod_final
    * username: root
    ​* password: WebApp@2020
    * git push https://gitlab.americanarest.com/americana-foods/amf_backend prod:prod_final

* Jenkins URL : http://52.142.115.201:10001/
    * admin
    * WebApp@2020

# Blob url
* 205 server : https://bloobstorage.blob.core.windows.net/americana/testing/kfc_uae_1_En.json
* 207 server : https://bloobstorage.blob.core.windows.net/americana/development/kfc_uae_1_En.json

# dev sdm url 
* https://sdkuatuae.americana.com.sa:1995/?wsdl

# prod sdm url
* https://sdkliveuae.americana.com.sa:1998/?wsdl


# retry option for kafka
* https://blog.pragmatists.com/retrying-consumer-architecture-in-the-apache-kafka-939ac4cb851a

# install aerospike prerequisite 
* sudo apt-get install g++ libssl1.0.0 libssl-dev libz-dev

# Aerospike error codes
* https://github.com/aerospike/aerospike-client-java/blob/master/client/src/com/aerospike/client/ResultCode.java

