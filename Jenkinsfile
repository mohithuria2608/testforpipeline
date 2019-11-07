pipeline {
    environment {
        registry = "americana.azurecr.io"
        registryCredential = "acr_cred"
        //Users_image="americana.azurecr.io/users" + ":Users-Image_${env.BUILD_NUMBER}"
        Users_image="americana.azurecr.io/users" + ":Users-Image_53"
        Auth_image="americana.azurecr.io/auth" + ":auth-service_${env.BUILD_NUMBER}"
        Menu_image="americana.azurecr.io/menu"+ ":Menu-service_${env.BUILD_NUMBER}"
        
    }
    agent any

    stages{
    	stage('Email'){
                steps{
                    emailext body: "Build Started-- > Build Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}", subject: "Jenkins Build Job -- > ${env.JOB_NAME}", to: 'suruchi.singh@appinventiv.com'
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
                        sh "${scannerHome}/bin/sonar-scanner -Dproject.settings=sonar-project.properties" 
                    }
                }
            }
        }
        stage('Build image') {
            steps{
                script{
                    dir("${env.WORKSPACE}/auth-service/"){
                        AuthImage=docker.build(registry + "/auth" + ":auth-service_${env.BUILD_NUMBER}","-f ${env.WORKSPACE}/auth-service/Dockerfile  .")}
                    dir("${env.WORKSPACE}/users-service"){
                        UsersImage=docker.build(registry + "/users" + ":Users-Image_${env.BUILD_NUMBER}","-f ${env.WORKSPACE}/users-service/Dockerfile .")}
                    dir("${env.WORKSPACE}/menu-service"){
                        MenuImage=docker.build(registry + "/menu"+ ":Menu-service_${env.BUILD_NUMBER}","-f ${env.WORKSPACE}/menu-service/Dockerfile .")}
    
                }
            }
        }
        stage('Push Image to Azure COntainer Registry') {
            steps{
                script {
                    docker.withRegistry("https://americana.azurecr.io", registryCredential ) {
                        AuthImage.push()
                        UsersImage.push()
                        MenuImage.push()
                    }
                }
            }
        }*/
        stage('Delpoying the App on Azure Kubernetes Service') {
            steps{
                script{
                            sh '''
                            #!/bin/bash

                            set -e
                            
                            REMOTE_USERNAME="appinventiv-jenkins"
                            REMOTE_HOST="40.67.180.202"
                            
                            ssh -tt $REMOTE_USERNAME@$REMOTE_HOST
                            az login --service-principal -u $AZ_USR -p $AZ_PASS --tenant $AZ_TENANT
                            sudo az acr login --name americana
                            #sudo docker pull ${Auth_image}
                            sudo docker pull ${Users_image}
                            #sudo docker pull ${Menu_image}
                            #docker run -d appinventiv/test 
                            "
                        '''
                }
            }
        }
    }
    post{
        always{
            emailext attachLog: true,
            body: "Build status -->> ${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n View More info at: ${env.BUILD_URL}",subject: "Jenkins Build Job -- > ${env.JOB_NAME}", to: 'suruchi.singh@appinventiv.com'
        }
    }
}
