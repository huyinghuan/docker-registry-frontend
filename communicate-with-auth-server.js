const request = require('request')
const config = require('./config')

function tryToGetRegisterResource(uri){
    return new Promise((reslove, reject)=>{
        request({
            baseUrl: config.registry,
            uri: uri,
            method: "GET",
            json: true
        }, (err, response, body)=>{
            if(err){return reject(err)}
            //如果服务器不需要认证
            //if register server dont have auth server
            if(response.statusCode == 200){
                return reslove({success: true, data: body})
            }
            if(response.statusCode == 401){
                return reslove({
                    success: false,
                    data: parseAuthenticate(response.headers["www-authenticate"])
                })
            }
            return reject(body)
        })
    })
}


function getAuthServerToken(user, pass, jwt){
    let authorization = "Basic " + Buffer.from(user+":"+pass).toString('base64')
    jwt["account"] = user
    let realm = jwt.realm
    delete jwt["realm"]
    return new Promise((resolve, reject)=>{
        request.post({
            uri: realm,
            headers: {
                "Authorization": authorization
            },
            formData:  jwt
        }, (err, response, body)=>{
            if(err){
                return reject(err)
            }
            if(response.statusCode != 200){
                return reject(body)
            }
            return resolve(JSON.parse(body))
        })
    })
}

function getRegisterResource(uri, token){
    return new Promise((reslove, reject)=>{
        request({
            baseUrl: config.registry,
            uri: uri,
            auth: {
                bearer: token
            },
            method: "GET",
            json: true
        }, (err, response, body)=>{
            if(err){return reject(err)}
            if(response.statusCode == 200){
                return reslove(body)
            }
            return reject(body)
        })
    })
}

function parseAuthenticate(authenticate){
    let type = ""
    let credentials = ""
    if(authenticate.indexOf("Bearer") == 0){
        type = "Bearer"
        credentials = authenticate.replace("Bearer ", "")
    }else if (authenticate.indexOf("Basic") == 0){
        type = "Basic"
        credentials = authenticate.replace("Basic ", "")
    }else{
        credentials = authenticate
    }
    let credentialsArray = credentials.split(",")
    let auth = {
        type: type,
        jwt: {}
    }
    for(let i = 0; i < credentialsArray.length; i++){
        let item = credentialsArray[i].split("=")
        auth.jwt[item[0]] = item[1].replace(/\"/g, "")
    }
    return auth
}

async function getResource(user, pass, uri){
    let tryResult = await tryToGetRegisterResource(uri)
    if(tryResult.success){
        return tryResult.data
    }
    let jwt = tryResult.data.jwt
    let authToken = await getAuthServerToken(user, pass, jwt)
    let resoucre = await getRegisterResource(uri, authToken.token)
    return resoucre
}

module.exports = getResource