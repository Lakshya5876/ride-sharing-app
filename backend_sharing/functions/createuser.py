import json
import uuid
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Riders')

def lambda_handler(event, context):
    body = json.loads(event['body'])
    user_id = str(uuid.uuid4())
    table.put_item(Item={
        'userId': user_id,
        'name': body['name'],
        'phone': body['phone']
    })
    return {
        'statusCode': 200,
        'body': json.dumps({'userId': user_id})
    }
