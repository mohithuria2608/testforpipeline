FROM node:8.13-slim AS build-env

# Create app directory
RUN mkdir -p /opt/grpc-service/
WORKDIR /opt/grpc-service/
RUN npm install typescript -g

COPY ./gulpfile.js .
COPY ./package.json .
COPY ./tsconfig.json .
COPY ./tslint.json .
COPY ./config ./config.
COPY ./Dockerfile .

# Install app dependencies
RUN npm install --no-optional

# Bundle app source
COPY ./src ./src

RUN "node_modules/.bin/gulp"


# final stage
FROM node:8.13-slim
RUN mkdir -p /opt/grpc-service/
WORKDIR /opt/grpc-service/
COPY --from=build-env /opt/grpc-service/dist ./dist
COPY --from=build-env /opt/grpc-service/package.json ./
COPY --from=build-env /opt/grpc-service/config.json ./
RUN npm install --no-optional --only=prod

EXPOSE 3999

CMD [ "node", "dist/app.js" ]