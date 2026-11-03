```groovy
pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Samraj282005/Sports-Web.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build React Application') {
            steps {
                sh 'npm run build'
            }
        }

        stage('SonarQube Code Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh 'sonar-scanner'
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 10, unit: 'MINUTES') {
                    script {
                        def qualityGate = waitForQualityGate()
                        if (qualityGate.status != 'OK') {
                            error "SonarQube Quality Gate failed!"
                        }
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    docker build -t sports-web:${BUILD_NUMBER} .
                    docker tag sports-web:${BUILD_NUMBER} sports-web:latest
                '''
            }
        }

        stage('Verify Docker Image') {
            steps {
                sh 'docker images sports-web'
            }
        }
    }

    post {
        success {
            echo 'Sports-Web pipeline and Docker image build completed successfully!'
        }

        failure {
            echo 'Sports-Web pipeline failed. Check Console Output.'
        }
    }
}
```
