FROM node:latest

RUN mkdir -p /usr/src/api

WORKDIR /usr/src/api
COPY package.json /usr/src/api/package.json

RUN npm i

EXPOSE 8080
EXPOSE 3031

