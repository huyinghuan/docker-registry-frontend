
var port = 5001
var registry = "http://127.0.0.1:5000/"
var auth = false

if(process.env["ENV_DOCKER_REGISTRY_SERVER"]){
    registry = process.env["ENV_DOCKER_REGISTRY_SERVER"]
}
if(process.env["ENV_DOCKER_REGISTRY_UI_PORT"]){
    port = ~~process.env["ENV_DOCKER_REGISTRY_UI_PORT"]
}
if(process.env["ENV_DOCKER_REGISTRY_UI_AUTH"] && process.env["ENV_DOCKER_REGISTRY_UI_AUTH"] == "true"){
    auth = true
}

console.log(`
    auth: ${auth},
    port: ${port},
    registry: ${registry}
`)

module.exports = {
    port: port,
    registry: registry,
    auth: auth,
}