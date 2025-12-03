import puppeteer from "puppeteer";
const bestbuy_url = 'https://www.bestbuy.ca/en-ca/search?search='

export async function scrapeBestBuy(searchTerm){
    const real_bestbuy_url = bestbuy_url + searchTerm;
    console.log(real_bestbuy_url, 'this is the real url');
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.118 Safari/537.36");

    await page.goto(real_bestbuy_url, { waitUntil: 'networkidle2' });
    await new Promise(resolve => setTimeout(resolve, 2000));
    const prices = await page.$$eval('[data-automation="product-pricing"] span', spans => spans.map(span => span.innerText));
    return prices
}