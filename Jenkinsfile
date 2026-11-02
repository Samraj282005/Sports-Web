
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
    }

    post {
        success {
            echo 'Sports-Web pipeline completed successfully!'
        }

        failure {
            echo 'Sports-Web pipeline failed. Check Console Output.'
        }
    }
}
