import logging
log = logging.getLogger(__name__)
import argparse
import ConfigParser
from flask import Flask, request, make_response
from flask_restful import Resource, Api, reqparse, abort
import json
from os import environ

from users import User
from error_handling import errors, NotFoundError, BadRequestError, MethodNotAllowedError

app = Flask(__name__)
api = Api(app, errors=errors)
config = None

#------------------------------------------------------------------------------
# RESTFUL RESOURCES
#------------------------------------------------------------------------------

class DefaultResource(Resource):
    def get(self):
        log.info("Accepting request to default resource")
        return {"Hello":"World!"}

#------------------------------------------------------------------------------

class UserResource(Resource):
    
    def get(self, user_id="__INVALID__"):
        
        user_data = User()
        if user_id == "__INVALID__":
            #No ID provided, return all users
            return user_data.findAll()
        else:
            #Find user by ID in path
            return user_data.findById(user_id)
        
    def post(self, user_id="__INVALID__"):
        
        # --- VALIDATION ----
        if user_id != "__INVALID__": 
            raise MethodNotAllowedError
        
        user = request.get_json()
            
        # --- DATA METHOD ---
        user_data = User()
        return user_data.create(user)
        
    def put(self, user_id="__INVALID__"):
        
        # --- VALIDATION ----
        if user_id == "__INVALID__": 
            raise MethodNotAllowedError
        user = request.json
        
        # --- DATA METHOD ---
        user_data = User()
        return user_data.update(user)
        
    def delete(self, user_id="__INVALID__"):
        
        # --- VALIDATION ----
        if user_id == "__INVALID__": 
            raise MethodNotAllowedError
            
        # --- DATA METHOD ---
        user_data = User()
        return user_data.delete(user_id)

#------------------------------------------------------------------------------
# INITIALIZATION
#------------------------------------------------------------------------------
def init_resources():
    api.add_resource(DefaultResource, '/', '/hello', '/helloworld')
    api.add_resource(UserResource, '/user', '/user/<string:user_id>')

if __name__ == '__main__':
    
    # Set Up RESTful Resources
    init_resources()
    
    # Handle Arguments
    parser = argparse.ArgumentParser(description='Sample Microservice')
    parser.add_argument('-c', '--config', required=True, help='config file')
    parser.add_argument('-v', '--verbose', help='verbose logging',
        action='store_true', default=False)
    args = parser.parse_args()
    
    config = ConfigParser.SafeConfigParser()
    config.read(args.config)
    
    # Establish config
    app.config.update(
        host='0.0.0.0',
        port=8080
    )
    
    for section in config.sections():
        for (key, val) in config.items(section):
            app.config[key] = val
    
    # Set Up Logging
    log_level = logging.DEBUG if args.verbose else logging.INFO
    logging.basicConfig(level=log_level, format='%(asctime)s %(levelname)s: %(message)s')
    
    # Run App 
    app.run(host=app.config['host'],port=app.config['port'])
