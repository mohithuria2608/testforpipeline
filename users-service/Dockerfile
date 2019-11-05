FROM node:9.3.0  AS build-env

# Create app directory
RUN mkdir -p /opt/user-service/
WORKDIR /opt/user-service/
RUN npm install typescript -g

COPY ./gulpfile.js .
COPY ./package.json .
COPY ./tsconfig.json .
COPY ./tslint.json .
COPY ./config/ ./config/.
COPY ./Dockerfile .
RUN python --version
# Install app dependencies
RUN npm install --no-optional

# Bundle app source
COPY ./src ./src

RUN "node_modules/.bin/gulp"


# final stage
FROM node:9.3.0
RUN mkdir -p /opt/user-service/
WORKDIR /opt/user-service/
COPY --from=build-env /opt/user-service/dist ./dist
COPY --from=build-env /opt/user-service/package.json ./
COPY --from=build-env /opt/user-service/config ./
RUN npm install --no-optional --only=prod

EXPOSE 4001

CMD [ "node", "dist/app.js" ]