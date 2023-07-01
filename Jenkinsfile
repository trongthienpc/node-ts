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
                        sh 'git merge origin/main'
                    } catch (err) {
                        // Merge conflict occurred
                        echo "Merge conflict detected! Please resolve the conflicts and try again."
                        currentBuild.result = 'FAILURE'
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
