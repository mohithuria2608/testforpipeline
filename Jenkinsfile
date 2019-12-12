pipeline {
    environment {
        registry = "americana.azurecr.io"
        registryCredential = "acr_cred"
        Users_image="americana.azurecr.io/users" + ":Users-Image_${env.BUILD_NUMBER}"
        Auth_image="americana.azurecr.io/auth" + ":auth-service_${env.BUILD_NUMBER}"
        Menu_image="americana.azurecr.io/menu"+ ":Menu-service_${env.BUILD_NUMBER}"
        Order_image="americana.azurecr.io/order"+ ":Order-service_${env.BUILD_NUMBER}"
        Deeplink_image="americana.azurecr.io/deeplink"+ ":Deeplink-service_${env.BUILD_NUMBER}"
        Kafka_image="americana.azurecr.io/kafka"+ ":Kafka-service_${env.BUILD_NUMBER}"
        Sync_image="americana.azurecr.io/sync"+ ":Sync-service_${env.BUILD_NUMBER}"
        Location_image="americana.azurecr.io/location"+ ":Location-service_${env.BUILD_NUMBER}"

        
    }
    agent any

    stages{
    	stage('Email'){
                steps{
                    emailext body: "<body><p><font size='+2'><b>Build Status: </b>Started <br> <b>Build Job: </b> ${env.JOB_NAME} <br><b> Build Number: </b> ${env.BUILD_NUMBER} </font> <br><br> <font size='+1'>More info at:  ${env.BUILD_URL}</font></p></body>", subject: "Jenkins Build Job : ${env.JOB_NAME}", to: 'suruchi.singh@appinventiv.com'
                }
        }
        stage('Clone repository') {
            steps{
                checkout scm
            }
        }/*
        stage('SonarQube Analysis'){
            environment {
                SONAR_SCANNER_OPTS = "-Xmx2g"
            }
            steps{
                script{
                    def scannerHome = tool 'SonarQubeScanner1'  
                    withSonarQubeEnv('SonarQube_Americana') {
                        sh "${scannerHome}/bin/sonar-scanner -Dproject.settings=${env.WORKSPACE}/Deployment_cicd/sonar-project.properties" 
                    }
                }
            }
        }*/
        stage('Build image') {
            steps{
                script{
                    AuthImage=docker.build(registry + "/auth" + ":auth-service_${env.BUILD_NUMBER}","-f ${env.WORKSPACE}/auth-service/Dockerfile  .")
                    UsersImage=docker.build(registry + "/users" + ":Users-Image_${env.BUILD_NUMBER}","-f ${env.WORKSPACE}/users-service/Dockerfile .")
                    MenuImage=docker.build(registry + "/menu"+ ":Menu-service_${env.BUILD_NUMBER}","-f ${env.WORKSPACE}/menu-service/Dockerfile .")
                    OrderImage=docker.build(registry + "/order"+ ":Order-service_${env.BUILD_NUMBER}","-f ${env.WORKSPACE}/order-service/Dockerfile .")
                    DeeplinkImage=docker.build(registry + "/deeplink"+ ":Deeplink-service_${env.BUILD_NUMBER}","-f ${env.WORKSPACE}/deeplink-service/Dockerfile .")
                    KafkaImage=docker.build(registry + "/kafka"+ ":Kafka-service_${env.BUILD_NUMBER}","-f ${env.WORKSPACE}/kafka-service/Dockerfile .")
                    SyncImage=docker.build(registry + "/sync"+ ":Sync-service_${env.BUILD_NUMBER}","-f ${env.WORKSPACE}/sync-service/Dockerfile .")
                    LocationImage=docker.build(registry + "/location"+ ":Location-service_${env.BUILD_NUMBER}","-f ${env.WORKSPACE}/location-service/Dockerfile .")

                }
            }
        }
        stage('Push Image to Azure Container Registry') {
            steps{
                script {
                    docker.withRegistry("https://americana.azurecr.io", registryCredential ) {
                        AuthImage.push()
                        UsersImage.push()
                        MenuImage.push()
                        OrderImage.push()
                        DeeplinkImage.push()
                        KafkaImage.push()
                        SyncImage.push()
                        LocationImage.push()
                    }
                }
            }
        }/*
        stage('Delpoying the App on Azure Kubernetes Service') {
            steps{
                script{
                       // sh "docker system prune -a"
                       sh "sh ~/az_login.sh"
                       sh "sh Deployment_cicd/deploy.sh"
 
                }
            }
        }*/
    }
    post{
        always{
            emailext attachLog: true,
            body: "<body><p><font size='+2'><b>Build status: </b>${currentBuild.currentResult} <br><b>Jenkins Job: </b>${env.JOB_NAME}<br><b>Build Number: </b>${env.BUILD_NUMBER}</font><br><font size='+1'> To Check SonarQube Vulnerability test report: http://ec2-18-205-104-25.compute-1.amazonaws.com/dashboard/index/Americana_Backend <br><br>View More info at:  <b> ${env.BUILD_URL}</b></font></p></body>",subject: "Jenkins Build Job : ${env.JOB_NAME}", to: 'suruchi.singh@appinventiv.com'
        }
    }
}
