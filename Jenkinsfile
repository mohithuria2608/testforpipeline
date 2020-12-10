pipeline {
    environment {
        registry = "amfprodnecontregist.azurecr.io"
        registryCredential = "ACR_Cred_Prod"
        Users_image="amfprodnecontregist.azurecr.io/users" + ":Users-Image_${env.BUILD_NUMBER}"
       Auth_image="amfprodnecontregist.azurecr.io/auth" + ":auth-service_${env.BUILD_NUMBER}"
    }
    agent any

    stages{
    	stage('EmailProd'){
                steps{
                    emailext body: "<body><p><font size='+2'><b>Build Status: </b>Started <br> <b>Build Job: </b> ${env.JOB_NAME} <br><b> Build Number: </b> ${env.BUILD_NUMBER} </font> <br><br> <font size='+1'>More info at:  ${env.BUILD_URL}</font></p></body>", subject: "Americana UAT : Jenkins Build Job : ${env.JOB_NAME}", to: 'monu.huria@gmail.com'
            
                }
        }
        stage('Clone repository') {
            steps{
                checkout scm
            }
        }
        stage('Build image') {
            steps{
                script{
                    AuthImage=docker.build(registry + "/auth" + ":auth-service_${env.BUILD_NUMBER}","-f ${env.WORKSPACE}/auth-service/Dockerfile_prod  .")
                    UsersImage=docker.build(registry + "/users" + ":Users-Image_${env.BUILD_NUMBER}","-f ${env.WORKSPACE}/users-service/Dockerfile_prod .")
                }
            }
        }
        stage('Push Image to Azure Container Registry') {
            steps{
                script {
                    docker.withRegistry("https://amfprodnecontregist.azurecr.io", registryCredential ) {
                        AuthImage.push()
                        UsersImage.push()
                    }
                }
            }
        }
   
    }
 
}
