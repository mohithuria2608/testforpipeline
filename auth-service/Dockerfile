FROM node:9.3.0
WORKDIR /usr/src/app
COPY . .
COPY proto/ /usr/src/app/proto/
RUN apt-get update
RUN npm install -g typescript
RUN npm install
EXPOSE 4000
RUN tsc
CMD node dist/src/app.js

