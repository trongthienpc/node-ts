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
                    emailext (
                      subject: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS!',
                      body: 
                        '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS: \n Merge conflict occurred Check console output at $BUILD_URL to view the results.',
                      to: 'testnet102@gmail.com',
                    )

                }

          // Run tests
          bat 'npm install' // Install dependencies
          bat 'npm test' // Run tests
          bat 'npm start'

        }
      }
    }
  }
}
