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
                        sh 'git merge origin/develop'
                    } catch (err) {
                        // Merge conflict occurred
                        echo "Merge conflict detected! Please resolve the conflicts and try again."
                        currentBuild.result = 'FAILURE'

                      // Send email notification
                      emailext (
                        subject: 'Merge conflict detected!',
                        body: 'Please resolve the conflicts and try again',
                        to: 'testnet102@gmail.com',
                      )

                        error("Merge conflict detected")
                    }
                }

          // Run tests
          sh 'npm install' // Install dependencies
          sh 'npm test' // Run tests
        }
      }
    }
  }
}
