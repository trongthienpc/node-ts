pipeline {
  agent any

  stages {
    stage('Merge and Test') {
      steps {
        script {
          // Checkout main branch
          checkout([$class: 'GitSCM', branches: [[name: '*/main']]])

          // Merge develop branch into main branch
          sh 'git merge origin/develop'

          // Run tests
          sh 'npm install' // Install dependencies
          sh 'npm test' // Run tests
        }
      }
    }
  }
}
