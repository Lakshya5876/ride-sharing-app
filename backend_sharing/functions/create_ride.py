import json
import uuid
import boto3
from boto3.dynamodb.conditions import Attr

dynamodb = boto3.resource('dynamodb')
drivers_table = dynamodb.Table('Drivers')
rides_table = dynamodb.Table('Rides')

def lambda_handler(event, context):
    body = json.loads(event['body'])
    rider_id = body['riderId']
    pickup = body['pickup']
    dropoff = body['dropoff']

    # find first available driver
    resp = drivers_table.scan(
        FilterExpression=Attr('available').eq(True)
    )
    drivers = resp.get('Items', [])
    if not drivers:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'No drivers available'})
        }

    driver = drivers[0]
    driver_id = driver['driverId']

    ride_id = str(uuid.uuid4())
    rides_table.put_item(Item={
        'rideId': ride_id,
        'riderId': rider_id,
        'driverId': driver_id,
        'pickup': pickup,
        'dropoff': dropoff,
        'status': 'ongoing'
    })

    # mark driver unavailable
    drivers_table.update_item(
        Key={'driverId': driver_id},
        UpdateExpression='SET available = :a',
        ExpressionAttributeValues={':a': False}
    )

    return {
        'statusCode': 200,
        'body': json.dumps({
            'ride': {
                'rideId': ride_id,
                'driverId': driver_id,
                'pickup': pickup,
                'dropoff': dropoff,
                'status': 'ongoing'
            }
        })
    }
