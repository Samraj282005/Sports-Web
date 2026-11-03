pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    stages {

        stage('Git Checkout') {
            steps {
                git branch: 'main',
                    credentialsId: 'github-token',
                    url: 'https://github.com/Samraj282005/Sports-Web.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('SonarQube Code Analysis') {
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    withSonarQubeEnv('SonarQube') {
                        script {
                            def scannerHome = tool 'SonarScanner'
                            sh "${scannerHome}/bin/sonar-scanner"
                        }
                    }
                }
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t sports-web:latest .'
            }
        }

        stage('Docker Images') {
            steps {
                sh 'docker images'
            }
        }
    }
}
