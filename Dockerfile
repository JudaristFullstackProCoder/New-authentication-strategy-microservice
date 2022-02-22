 # @author [Judarist Fullstack]
 # @email [judearist@mail.com]
 # @create date 2022-02-19 17:19:48
 # @modify date 2022-02-22 21:22:20
 # @desc [description]
 
 FROM node:16-alpine3.14
 WORKDIR /auth-api
 ADD package.json .
 ARG NODE_ENV
 RUN if [ ${NODE_ENV}="production"]; \
        then npm install --only=production; \
        else npm install; \
        fi
 RUN npm install
 ADD . .
 CMD [ "npm", "run", "prod" ]