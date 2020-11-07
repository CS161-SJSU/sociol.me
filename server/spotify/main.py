
import os
import datetime
import json
import requests

USER_ID = os.environ.get('SPOTIFY_CLIENT_ID')
TOKEN = "AQAQrHMCq9QDnK-G5WtG5VAqu3vyWk6iVCs9WGO0OQIUIwrI08cO9zLQqkBh-iRrL-ZWXZ48az7tSI3mkm1mEP1BcBsoGqZm-ZCmsYYNDLeWrPKDo2LB61CvjFtRdwZneM2afsGpT9vYGvfKCSub-JBVjdOhSPTd5hwQsbqQQ-32jW0ZQ1jfMhmgXw6IQNpYgXVHYprazk6_cR8KR-YWThCdZ4Sz88raAVdgM1VLj7IAqEEUd22prPNgCXRXn0Af"


if __name__ == "__main__":

    headers = {
        "Accept" : "application/json",
        "Content-Type" : "application/json",
        "Authorization" : "Bearer {token}".format(token=TOKEN)
    }

    today = datetime.datetime.now()
    yesterday = today - datetime.timedelta(days=1) #We want to run the feed daily, last 24 hours played songs
    yesterday_unix_timestamp = int(yesterday.timestamp()) * 1000

    r = requests.get("https://api.spotify.com/v1/me/", headers=headers)


    data = r.json()

    print("Data ", data)