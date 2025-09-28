import json
import boto3
import decimal

dynamodb = boto3.resource('dynamodb')
rides_table = dynamodb.Table('Rides')
drivers_table = dynamodb.Table('Drivers')

def lambda_handler(event, context):
    body = json.loads(event['body'])
    ride_id = body['rideId']
    distance_km = float(body.get('distanceKm', 5.0))  # default 5 km

    # basic fare calculation
    base = 50       # base fare
    per_km = 10     # rate per km
    fare = base + per_km * distance_km

    # update ride
    rides_table.update_item(
        Key={'rideId': ride_id},
        UpdateExpression='SET #s = :s, fare = :f',
        ExpressionAttributeNames={'#s': 'status'},
        ExpressionAttributeValues={':s': 'completed', ':f': decimal.Decimal(fare)}
    )

    # get ride to know driver
    ride = rides_table.get_item(Key={'rideId': ride_id}).get('Item')
    driver_id = ride['driverId']

    # free the driver
    drivers_table.update_item(
        Key={'driverId': driver_id},
        UpdateExpression='SET available = :a',
        ExpressionAttributeValues={':a': True}
    )

    return {
        'statusCode': 200,
        'body': json.dumps({'message': 'Ride completed', 'fare': fare})
    }
