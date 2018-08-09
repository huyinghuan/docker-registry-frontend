FROM node:latest
WORKDIR /register-ui
ADD . /register-ui
RUN npm install --only=production
EXPOSE 5001
CMD [ "npm", "start"]