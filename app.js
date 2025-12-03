const express = require('express');
const path = require('path');
const { scrapeBestBuy } = require('./scrapers/bestbuyScraper');
const app = express();
const PORT = 3000;


//setting ejs as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/scrape', async (req, res) =>{

    const searchTerm = req.query.query;
    console.log('searchTerm', searchTerm);
    
    try {
        const result = await scrapeBestBuy(searchTerm);
        console.log('pagetitle:', result);
        res.send('scrape successful')
    } catch (err) {
        console.error('error during scraping', err)
    }

})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})