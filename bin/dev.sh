#! /bin/bash
npm run build
export ENVIRONMENT=development
node ./functions/lib/express.deploy.js