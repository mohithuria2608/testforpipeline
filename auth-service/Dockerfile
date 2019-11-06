FROM node:9.3.0
WORKDIR /usr/src/app
COPY . .
COPY proto/ /usr/src/app/proto/
RUN apt-get update
RUN npm install -g typescript
RUN dir /usr/src/app
RUN npm install
EXPOSE 4000
CMD tsc && node dist/app.js
