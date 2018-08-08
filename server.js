const express = require('express')
const path = require('path')
const session = require('express-session')
const request = require('request')
const config = require('./config')
const app = express()
const http_proxy = require('http-proxy').createProxyServer({});


app.set('trust proxy', 1)
app.use(session({
    secret: 'registry-ui',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))
app.use(express.static('app'))
app.get("/api/userinfo", (req, resp)=>{
    let username = req.session.username || ""
    resp.json({username:username})
})

app.post("/api/login", async (req, resp)=>{
    

})
app.use("/v2", (req, resp)=>{
    if(!config.auth){
        http_proxy.web(req, resp, {target: config.registry}, function(e){
            resp.status(500)
        })
        return
    }
    console.log(req.originalUrl)
    resp.json({})
});
app.use("*", function(req, resp) {
    resp.sendFile(path.join(__dirname, "app/index.html"))
});
app.listen(5001)