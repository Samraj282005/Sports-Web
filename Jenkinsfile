
pipeline {
    agent any

    environment {
        AWS_REGION     = 'ap-south-1'
        AWS_ACCOUNT_ID = '538731753325'
        ECR_REGISTRY   = '538731753325.dkr.ecr.ap-south-1.amazonaws.com'

        FRONTEND_IMAGE = 'react-frontend'
        BACKEND_IMAGE  = 'react-backend'

        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Samraj282005/Sports-Web.git'

                sh 'git log -1 --oneline'
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
                    echo "Building frontend image..."

                    docker build \
                      -f frontend/Dockerfile \
                      -t ${FRONTEND_IMAGE}:${IMAGE_TAG} \
                      frontend

                    echo "Building backend image..."

                    docker build \
                      -f backend/Dockerfile \
                      -t ${BACKEND_IMAGE}:${IMAGE_TAG} \
                      backend

                    docker images
                '''
            }
        }

        stage('Trivy Image Scan') {
            steps {
                sh '''
                    mkdir -p /var/lib/jenkins/.cache/trivy

                    echo "Scanning frontend image..."

                    docker run --rm \
                      -v /var/run/docker.sock:/var/run/docker.sock \
                      -v /var/lib/jenkins/.cache/trivy:/root/.cache/ \
                      aquasec/trivy:latest \
                      image --exit-code 1 \
                      --severity HIGH,CRITICAL \
                      ${FRONTEND_IMAGE}:${IMAGE_TAG}

                    echo "Scanning backend image..."

                    docker run --rm \
                      -v /var/run/docker.sock:/var/run/docker.sock \
                      -v /var/lib/jenkins/.cache/trivy:/root/.cache/ \
                      aquasec/trivy:latest \
                      image --exit-code 1 \
                      --severity HIGH,CRITICAL \
                      ${BACKEND_IMAGE}:${IMAGE_TAG}
                '''
            }
        }

        stage('Push Images to AWS ECR') {
            steps {
                sh '''
                    echo "Checking AWS identity..."

                    aws sts get-caller-identity

                    echo "Logging into AWS ECR..."

                    aws ecr get-login-password \
                      --region ${AWS_REGION} |
                    docker login \
                      --username AWS \
                      --password-stdin ${ECR_REGISTRY}

                    echo "Tagging frontend image..."

                    docker tag ${FRONTEND_IMAGE}:${IMAGE_TAG} \
                      ${ECR_REGISTRY}/${FRONTEND_IMAGE}:${IMAGE_TAG}

                    echo "Tagging backend image..."

                    docker tag ${BACKEND_IMAGE}:${IMAGE_TAG} \
                      ${ECR_REGISTRY}/${BACKEND_IMAGE}:${IMAGE_TAG}

                    echo "Pushing frontend image..."

                    docker push \
                      ${ECR_REGISTRY}/${FRONTEND_IMAGE}:${IMAGE_TAG}

                    echo "Pushing backend image..."

                    docker push \
                      ${ECR_REGISTRY}/${BACKEND_IMAGE}:${IMAGE_TAG}

                    echo "Both images pushed successfully!"
                '''
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: Pipeline completed and images pushed to ECR.'
        }

        failure {
            echo 'FAILED: Check Jenkins Console Output for the error.'
        }

        always {
            echo 'Pipeline execution completed.'
        }
    }
}
