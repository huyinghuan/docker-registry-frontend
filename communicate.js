const request = require('request')
const config = require('./config')


function verityVersion(){
    new Promise((reslove, reject)=>{
        request({
            baseUrl: registryServer,
            uri: "/v2/",
            json: true,
        }, (err, response, body)=>{
            if(err){return reject(err)}
            if(response.statusCode == 200){
                return reslove({success: true, data: body})
            }
            if(response.statusCode == 401){
                return reslove({
                    success: false,
                    data: response.headers["www-authenticate"]
                })
            }
            return reject(body)
        })
    })
}

function parseAuthenticate(authenticate){
    let [ type, credentials ] = result.data.split(' ');
    let credentialsArray = credentials.split(",")
    let auth = {
        type: type,
        jwt: {}
    }
    for(let i = 0; i < credentialsArray.length; i++){
        let item = credentialsArray[i].split("=")
        auth.jwt[item[0]] = item[1].replace('"', "")
    }
    return auth
}


function connectAuthServer(username, password, auth){
    return new Promise((resolve, reject)=>{
        request({
            url: auht.realm,
            headers:{
                
            }
        })

    })
}

exports.login = async (username, password)=>{
    let registryServer  = config.registry    
    let result = await verityVersion()
    if(result.success){
        return true
    }
    let auth = parseAuthenticate(result.data)
    
    let realm = auth["realm"]



}