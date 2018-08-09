const express = require('express')
const path = require('path')
const cookieSession = require('cookie-session')
const config = require('./config')
const app = express()
const http_proxy = require('http-proxy').createProxyServer({});
const authServer = require('./communicate-with-auth-server')
const bodyParser = require('body-parser');
app.set('trust proxy', 1)
app.use(cookieSession({
    name: 'registry-ui',
    secret: "registry-ui-cookie",
    saveUninitialized: true,
    secure: false , expires:  new Date(Date.now() + 1000 * 60 * 48), maxAge: 1000 * 60 * 48
  }))
app.use(express.static('app'))
app.use(bodyParser.json())
app.get("/api/userinfo", (req, resp)=>{
    let username = req.session.username || ""
    resp.json({username:username})
})
app.delete("/api/userinfo", (req, resp)=>{
    req.session = null
    resp.end()
})

app.post("/api/userinfo", async (req, resp)=>{
    let username = req.body.username
    let password = req.body.password
    try{
        authServer(username, password, "/v2/")
        req.session.username = username
        req.session.password = password
        resp.status(200)
        resp.end()
    }catch(e){
        resp.status(403)
        resp.end(e)
    }
})
app.use("/v2", async (req, resp)=>{
    if(!config.auth){
        http_proxy.web(req, resp, {target: config.registry}, function(e){
            resp.status(500)
            resp.end()
        })
        return
    }
    let username = req.session.username || ""
    let password = req.session.password || ""
    try{
        let resource =  await authServer(username, password, req.originalUrl)
        resp.json(resource)
    }catch(e){
        resp.status(500)
        resp.send(e)
    }    
});
app.use("*", function(req, resp) {
    resp.sendFile(path.join(__dirname, "app/index.html"))
});
app.listen(5001)