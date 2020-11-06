
import os
import datetime
import json
import requests

USER_ID = os.environ.get('SPOTIFY_CLIENT_ID')
TOKEN = "BQA8pWDvUGNBK3XhiBlJl66kOwXiWsOxP_B6Bl41_Ue56cyvppY6Nnlk0MJTLpDQN7q0pTLR2-W3xikTh4k"


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

    print(data)