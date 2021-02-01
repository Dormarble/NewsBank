import axios from 'axios';
import cheerio from 'cheerio';
import Arcitle from '../models/articles.js';

const MAX_PAGE = 5;
const headers = {
    'Accept': `text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9`,
    'Accept-Encoding' : 'gzip, deflate, br',
    'Accept-Language' : 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
    'Cache-Control' : 'max-age=0',
    'Connection' : 'keep-alive',
    'User-Agent' : 'Chrome/84.0',
    'Sec-Fetch-Dest' : 'document',
    'Sec-Fetch-Mode' : 'navigate',
    'Sec-Fetch-User': '?1',
    'Upgrade-Insecure-Requests': '1'
}

async function scrapeNews(DB) {
    let linksPromises = [];
    linksPromises.length = MAX_PAGE;


    for(let i=0; i<MAX_PAGE; i++) {                                             // get promise array that has link array in each promise
        linksPromises[i] = getLinksPromiseInOnePage(i+1);                       // ** this is a design for getting links asynchronously from multiple pages **
    }
    try {
        const latestDate = new Date(DB.setup.latestUpdate);

        const links2Dim = await Promise.all(linksPromises);                     // links2dim are 2-dim array of links, first vector represents pages and second vector represents links in page that is corresponding to
        const articles = await getArticles(links2Dim, latestDate);                      
        await storeArticles(articles);
        await setLatestUpdate(DB);
    } catch(err) {
        errorHandler(err);
    }
}

// get array of recent article objects from links
async function getArticles(links2Dim, latestDate) {
    let articles = [];

    for (const links of links2Dim) {
        const { isDuplicate, filteredArticles } = await getArticlesFromLinks(links, latestDate);                  // scrap whole articles this is valid from one page
        
        articles = articles.concat(filteredArticles);

        if(isDuplicate) {                                                       // if there are articles that already exist in database, then stop scraping remaining links
            break;
        }
    }

    return articles;
}

// get articles asynchronously from entire links that are in multiple pages 
// and select appropriate articles synchronously
function getArticlesFromLinks(links, latestDate) {
    let articlePromise = [];

    for (let i=0; i<links.length; i++) {
        articlePromise[i] = getArticleFromLink(links[i]);
    }

    return Promise.all(articlePromise)
    .then(articles => {
        let filteredArticles = [];
        let isDuplicate = false;

        for(const article of articles) {
            if (article.date.getTime() <= latestDate.getTime()) {               // if article's publishing time is earlier than latest update time once,
                isDuplicate = true;                                             // then entire filtering valid articles works are stopped, 
                break;                                                          // and then return 
            }
            filteredArticles.push(article);
        }
        return {
            isDuplicate, 
            filteredArticles
        };
    });
}

// scrap one article in given link and return article object
async function getArticleFromLink(link) {
    let { data } = await axios.get(link, {headers: headers});
    const $ = cheerio.load(data);
    
    const title = $('.title').text().trim().clean();
    const body = $('#articletxt').text().clean();
    const date = new Date($('.date-published .num').text().clean());

    let article = {
        title: title,
        body: body,
        date: date,
        resource: link
    }
    return article;
}

async function storeArticles(articles) {
    let success = 0;
    let total = articles.length;

    for (const article of articles) {
        let a = new Arcitle();
        a.title = article.title;
        a.body = article.body;
        a.date = article.date;
        a.resource = article.resource;
        a.section = 'economy';

        try {
            let isSuccess = await a.save().then(()=> {return true;});
            if(isSuccess) {
                success++;
            }
        } catch(err) {
            console.log(err);
        }
    }
    console.log(`insert Article to database : ${success}/${total}`);
}

function setLatestUpdate(DB) {
    const date = new Date();
    DB.updateSetup({'latestUpdate' : date.toISOString()});
}

function errorHandler(err) {
    console.log(err);
}

// get links in one page
// return promise that centains link array
async function getLinksPromiseInOnePage(page) {
    let url = `https://www.hankyung.com/all-news/economy?page=${page}`;
    let { data } = await axios.get(url, {headers: headers});

    const $ = cheerio.load(data);

    const $linkElements = $('.tit a');
    let links = [];
    for (let i=0; i<$linkElements.length; i++) {
        links.push($linkElements.eq(i).attr('href'));
    }
    return links;
}

String.prototype.clean = function() {
    const isSpace = (piece) => {
        if(piece === '' || piece === '\n' || piece === '\t') {
            return false;
        }
        return true;
    }

    return this.trim()
    .split(' ')
    .filter(isSpace)
    .join(' ')
    .replace(/[.]\S*\s기자\s\S*@\S*[.]\S*/, '.')
    .replace('/연합뉴스', '');;
}

export default scrapeNews;