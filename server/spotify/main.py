
import os
import datetime
import json
import requests

USER_ID = os.environ.get('SPOTIFY_CLIENT_ID')
TOKEN = "BQCKFWugvo8UiEfJM4D_9T0cSSRSAgeCbk-TMyXCp-huQIkggA-WOrqJpvmuu_HXaCp4QIA2YNDhm2ePGpMjNg6S08sDdfJOZ8vpkdKMFVxkTrqs2-x3BoS7jf8i5m9n-au_cGGpw_7WgBfeuh_dzO4"


if __name__ == "__main__":

    headers = {
        "Accept" : "application/json",
        "Content-Type" : "application/json",
        "Authorization" : "Bearer {token}".format(token=TOKEN)
    }

    today = datetime.datetime.now()
    yesterday = today - datetime.timedelta(days=1) #We want to run the feed daily, last 24 hours played songs
    yesterday_unix_timestamp = int(yesterday.timestamp()) * 1000

    r = requests.get("https://api.spotify.com/v1/me/player/recently-played?after={time}".format(time=yesterday_unix_timestamp), headers=headers)

    data = r.json()

    print(data)