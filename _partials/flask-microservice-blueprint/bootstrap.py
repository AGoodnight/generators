import boto3

def init_db():
    
    #Establish connection to DynamoDB using boto
    dynamo = boto3.client("dynamodb")
    
    #Create tables
    dynamo.create_table(
        AttributeDefinitions=
        [
            {
                'AttributeName': 'Id',
                'AttributeType': 'S'
            },
            {
                'AttributeName': 'CustomerId',
                'AttributeType': 'S'
            },
            {
                'AttributeName': 'Role',
                'AttributeType': 'S'
            }
        ],
        TableName='users',
        KeySchema=
        [
            {
                'AttributeName': 'Id',
                'KeyType': 'HASH'
            },
            {
                'AttributeName': 'CustomerId',
                'KeyType': 'RANGE'
            }
        ],
        ProvisionedThroughput=
        {
            'ReadCapacityUnits': 5,
            'WriteCapacityUnits': 5
        },
        LocalSecondaryIndexes=
        [
            {
                'IndexName': 'IdRole',
                'KeySchema':
                [
                    {
                        'AttributeName': 'Id',
                        'KeyType': 'HASH'
                    },
                    {
                        'AttributeName': 'Role',
                        'KeyType': 'RANGE'
                    }
                ],
                'Projection': {
                    'ProjectionType': 'ALL',
                }
            }
        ]
    )

if __name__ == '__main__':
    init_db()
