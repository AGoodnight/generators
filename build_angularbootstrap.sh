#!/bin/bash
ABS_PATH=""
NAME=""
RESOURCES=""

#Getting Options
while getopts ":l:n:r:" opt; do
  case $opt in
    l) ABS_PATH="$OPTARG";; # Absolute path to where to make the build
    n) NAME="$OPTARG";; # The name of your build
    r) RESOURCES="$OPTARG";; # an absolute path to resources such as gulp files
  esac
done

if [ "$EUID" -ne 0 ]
  then echo "Please run as root"
  exit
fi

#sudo su; # log in as root

#Getting to absolute path
cd $ABS_PATH;
ls;
mkdir $NAME;
cd $NAME;
mkdir test;
mkdir main;

#Test Directory
cd test;
mkdir $NAME; 
cd $NAME; 
mkdir angular; 
cd angular;
cp "$RESOURCES/tests/app.spec.js" .;
cd ..;
mkdir flask; 
cd ..; 
cd ..;

#Main Directory
cd main;
mkdir python; 
cd python; 
virtualenv venv;
cp "$RESOURCES/requirements.txt" .;
cp -a "$RESOURCES/python/." .;
source venv/bin/activate; # enter virtual environment
pip install -r requirements.txt;
source deactivate; # exit virtual environment
cd ..;
echo '--> created Virtual Environment for Python';

#Static Resources
mkdir staticResources; 
mkdir resources; 
cd staticResources;
echo "--> created staticResources directory";

cp "$RESOURCES/package.json" .;
npm ls 'fs-graceful';
npm config set save=true;
npm config set save-exact=true;
echo "--> initialized NPM";
npm install;
mkdir scss; 
cd scss; 
mkdir main; 
mkdir modules; 
mkdir vendor;
cd main; 
mkdir partials; 
cd partials; 
touch buttons.scss; 
cd ..; 
touch global.scss; 
cd ..; 
cd ..;
cp "$RESOURCES/gulpfile.js" .; 
cp -r "$RESOURCES/gulp" .;
echo "--> created gulp and sass";

mkdir img; 
mkdir app; 
mkdir temp; 
mkdir fonts; 
mkdir css; 
mkdir views;
cd app; 
touch app.js; 
touch config.js; 
mkdir services; 
cd services; 
touch service.js; 
cd ..; 
cd ..;
cd views; 
cp "$RESOURCES/header.html" .;
cp "$RESOURCES/body.html" .;
cd ..;
cp "$RESOURCES/index.html" .;
echo "--> created App and Views";

cp "$RESOURCES/bower.json" .;
bower install --allow-root --config.interactive=false -SFE;
echo "--> installed Bower packages";

cd ..; cd ..;
git init;
cp "$RESOURCES/.gitignore" .;
echo "--> initialized Git repo";

#WebApp
cd main; 
mkdir webapp; 
cd webapp; 
mkdir scripts;
mkdir css;
mkdir img;
mkdir fonts; 
cd ..; 
cd ..;
echo "--> created webapp folder";

#Permissions Unlock
cd;
echo "$ABS_PATH/$NAME";
chmod -R 777 "$ABS_PATH/$NAME" ;

#Start ionic
#sudo npm install -g cordova ionic;
#ionic start $NAME build;
