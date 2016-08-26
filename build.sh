#!/bin/bash
ABS_PATH=""
NAME=""
SOURCEPATH=$(pwd)
RESOURCES="$SOURCEPATH/_partials"

#Getting Options
while getopts ":l:n:" opt; do
  case $opt in
    l) ABS_PATH="$OPTARG";; # Absolute path to where to make the build
    n) NAME="$OPTARG";; # The name of your build
  esac
done

#Ensure default options are provided, if none/not all specified.
if [ $# -eq 0 ]; then
	ABS_PATH=.;
	NAME="UntitledAngularApp";
fi

if [ -n "$ABS_PATH" ]; then
	ABS_PATH=.;
fi

if [ -n "$NAME" ]; then
	NAME="UntitledAngularApp";
fi


#Getting to build location
cd $ABS_PATH; # accept trailing or not
mkdir $NAME;
mkdir -p "$NAME/main";

#Include Flask Blueprint
cp -r "$RESOURCES/flask-microservice-blueprint" "$NAME/main/python";
mkdir -p "$NAME/main/python/test";
cp "$RESOURCES/tests/flask.spec.py" "$NAME/main/python/test/flask.spec.py";
docker build -t "development" .;


#Static Resources
mkdir -p "$NAME/main/staticResources"; 
mkdir -p "$NAME/main/resources"; 
mkdir "$NAME/main/test";
cp "$RESOURCES/tests/app.spec.js" "$NAME/main/test/app.spec.js";
cp "$RESOURCES/package.json" "$NAME/main/package.json";
echo "--> created staticResources directory";

# We are going to navigate into the directory at this point becuase NPM is finicky.
cd "$NAME/main" 
npm ls "fs-graceful";
npm config set save=true;
npm config set save-exact=true;
npm install;
echo "--> initialized NPM";

mkdir -p "staticResources/scss"; 
mkdir -p "staticResources/scss/main"; 
mkdir -p "staticResources/scss/modules"; 
mkdir -p "staticResources/scss/vendor";
mkdir -p "staticResources/scss/main/partials"; 
cp "$RESOURCES/dashboard.scss" "staticResources/scss/main/partials/dashboard.scss";
touch "staticResources/scss/main/partials/buttons.scss"; 
cp "$RESOURCES/global.scss" "staticResources/scss/main/global.scss";
cp "$RESOURCES/gulpfile.js" .; 
cp "$RESOURCES/karma.config.js" .; 
cp -r "$RESOURCES/gulp" .;
echo "--> created gulp and sass";

mkdir -p "staticResources/img"; 
mkdir -p "staticResources/app"; 
mkdir -p "staticResources/temp"; 
mkdir -p "staticResources/fonts"; 
mkdir -p "staticResources/css"; 
mkdir -p "staticResources/views";
cp "$RESOURCES/app.js" "staticResources/app/app.js"; 
cp "$RESOURCES/app.controller.js" "staticResources/app/app.controller.js"; 
cp "$RESOURCES/routes.js" "staticResources/app/routes.js"; 
cp "$RESOURCES/views.js" "staticResources/app/views.js"; 
cp "$RESOURCES/config.js" "staticResources/app/config.js"; 
mkdir -p "staticResources/app/services"; 
touch "staticResources/app/services/service.js";
cp "$RESOURCES/header.html" "staticResources/views/header.html";
cp "$RESOURCES/body.html" "staticResources/views/body.html";
cp "$RESOURCES/index.html" "staticResources/index.html";
cp "$RESOURCES/bower.json" .;
bower install --config.interactive=false -SFE;
echo "--> installed Bower packages";

# Returning to builds root folder now that bower and npm have been satisfied
echo "--> created App and Views";
cd ..; 
git init;
cp "$RESOURCES/.gitignore" .;
echo "--> initialized Git repo";

#WebApp
mkdir -p "main/webapp"; 
mkdir -p "main/webapp/scripts";
mkdir -p "main/webapp/css";
mkdir -p "main/webapp/img";
mkdir -p "main/webapp/fonts"; 
mkdir -p "main/webapp/views";
echo "--> created webapp folder";

