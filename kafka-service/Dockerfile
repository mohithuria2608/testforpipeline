FROM node:10.17.0
WORKDIR /usr/src/app
COPY kafka-service/ .
COPY proto/ /usr/src/app/proto/
COPY config/ /usr/src/app/config/
COPY lua/ /usr/src/app/lua/
COPY model/ /usr/src/app/model/
COPY constant/ /usr/src/app/src/constant/
RUN apt-get update
RUN npm cache clean --force
RUN npm install -g typescript
RUN npm install
EXPOSE 4006
EXPOSE 50057
RUN tsc
CMD npm run stg
