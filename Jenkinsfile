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
                      emailext (
                        subject: 'Merge conflict detected!',
                        body: `$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS: Check console output at $BUILD_URL to view the results.`,
                        to: 'thientt.bdst@gmail.com',
                      )

                      

                        error("Merge conflict detected")
                    }
                }

          // Run tests
          bat 'npm install' // Install dependencies
          bat 'npm test' // Run tests
          bat 'npm build' // 
          bat 'npm start'

        }
      }
    }
  }
}
