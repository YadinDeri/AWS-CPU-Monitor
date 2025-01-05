# AWS CPU Usage Monitor
## Overview

This project is a web application that fetches and displays CPU usage data for an AWS EC2 instance over a specified time period. 

The application consists of a Flask backend and a frontend built with HTML, CSS, and JavaScript. 

The backend retrieves CPU usage metrics from AWS CloudWatch, and the frontend visualizes the data using Chart.js.

## Tree structure 

```
aws-cpu-monitor/
├── backend/
│   ├── app.py
├── frontend/
│   ├── index.html
│   ├── script.js
│   ├── styles.css
```

## Technologies Used
Backend: Flask, Boto3 (AWS SDK for Python).

Frontend: HTML, CSS, JavaScript, Chart.js, Luxon (for date handling).

AWS Services: EC2, CloudWatch.


## 🚩 How to Start

Follow these steps to get the project up and running:

### 1. Clone the Repository

```bash
git clone https://github.com/AWS-CPU-Monitor.git
cd AWS-CPU-Monitor
```

### 2. Install Python Dependencies in backend
```
pip install boto3 flask flask-cors
```

### 3. Set Up AWS Credentials
Ensure your AWS credentials are set up properly for Terraform to interact with your AWS account. You can configure the AWS CLI by running:

```bash
aws configure
```
Enter your AWS Access Key ID, Secret Access Key, region, and output format when prompted.


### 4. Start the flask server

```bash
python app.py
```
The backend will run at http://127.0.0.1:5000.

### 5. Open the Frontend

Open the file: index.html






![image](https://github.com/user-attachments/assets/969adc92-1f14-44f7-973c-edbed788139e)

![image](https://github.com/user-attachments/assets/7f55fbc9-4cae-49b1-83d7-b0ee25b3bb31)



