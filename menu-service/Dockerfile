FROM node:8.13-slim AS build-env

# Create app directory
RUN mkdir -p /opt/menu-service/
WORKDIR /opt/menu-service/
RUN npm install typescript -g

COPY ./gulpfile.js .
COPY ./package.json .
COPY ./tsconfig.json .
COPY ./tslint.json .
COPY ./config ./config.
COPY ./Dockerfile .

# Install aerospike dependencies
RUN apt-get install g++ libssl1.0.0 libssl-dev libz-dev
# Install app dependencies
RUN npm install --no-optional

# Bundle app source
COPY ./src ./src

RUN "node_modules/.bin/gulp"


# final stage
FROM node:8.13-slim
RUN mkdir -p /opt/menu-service/
WORKDIR /opt/menu-service/
COPY --from=build-env /opt/menu-service/dist ./dist
COPY --from=build-env /opt/menu-service/package.json ./
COPY --from=build-env /opt/menu-service/config.json ./
RUN npm install --no-optional --only=prod

EXPOSE 4002

CMD [ "node", "dist/app.js" ]