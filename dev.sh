#!/bin/bash
export NODE_ENV='development';

cd auth-service
gulp
pm2 set pm2-logrotate:rotateInterval '*/5 * * * *'
pm2 start dist/app.js --name auth
sleep 2   

cd ../users-service
gulp
pm2 set pm2-logrotate:rotateInterval '*/5 * * * *'
pm2 start dist/app.js --name user
sleep 2 

cd ../menu-service
gulp
pm2 set pm2-logrotate:rotateInterval '*/5 * * * *'
pm2 start dist/app.js --name menu
sleep 2

cd ../location-service
gulp
pm2 set pm2-logrotate:rotateInterval '*/5 * * * *'
pm2 start dist/app.js --name location
sleep 2 

cd ../promotion-service
gulp
pm2 set pm2-logrotate:rotateInterval '*/5 * * * *'
pm2 start dist/app.js --name promotion
sleep 2 

cd ../home-service
gulp
pm2 set pm2-logrotate:rotateInterval '*/5 * * * *'
pm2 start dist/app.js --name home
sleep 2 

cd ../sync-service
gulp
pm2 set pm2-logrotate:rotateInterval '*/5 * * * *'
pm2 start dist/app.js --name sync
sleep 2 

cd ../kafka-service
gulp
pm2 set pm2-logrotate:rotateInterval '*/5 * * * *'
pm2 start dist/app.js --name kafka
sleep 2 

cd ../payment-service
gulp
pm2 set pm2-logrotate:rotateInterval '*/5 * * * *'
pm2 start dist/app.js --name payment
sleep 2 

cd ../log-service
gulp
pm2 set pm2-logrotate:rotateInterval '*/5 * * * *'
pm2 start dist/app.js --name log
sleep 2 

cd ../order-service
gulp
pm2 set pm2-logrotate:rotateInterval '*/5 * * * *'
pm2 start dist/app.js --name order
sleep 2 

cd ../deeplink-service
gulp
pm2 set pm2-logrotate:rotateInterval '*/5 * * * *'
pm2 start dist/app.js --name deeplink
sleep 2 

cd ../notification-service
gulp
pm2 set pm2-logrotate:rotateInterval '*/5 * * * *'
pm2 start dist/app.js --name notification
sleep 2 

cd ../upload-service
gulp
pm2 set pm2-logrotate:rotateInterval '*/5 * * * *'
pm2 start dist/app.js --name upload
sleep 2