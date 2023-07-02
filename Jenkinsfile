pipeline {
  agent any

  stages {
    stage('Merge and Test') {
      steps {
        script {
          // Checkout main branch
          checkout([$class: 'GitSCM', branches: [[name: '*/main']]])


          // Merge 'develop' into 'main'
                script {
                    try {
                        bat 'git merge origin/develop'
                    } catch (err) {
                        // Merge conflict occurred
                        echo "Merge conflict detected! Please resolve the conflicts and try again."
                        currentBuild.result = 'FAILURE'

                        // Send email notification
                        error("Merge conflict detected")
                    }
                    

                }

          // Run tests
          bat 'yarn ci' // Install dependencies
          bat 'yarn test' // Run tests
          bat 'yarn start'

        }
      }
    }

    stage('Install dependencies'){
      script {
        bat 'npm ci'
      }
    }

    stage('Building app ...'){
      script {
        bat 'npm start'
      }
    }

    stage('Test case'){
      script {
        bat 'npm test'
      }
    }

    stage("Email notification") {
      emailext (
        subject: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS!',
        body: 
          '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS: Check console output at $BUILD_URL to view the results.',
        to: 'testnet102@gmail.com',
      )
    }
  }
}
