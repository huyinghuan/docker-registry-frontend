var registry = "http://127.0.0.1:5000/"
var auth = true
var authServer = ""
var admin = "admin"


if(process.env["ENV_DOCKER_REGISTRY_SERVER"]){
    registry = process.env["ENV_DOCKER_REGISTRY_SERVER"]
}
if(process.env["ENV_DOCKER_REGISTRY_UI_AUTH"] && process.env["ENV_DOCKER_REGISTRY_UI_AUTH"] == "false"){
    auth = false
}
if(auth && process.env["ENV_DOCKER_REGISTRY_AUTH_SERVER"]){
    authServer = process.env["ENV_DOCKER_REGISTRY_AUTH_SERVER"]
}

if(auth && process.env["ENV_DOCKER_REGISTRY_AUTH_SERVER_ADMIN"]){
    admin = process.env["ENV_DOCKER_REGISTRY_AUTH_SERVER_ADMIN"]
}

console.log(`
    auth: ${auth},
    registry: ${registry}
`)

module.exports = {
    port: 5001,
    registry: registry,
    auth: auth,
    authServer: authServer,
    admin: admin
}