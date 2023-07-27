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
        }
      }
    }

    stage('Install dependencies'){
      steps {
        script {
          bat 'npm install'
        }
      }
    }

    stage('Building app ...'){
      steps {
        script {
          bat 'npm start'
        }  
      }
    }

    stage('Test case'){
      steps {
        script {
          bat 'npm test'
        }
      }
    }

    stage('Scan with SonarQube') {
      steps {
          script {
            // Use SonarQube Scanner for Jenkins plugin to run the scan
            withSonarQubeEnv('sonarqube-10.1') {
                // Set SonarQube project properties
                def scannerHome = tool 'sonar-scanner'
                def sonarProjectKey = "my-node-app" // Replace with your SonarQube project key
                def sonarProjectName = "My Node.js App" // Replace with your SonarQube project name
                def sonarSources = "." // Replace with the path to your Node.js application source code
                
                // Run the SonarQube scan using the SonarScanner
                bat """
                    PATH=\$PATH:\$NODEJS_HOME/bin
                    ${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=${sonarProjectKey} -Dsonar.projectName=${sonarProjectName} -Dsonar.sources=${sonarSources}
                """
            }
        }
      }
    }

    stage("Email notification") {
      steps {
        emailext (
          subject: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS!',
          body: 
            '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS: Check console output at $BUILD_URL to view the results.',
          to: 'testnet102@gmail.com',
        )
      }
    }
  }
}
