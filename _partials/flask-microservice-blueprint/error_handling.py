
#------------------------------------------------------------------------------
# ERROR HANDLING
# 
# All exceptions are defined here, and the 'errors' dictionary is passed into
# the app in app.py during instantiation
#------------------------------------------------------------------------------

errors = {
    "NotFoundError": {
        "message": "Resource not found.",
        "status": 404
    },
    "BadRequestError": {
        "message": "Malformed request.",
        "status": 400
    },
    "MethodNotAllowedError": {
        "message": "Method is not allowed for requested URL.",
        "status": 405
    }
}

class BaseException(Exception):
    def __init__(self):
        self.message = errors[self.__class__.__name__]['message']

class NotFoundError(BaseException):
    def __init__(self):
        super(self.__class__, self).__init__()
        self.error_code = 404
        
class BadRequestError(BaseException):
    def __init__(self):
        super(self.__class__, self).__init__()
        self.error_code = 400

class MethodNotAllowedError(BaseException):
    def __init__(self):
        super(self.__class__, self).__init__()
        self.error_code = 405
