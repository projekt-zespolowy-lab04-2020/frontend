pipeline {
  agent any
  stages {
    stage('preapre docker') {
      steps {
        sh 'docker stop reactapp || true'
        sh 'docker rm reactapp || true'
        sh 'docker image rm jenkins/reactapp || true'
      }
    }

    stage('docker build') {
      steps {
        sh 'docker build . -t jenkins/reactapp'
      }
    }

    stage('docker run') {
      steps {
        sh 'docker run --name reactapp -e REACT_APP_API_MAP_KEY -v /var/www/react/html:/app/build jenkins/reactapp'
      }
    }
    environment {
      REACT_APP_API_MAP_KEY = credentials('map-api-key')
    }
  }
}
