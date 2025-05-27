    pipeline {
        agent {
            label 'nextjs'
        }
        environment {
            PROJECT_NAME = '$PROJECT_NAME'
            BUILD_NUMBER = '$BUILD_NUMBER'
            BUILD_STATUS = '#' 
            CUSTOM_BUILD_URL = '$BUILD_URL'
        }
        stages {
            stage("Collecting Requirements") {
                steps {
                    sh "echo Please wait.."
                    sh "sudo yarn"
                }
            }
            
            stage("Build") {
                steps {
                
                    sh "sudo yarn run stage"
                }
            }
            stage("Deploy") {
            steps {
                sh '''
                PM2_STATUS=$(sudo pm2 status)
                if echo "$PM2_STATUS" | grep -q 'web-investment-2063'; then
                    echo "PM2 service is already running. Restarting..."
                    sudo pm2 restart web-investment-2063
                else
                    echo "PM2 service is not running. Starting..."
                    sudo PORT=2063 pm2 start npm --name web-investment-2063 -- start
                    echo "aved-nu.vercel.app/"
                fi
                '''
            }
        }
        /* stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('mobiloitte-sonar') {
                    script {
                        def scannerHome = tool 'mobiloitte-sonar-scanner';
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        } */
    }
        post {
            always {
                script {
                    // Update BUILD_STATUS based on build result
                    def buildOutcome = currentBuild.resultIsBetterOrEqualTo('SUCCESS') ? 'SUCCESS' : 'FAILURE'
                    BUILD_STATUS = buildOutcome

                    emailext to: 'team-it@mobiloitte.com,anurag.singh@mobiloitte.com, prashant.singh@mobiloitte.com',
                            subject: 'PROJECT BUILD STATUS via JENKINS',
                            body: """<html>
                                        <head>
                                            <style>
                                                .build-status {
                                                    color: ${BUILD_STATUS == 'SUCCESS' ? 'green' : 'red'};
                                                }
                                            </style>
                                        </head>
                                        <body>
                                            <p>Hello,</p>
                                            <b><p>This notification is to inform you about your project's build has been $BUILD_STATUS .</p></b>
                                            <ul>
                                                <li><strong>Project Name:</strong> $PROJECT_NAME</li>
                                                <li><strong>Build Status:</strong> <span class="build-status">$BUILD_STATUS</span></li>
                                                <li><strong>Build Number:</strong> $BUILD_NUMBER</li>
                                                  <b><p> Please click on the URL to check sonar report of your project !!</p></b>
                                            <li><strong>SonarQube Report:</strong> http://172.16.0.200:9000/dashboard?id=investment-app-23044087-nextjs</li>
                                                <li><strong>Build Log:</strong> <b><p>Attached Below</p></b></li>
                                            </ul>
                                        </body>
                                    </html>""",
                            mimeType: 'text/html',
                            attachLog: true
                }
            }
        }
    }
