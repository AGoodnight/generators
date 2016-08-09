import boto3
from os import environ
import logging
log = logging.getLogger(__name__)

class User(object):
    
    def __init__(self):
        self.session = boto3.session.Session()
        self.dynamo = self.session.client('dynamodb')
        self.tableName = 'users'
        return
        
    def __transform_user_list(self, user_list):
        list_ret = []
        for user in user_list:
            new_user = self.__transform_user(user)
            list_ret.append(new_user)
        return list_ret
        
    def __transform_user(self, user_ret):
        user_obj = {}
        for attribute in user_ret:
            user_obj[attribute] = user_ret[attribute]['S']
        return user_obj
        
    def findAll(self):
        users = self.dynamo.scan(TableName=self.tableName)
        users_resp = self.__transform_user_list(users['Items'])
        return users_resp
    
    def findById(self, user_id):
        customer_key = {"S":"1"}
        user_key = {
            "Id": {"S": user_id},
            "CustomerId": customer_key
        }
        user = self.dynamo.get_item(TableName=self.tableName, Key=user_key)
        user_ret = self.__transform_user(user['Item'])
        return user_ret
        
    def create(self, user):
        user_data = {}
        
        for k in user:
            user_data[k] = { "S": user[k] }
        
        self.dynamo.put_item(TableName=self.tableName, Item=user_data)
        return user
    
    def update(self, user):
        return user
    
    def delete(self, user_id):
        user = {"Id":user_id}
        return self.dynamo.delete_item(TableName=self.tableName, Key=user)
