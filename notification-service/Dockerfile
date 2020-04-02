FROM node:10.17.0

RUN npm cache clean --force

ADD notification-service/package.json /tmp/package.json
RUN cd /tmp && npm install -g typescript && npm install
RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app/

WORKDIR /usr/src/app
COPY notification-service/ .
COPY proto/ /usr/src/app/proto/
COPY config/ /usr/src/app/config/
COPY lua/ /usr/src/app/lua/
COPY model/ /usr/src/app/model/
COPY constant/ /usr/src/app/src/constant/

RUN apt-get update
RUN apt-get install libssl1.1
RUN npm cache clean --force
RUN npm install -g typescript
RUN npm install
EXPOSE 4008
EXPOSE 50059
RUN tsc
CMD npm run prod
