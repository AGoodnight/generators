#!/usr/bin/python
# Filename: jasmine.py

from flask import Flask
from flask.ext.jasmine import Jasmine, Asset
from flaskext.assets import Environment, Bundle

def Jasmine():
	assets = Environment(app)

	sources = Bundle(
		'../staticResource/angular/controller.js'
	)
	tests = Bundle(
		'../../test/angular/controller'
	)

	assets.register('sources',sources)
	assets.register('tests',tests)

	jasmine.sources(Asset('sources'))
	jasmine.specs(Asset('tests'))

	jasmine = Jasmine(app);

	print("Jasmine Loaded");

version = '0.1'

# To start tests go to - http://127.0.0.1:5000/jasmine/testrunner/

# End of jasmine.py