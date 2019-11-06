FROM node:9.3.0
WORKDIR /usr/src/app
COPY . .
COPY proto /usr/src/proto/
RUN ls /usr/src
RUN apt-get update
RUN npm install -g typescript
RUN npm install
RUN "node_modules/.bin/gulp"
EXPOSE 4001
CMD node dist/src/app.js
