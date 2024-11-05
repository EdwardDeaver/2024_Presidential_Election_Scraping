# Based on https://github.com/alex/nyt-2020-election-scraper/blob/master/.github/workflows/scrape.yml
import asyncio
import websockets
import threading
import urllib.request, json

uri = "ws://127.0.0.1:5000/ws"
ws =  websockets.connect(uri)


NYTIMES_URL = "https://static01.nyt.com/elections-assets/2020/data/api/2020-11-03/votes-remaining-page/national/president.json"
async def hello(uri):
    async with websockets.connect(uri) as websocket:
        await websocket.send("Hello there!")
        greeting = await websocket.recv()
        print(f"Received: {greeting}")


async def hello(uri):
    async with websockets.connect(uri) as websocket:
            result = ""
            with urllib.request.urlopen(NYTIMES_URL) as url:
                data = json.load(url)
                trumpElectoral = 0
                bidenElectoral = 0 
                for i in data["data"]["races"]:
                    for z in i["candidates"]:
                        if (z["last_name"] == "Trump"):
                            trumpElectoral = trumpElectoral + z["electoral_votes"]
                        if (z["last_name"] == "Biden"):
                            bidenElectoral = bidenElectoral + z["electoral_votes"]
                        else:
                            next
                # Adds 0 to make sure value is 3 digits
                stringValueForTrump = "0" * (3 - len(str(trumpElectoral))) +  str(trumpElectoral)
                # Adds 0 to make sure value is 3 digits
                stringValueForBiden = "0" * (3 - len(str(bidenElectoral))) +  str(bidenElectoral)

                finalString = "Trump  " + stringValueForTrump + "    " + "Biden  " + stringValueForBiden + "    "
                
                print(finalString)
                print(len(finalString))
                message = [None] * 32
                message[0]=0x80
                message[1]=0x83
                message[2]=0x00
                position = 3
                for i in finalString:
                    message[position] = int.from_bytes(bytes(i, encoding="utf-8"), "big")
                    position = position +1
                message[31]=0x8F

                print(bytes(finalString,'UTF-8'))
                print(message)
                print(len(message))
                result = ','.join(str(x) for x in message)
                print(result)
                result = result
            await ws.send(result)
            greeting = await ws.recv()
            print(f"Received: {greeting}")

asyncio.run(hello(uri))
