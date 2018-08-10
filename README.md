# About

The `docker-registry-frontend` is a browser-based solution for browsing and modifying a private Docker registry.
Fork from `https://github.com/kwk/docker-registry-frontend`

## docker-compose

```docker-compose
version: "2.1"
services:
  register-ui:
    image: "huyinghuan/docker-register-frontend:v2"
    container_name: "private-registry-ui"
    environment:
      - ENV_DOCKER_REGISTRY_SERVER=http://x.x.x.x:5000
      - ENV_DOCKER_REGISTRY_UI_PORT=5001
      - ENV_DOCKER_REGISTRY_UI_AUTH=true
    ports:
      - "5001:5001"
```

and then run `docker-compose up` , open `http://localhost:5001`. 

Set `NV_DOCKER_REGISTRY_UI_AUTH=false` if you don't need auth, or use `https://github.com/kwk/docker-registry-frontend`

## How to developement

```bash
npm install -g bower
git clone https://github.com/huyinghuan/docker-registry-frontend.git
cd docker-registry-frontend
npm install
cd app
bower install
cd ..
npm start
```

maybe  you need modify `config.js`

## where is auth server

see `https://github.com/huyinghuan/docker_auth`
