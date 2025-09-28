import json
import uuid
import boto3
import os

dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
    table_name = os.environ.get('DRIVERS_TABLE')
    table = dynamodb.Table(table_name)
    
    try:
        body = json.loads(event['body'])
        driver_id = str(uuid.uuid4())

        table.put_item(Item={
            'driverId': driver_id,
            'name': body.get('name'),
            'phone': body.get('phone'),
            'available': True,
            'location': {}
        })

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,POST'
            },
            'body': json.dumps({'driverId': driver_id})
        }
    except Exception as e:
        print(e)
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,POST'
            },
            'body': json.dumps({'error': 'Could not create driver'})
        }