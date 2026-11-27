
pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
        disableConcurrentBuilds()
        timestamps()
        timeout(time: 45, unit: 'MINUTES')
    }

    environment {
        AWS_REGION = 'ap-south-1'
        AWS_ACCOUNT_ID = '538731753325'

        ECR_REGISTRY = '538731753325.dkr.ecr.ap-south-1.amazonaws.com'

        FRONTEND_REPO = 'react-frontend'
        BACKEND_REPO = 'react-backend'

        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm

                sh '''
                    echo "Latest Git commit:"
                    git log -1 --oneline
                '''
            }
        }

        stage('SonarQube Analysis - Bypassed') {
            steps {
                echo 'SonarQube temporarily bypassed.'
            }
        }

        stage('Docker Image Build') {
            steps {
                sh '''
                    set -e

                    echo "Building frontend image..."

                    docker build \
                        -f frontend/Dockerfile \
                        -t ${FRONTEND_REPO}:${IMAGE_TAG} \
                        frontend

                    echo "Building backend image..."

                    docker build \
                        -f backend/Dockerfile \
                        -t ${BACKEND_REPO}:${IMAGE_TAG} \
                        backend

                    echo "Docker images built successfully."

                    docker images
                '''
            }
        }

        // Trivy security scan temporarily bypassed.
        // Re-enable security scanning before production deployment.

        stage('Trivy Image Scan - Bypassed') {
            steps {
                echo 'Trivy scanning temporarily bypassed.'
            }
        }

        stage('Push Images to AWS ECR') {
            steps {
                sh '''
                    set -e

                    echo "Authenticating with AWS ECR..."

                    aws ecr get-login-password \
                        --region ${AWS_REGION} | \
                        docker login \
                        --username AWS \
                        --password-stdin ${ECR_REGISTRY}

                    echo "Tagging frontend image..."

                    docker tag \
                        ${FRONTEND_REPO}:${IMAGE_TAG} \
                        ${ECR_REGISTRY}/${FRONTEND_REPO}:${IMAGE_TAG}

                    docker tag \
                        ${FRONTEND_REPO}:${IMAGE_TAG} \
                        ${ECR_REGISTRY}/${FRONTEND_REPO}:latest

                    echo "Tagging backend image..."

                    docker tag \
                        ${BACKEND_REPO}:${IMAGE_TAG} \
                        ${ECR_REGISTRY}/${BACKEND_REPO}:${IMAGE_TAG}

                    docker tag \
                        ${BACKEND_REPO}:${IMAGE_TAG} \
                        ${ECR_REGISTRY}/${BACKEND_REPO}:latest

                    echo "Pushing frontend image..."

                    docker push \
                        ${ECR_REGISTRY}/${FRONTEND_REPO}:${IMAGE_TAG}

                    docker push \
                        ${ECR_REGISTRY}/${FRONTEND_REPO}:latest

                    echo "Pushing backend image..."

                    docker push \
                        ${ECR_REGISTRY}/${BACKEND_REPO}:${IMAGE_TAG}

                    docker push \
                        ${ECR_REGISTRY}/${BACKEND_REPO}:latest

                    echo "Both images pushed successfully to AWS ECR."
                '''
            }
        }

        stage('Deployment Status') {
            steps {
                echo 'Docker images are available in AWS ECR.'
                echo 'ECS deployment will be performed in the next phase.'
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: Frontend and backend images pushed to AWS ECR.'
        }

        failure {
            echo 'FAILED: Check Jenkins Console Output.'
        }

        always {
            echo 'Pipeline execution completed.'
        }
    }
}
