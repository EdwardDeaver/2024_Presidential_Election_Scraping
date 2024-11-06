# 2024_Presidential_Election_Scraping

The NY Times election tracker is powered by a couple json files and rendered in the front-end. This gives us access to one of the easiest ways of obtaining Electoral College vote numbers. This wasn't the result I was hoping for. 
https://www.nytimes.com/interactive/2024/11/05/us/elections/results-president.html

[![Watch the video](https://repository-images.githubusercontent.com/882895679/e547371e-ab09-45be-a7a9-04646985e6f1)](https://vimeo.com/1027074047)

Video Of It: https://player.vimeo.com/video/1027038934?h=c5644c94a6

I learned about the NY Times data from a person at Syracuse's Open Data Day. 

## Research

I found that there was a scraper made for last year's data: https://github.com/alex/nyt-2020-election-scraper

https://static01.nyt.com/elections-assets/2020/data/api/2020-11-03/votes-remaining-page/national/president.json

The new data structure would drop at 6pm Eastern election night 11/05/24. 

## Development

I created a script that pulled 2020's data and made it sure it formated data correctly and sent it to my WebSocket Serial Serial for the AlfaZeta FlipDigits. 

At 6:00pm on November 5th I went to the election site, viewed source and searched for the json file. It would be this url: https://static01.nyt.com/elections-assets/pages/data/2024-11-05/results-president.json. 

The data structure was different but after it was filled in for the first couple states I was able to pull it in succcessfully. 

The script ran without issue the rest of the night. 




