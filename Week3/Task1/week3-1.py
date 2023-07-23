import urllib.request as req
import json
import csv
import re
#抓取網頁原始碼
url = "https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment.json"
#建立request物件
request = req.Request(url,headers = {
    "User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
})
with req.urlopen(request) as response: 
    data = response.read().decode("utf-8")
#print(data)。確認抓到對的資料
#因文件為json格式，因此載入json模組將其內容做解析
data = json.loads(data)

#抓出data中想要印出的資訊
situation = data["result"]["results"]


# #將資料寫入csv 
with open("attraction.csv",mode="w",encoding="utf-8",newline="") as file:
    writer = csv.writer(file)
    for site in range(len(situation)):
        stitle = situation[site]["stitle"]
        area = (re.search("..區",situation[site]["address"]).group())
        longitude = situation[site]["longitude"]
        latitude = situation[site]["latitude"]
        image = situation[site]["file"].split('http')
        first_image = "http"+image[1]
        writer.writerow([stitle,area,longitude,latitude,first_image])

with open("mrt.csv",mode="w",encoding='utf-8',newline="") as profile:
    writer = csv.writer(profile)
    view_gallery = {}
    for station in range(len(situation)):
        mrt = situation[station]["MRT"]
        view = situation[station]["stitle"]
        if mrt in view_gallery:
            view_gallery[mrt].append(view)
        else:
            view_gallery[mrt] = [mrt]
            view_gallery[mrt].append(view)
        view = list(view.split())
    for item in view_gallery:
        writer.writerow(view_gallery[item])