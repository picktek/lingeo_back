#!/usr/bin/env sh

echo "--------- RUINING: npm install -g nodemon"
npm install -g nodemon
echo "--------- RUINING: npm install"
npm install
echo "--------- RUINING: npm run start-docker"
npm run start-docker