```groovy
pipeline {
    agent any

    tools {
        nodejs 'NodeJS 26.x'
    }

    environment {
        AWS_REGION = 'ap-south-1'
        AWS_ACCOUNT_ID = '054022771060'
        ECR_REPOSITORY = 'sample/html1'

        REGISTRY = '054022771060.dkr.ecr.ap-south-1.amazonaws.com'

        LOCAL_IMAGE = 'sports-web:latest'
        IMAGE_TAG = "${BUILD_NUMBER}"
        ECR_IMAGE = "${REGISTRY}/sample/html1:${BUILD_NUMBER}"
    }

    stages {

        // 1. Git Checkout
        stage('Git Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Samraj282005/Sports-Web.git'
            }
        }

        // 2. Install Dependencies
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        // 3. Build React Application
        stage('Build React Application') {
            steps {
                sh 'npm run build'
            }
        }

        // 4. SonarQube Analysis
        // Continue pipeline even if SonarQube is unavailable
        stage('SonarQube Analysis') {
            steps {
                catchError(
                    buildResult: 'SUCCESS',
                    stageResult: 'UNSTABLE'
                ) {
                    withSonarQubeEnv('SonarQube') {
                        script {
                            def scannerHome = tool 'SonarScanner'

                            sh """
                                ${scannerHome}/bin/sonar-scanner \
                                -Dsonar.projectKey=Sports-Web \
                                -Dsonar.sources=src \
                                -Dsonar.exclusions=node_modules/**,build/**
                            """
                        }
                    }
                }
            }
        }

        // 5. Check Dockerfile
        stage('Check Docker Files') {
            steps {
                sh '''
                    echo "Checking Dockerfile..."

                    ls -l src/Dockerfile

                    echo "Dockerfile found successfully!"
                '''
            }
        }

        // 6. Docker Build
        stage('Docker Build') {
            steps {
                sh '''
                    echo "Building Docker image..."

                    docker build \
                        -f src/Dockerfile \
                        -t ${LOCAL_IMAGE} .

                    echo "Docker build completed!"
                '''
            }
        }

        // 7. List Docker Images
        stage('Docker Images') {
            steps {
                sh '''
                    echo "Available Docker images..."

                    docker images
                '''
            }
        }

        // 8. Trivy Security Scan
        stage('Trivy Security Scan') {
            steps {
                sh '''
                    echo "Starting Trivy security scan..."

                    mkdir -p /var/lib/jenkins/.cache/trivy

                    docker run --rm \
                        -v /var/run/docker.sock:/var/run/docker.sock \
                        -v /var/lib/jenkins/.cache/trivy:/root/.cache/ \
                        aquasec/trivy:latest \
                        image \
                        --exit-code 1 \
                        --severity HIGH,CRITICAL \
                        ${LOCAL_IMAGE}

                    echo "Trivy scan completed successfully!"
                '''
            }
        }

        // 9. Login and Push to AWS ECR
        stage('Push to AWS ECR') {
            steps {
                sh '''
                    echo "Checking AWS identity..."

                    aws sts get-caller-identity

                    echo "Logging in to AWS ECR..."

                    aws ecr get-login-password \
                        --region ${AWS_REGION} \
                    | docker login \
                        --username AWS \
                        --password-stdin ${REGISTRY}

                    echo "Tagging Docker image..."

                    docker tag ${LOCAL_IMAGE} ${ECR_IMAGE}

                    echo "Pushing Docker image to ECR..."

                    docker push ${ECR_IMAGE}

                    echo "Docker image pushed successfully!"

                    echo "ECR IMAGE:"
                    echo ${ECR_IMAGE}
                '''
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: Jenkins pipeline completed!'
            echo 'Docker image pushed to AWS ECR.'
        }

        failure {
            echo 'FAILURE: Jenkins pipeline failed.'
            echo 'Please check the console output.'
        }

        always {
            echo 'Jenkins pipeline execution finished.'
        }
    }
}
```
