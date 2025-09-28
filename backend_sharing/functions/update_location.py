import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Drivers')

def lambda_handler(event, context):
    body = json.loads(event['body'])
    driver_id = body['driverId']
    location = body['location']   # expects {lat: ..., lon: ...}

    table.update_item(
        Key={'driverId': driver_id},
        UpdateExpression='SET location = :loc',
        ExpressionAttributeValues={':loc': location}
    )

    return {
        'statusCode': 200,
        'body': json.dumps({'message': 'Location updated'})
    }
