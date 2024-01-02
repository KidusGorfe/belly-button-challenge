
import requests

# URL to the JSON file
url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

# Attempting to download the JSON file from the provided URL
try:
    response = requests.get(url)
    data = response.json()
    print("JSON data successfully retrieved.")
except requests.RequestException as e:
    print(f"An error occurred: {e}")


