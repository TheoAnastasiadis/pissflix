#! /bin/bash
./node_modules/rimraf/dist/cjs/src/bin.js ./functions
mkdir functions
npm run build
cp package.json ./functions/
cp package-lock.json ./functions/
cp .env ./functions/
firebase deploy --only "functions:firebaseFunction"