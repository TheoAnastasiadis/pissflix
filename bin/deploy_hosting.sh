#! /bin/bash
./node_modules/rimraf/dist/cjs/src/bin.js ./static_root/plugin
# donwload the required release
curl https://github.com/TheoAnastasiadis/MSXTorrentPlugin/releases/download/v0.1.1-alpha.1/dist.zip -L --output ./static_root/plugin.zip
#unzip
unzip ./static_root/plugin -d ./static_root/plugin
#cleanup
./node_modules/rimraf/dist/cjs/src/bin.js ./static_root/plugin.zip
firebase deploy --only hosting