import os
import datetime
import json
import requests

USER_ID = os.environ.get('SPOTIFY_CLIENT_ID')
TOKEN = "BQDguhQdSMnNhbimXaaThfO9Tl7B0PoBE_HJP7RS5-xh7d3uvTTo_3YJ_Tyx5Ac4K5jqgvlPJj7Ijg-G0y8NJTqy8Y3dRsPQhoJdah8BhM0opCHfWyGKOHsHRd_Vd91ezQ3OymkgZMEK3hw98ss_gT8mojJjL_cc2DAKEhA"

if __name__ == "__main__":
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer {token}".format(token=TOKEN)
    }

    today = datetime.datetime.now()
    yesterday = today - datetime.timedelta(days=1)  # We want to run the feed daily, last 24 hours played songs
    yesterday_unix_timestamp = int(yesterday.timestamp()) * 1000

    r = requests.get("https://api.spotify.com/v1/me/player/recently-played?imit=10&after=0", headers=headers)

    data = r.json()

    print("Data ", data)
