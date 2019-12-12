FROM node:10.17.0
WORKDIR /usr/src/app
COPY menu-service/ .
COPY proto/ /usr/src/app/proto/
RUN apt-get update
RUN npm cache clean --force
RUN npm install -g typescript
RUN npm install
EXPOSE 4002
EXPOSE 50053
RUN tsc
CMD node dist/app.js
