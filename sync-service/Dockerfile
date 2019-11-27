FROM node:10.17.0
WORKDIR /usr/src/app
COPY . .
COPY proto/ /usr/src/app/proto/
RUN apt-get update
RUN npm install -g typescript
RUN npm install
EXPOSE 4004
EXPOSE 50055
RUN tsc
CMD node dist/app.js
