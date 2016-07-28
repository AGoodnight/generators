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
mkdir angular; cd angular; mkdir $NAME; cd ..;
mkdir flask; cd flask; mkdir $NAME; cd ..; cd ..;

#Main Directory
cd main;
mkdir python; cd python; virtualenv venv;
cp "$RESOURCES/requirements.txt" .;
source venv/bin/activate; # enter virtual environment
pip install -r requirements.txt;
source deactivate; # exit virtual environment
cd ..;
echo '--> created Virtual Environment for Python';

#Static Resources
mkdir staticResources; mkdir resources; cd staticResources;
echo "--> created staticResources directory";

npm init;
npm config set save=true;
npm config set save-exact=true;
echo "--> initialized NPM";

npm install gulp gulp-sass gulp-uglify gulp-angular-templatecache gulp-inject-partials gulp-order gulp-htmllint gulp-jslint gulp-concat gulp-rename;
mkdir scss; cd scss; mkdir main; mkdir modules; mkdir vendor;
cd main; mkdir partials; cd partials; touch buttons.scss; cd ..; touch global.scss; cd ..; cd ..;
cp "$RESOURCES/gulpfile.js" .; cp -r "$RESOURCES/gulp" .;
echo "--> created gulp and sass";

mkdir img; mkdir app; mkdir temp; mkdir fonts; mkdir css; mkdir views;
cd app; touch app.js; touch config.js; mkdir services; cd services; touch service.js; cd ..; cd ..;
cd views; touch body.html; touch header.html; cd ..;
cp "$RESOURCES/index.html" .;
echo "--> created App and Views";

bower init --allow-root;
bower install --allow-root --config.interactive=false -SFE angular angular-translate ionic jasmine angular-nvd3 bootstrap requirejs angular-ui-router;
echo "--> installed Bower packages";

cd ..; cd ..;
git init;
cp "$RESOURCES/.gitignore" .;
echo "--> initialized Git repo";

#WebApp
cd main; mkdir webapp; cd webapp; mkdir scripts; cd ..; cd ..;
echo "--> created webapp folder";

cd ..;
chmod 777 $ABS_PATH;

#Start ionic
#sudo npm install -g cordova ionic;
#ionic start $NAME build;
