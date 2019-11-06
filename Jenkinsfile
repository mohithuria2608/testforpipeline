pipeline {
    environment {
        registry = "americana.azurecr.io"
        registryCredential = "acr_cred"
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
        }
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
                        AuthImage=docker.build(registry + "/auth_" + ${env.BUILD_NUMBER} +":latest","-f ${env.WORKSPACE}/auth-service/Dockerfile  .")}
                    dir("${env.WORKSPACE}/users-service"){
                        UsersImage=docker.build(registry + "/users_" + ${env.BUILD_NUMBER} +":latest","-f ${env.WORKSPACE}/users-service/Dockerfile .")}
                    dir("${env.WORKSPACE}/menu-service"){
                        MenuImage=docker.build(registry + "/menu_"+ ${env.BUILD_NUMBER}+":latest","-f ${env.WORKSPACE}/menu-service/Dockerfile .")}
    
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
        }
        }
    post{
        always{
            emailext attachLog: true,
            body: "Build status -->> ${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n View More info at: ${env.BUILD_URL}",subject: "Jenkins Build Job -- > ${env.JOB_NAME}", to: 'suruchi.singh@appinventiv.com'
        }
    }
}
