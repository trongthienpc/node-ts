pipeline {
  agent any

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

    stage('Build, Test, and Scan') {
      parallel {
        stage('Install dependencies') {
          steps {
            // Use 'npm ci' for faster and deterministic dependency installation
            script {
              bat 'npm install'
            }
          }
        }

        stage('Build app') {
          steps {
            script {
              bat 'npm start'
            }  
          }
        }

        stage('Run tests') {
          steps {
            script {
              bat 'npm test'
            }
          }
        }

        stage('SonarQube Scan') {
          steps {
            script {
              // Use 'npm ci' instead of 'npm install' inside the SonarQube scan step
              bat 'npm ci'
            }
            // Run SonarQube analysis after all previous tasks are completed
            withSonarQubeEnv("sonarqube-10.1") {
              bat "npm run sonar"
            }
          }
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
