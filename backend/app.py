from flask import Flask, request, jsonify
from flask_cors import CORS
import boto3
from datetime import datetime

app = Flask(__name__)
CORS(app)

ec2 = boto3.client("ec2", region_name="us-east-1")
cloudwatch = boto3.client("cloudwatch", region_name="us-east-1")

def get_instance_id_by_ip(ip_address):
    try:
        response = ec2.describe_instances(Filters=[{"Name": "private-ip-address", "Values": [ip_address]}])
        instance_id = response['Reservations'][0]['Instances'][0]['InstanceId']
        return instance_id
    except IndexError:
        raise ValueError(f"No instance found with IP address {ip_address}")

@app.route('/cpu-usage', methods=['GET'])
def get_cpu_usage():
    try:
        ip_address = request.args.get('ip_address')
        start_time = request.args.get('start_time')
        end_time = request.args.get('end_time')
        interval = int(request.args.get('interval'))

        instance_id = get_instance_id_by_ip(ip_address)


        start_dt = datetime.fromisoformat(start_time)
        end_dt = datetime.fromisoformat(end_time)


        total_duration = (end_dt - start_dt).total_seconds()
        max_period = int(total_duration / 1440)
        effective_period = max(interval, max_period)

        effective_period = max(60, round(effective_period / 60) * 60)

        response = cloudwatch.get_metric_statistics(
            Namespace='AWS/EC2',
            MetricName='CPUUtilization',
            Dimensions=[{'Name': 'InstanceId', 'Value': instance_id}],
            StartTime=start_dt,
            EndTime=end_dt,
            Period=effective_period,
            Statistics=['Average'],
        )

        data_points = response.get('Datapoints', [])
        data_points.sort(key=lambda x: x['Timestamp'])

        result = [{"time": point['Timestamp'].strftime('%Y-%m-%d %H:%M:%S'), "cpu_usage": point['Average']} for point in data_points]

        return jsonify(result)

    except ValueError as ve:
        return jsonify({'error': str(ve)}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
