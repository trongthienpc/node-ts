pipeline {
  agent {
    // Use a pre-configured Jenkins agent with Node.js and SonarQube installed
    label 'nodejs-sonarqube'
  }

  stages {
    stage('Merge and Test') {
      steps {
        // Merge 'develop' into 'main' - No changes needed
        script {
          try {
            bat 'git merge origin/develop'
          } catch (err) {
            echo "Merge conflict detected! Please resolve the conflicts and try again."
            currentBuild.result = 'FAILURE'
            error("Merge conflict detected")
          }
        }
      }
    }

    stage('Install dependencies') {
      steps {
        // Use 'npm ci' for faster and deterministic dependency installation
        script {
          bat 'npm ci'
        }
      }
    }

    stage('Building app ...') {
      steps {
        script {
          bat 'npm start'
        }  
      }
    }

    stage('Test case') {
      steps {
        script {
          bat 'npm test'
        }
      }
    }

    stage('Scan with SonarQube') {
      steps {
        script {
          // Use 'npm ci' instead of 'npm install' inside the SonarQube scan step
          bat 'npm ci'
        }
        // The SonarQube analysis can be parallelized with other tasks
        parallel {
          stage('SonarQube Scan') {
            steps {
              withSonarQubeEnv("sonarqube-10.1") {
                // No need to install 'sonarqube-scanner', it's already available
                bat "npm run sonar"
              }
            }
          }
          // Add any other tasks that can run concurrently here
        }
      }
    }

    stage("Email notification") {
      steps {
        emailext (
          subject: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS!',
          body: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS: Check console output at $BUILD_URL to view the results.',
          to: 'testnet102@gmail.com',
        )
      }
    }
  }
}
