FROM node:8.13-slim AS build-env

# Create app directory
RUN mkdir -p /opt/americana-user/
WORKDIR /opt/americana-user/
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
RUN mkdir -p /opt/americana-user/
WORKDIR /opt/americana-user/
COPY --from=build-env /opt/americana-user/dist ./dist
COPY --from=build-env /opt/americana-user/package.json ./
COPY --from=build-env /opt/americana-user/config.json ./
RUN npm install --no-optional --only=prod

EXPOSE 3000

CMD [ "node", "dist/app.js" ]