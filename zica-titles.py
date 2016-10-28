import time
import sys
from lxml import html
import requests

while 1:
    page = requests.get('http://live.1chi.si/customexportfile.html?bustcache=1476140671070')
    tree = html.fromstring(page.content)
    artist = tree.xpath('//div[@class="message"][2]/text()')[0]
    title = tree.xpath('//div[@class="message"][2]/strong/text()')[0]

    print('TITLE=' + title.strip() + '\nARTIST='+ artist.strip() +'\n.')
    sys.stdout.flush()
    time.sleep(10)
