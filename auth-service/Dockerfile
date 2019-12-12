FROM node:10.17.0
WORKDIR /usr/src/app
COPY auth-service/ .
COPY proto/ /usr/src/app/proto/
COPY config/ /usr/src/app/config/
COPY lua/ /usr/src/app/lua/
COPY model/ /usr/src/app/model/

RUN apt-get update
RUN npm cache clean --force
RUN npm install -g typescript
RUN npm install
EXPOSE 4000 
EXPOSE 50051
RUN tsc
CMD node dist/app.js
