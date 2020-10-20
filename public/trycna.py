import feedparser



def parseRSS( rss_url ):
    return feedparser.parse( rss_url )



def getHeadlines(rss_url):
    headlines = []

    feed = parseRSS(rss_url)
    for newsitem in feed['items']:
        headlines.append(newsitem['title'])

    return headlines


def getLinks(rss_url):
    links = []

    feed = parseRSS(rss_url)
    for newsitem in feed['items']:
        links.append(newsitem['link'])

    return links



allheadlines = []


newsurls = {

    'cnanews': 'https://www.channelnewsasia.com/rssfeeds/8395986',

}


for key, url in newsurls.items():
    
    allheadlines.extend(getHeadlines(url))
    allheadlines.extend(getLinks(url))


for hl in allheadlines:
    print(hl)

