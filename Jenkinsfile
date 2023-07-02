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
                        body: 'Please resolve the conflicts and try again',
                        to: 'testnet102@gmail.com',
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
