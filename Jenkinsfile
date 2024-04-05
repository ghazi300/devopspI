pipeline{
agent any
environment {
registryCredentials = "nexus"
registry = "192.168.33.10:8083"
}
stages {
stage('Install dependencies') {
steps{
script {
sh('npm install')
}
}
}
stage('SonarQube Analysis') {
steps{
script {
def scannerHome = tool 'scanner'
withSonarQubeEnv {
sh "${scannerHome}/bin/sonar-scanner"
}
}
}
}
stage('Building images (node and mongo)') {
steps{
script {
sh('docker-compose build')
}
}
}
stage('Deploy to Nexus') {
steps{
script {
docker.withRegistry("http://"+registry,
registryCredentials ) {
sh('docker push $registry/nodemongoapp:5.0 ')
}
}
}
}
stage('Build application') {
steps{
script {
sh('npm run build-dev')
}
}
}
tage('Run application ') {
steps{
script {
docker.withRegistry("http://"+registry, registryCredentials
) {
sh('docker pull $registry/nodemongoapp:6.0 ')
sh('docker-compose up -d ')
}
}
}
}

}
}