const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto("https://millardayo.com/")
    await page.waitForSelector("body")
    const articles = await page.evaluate(() =>{
        let posts = document.querySelectorAll('.infinite-post')
        let articleList = []
        posts.forEach(post => {
            let title = post.querySelector('h2').innerText
            let body = post.querySelector('p').innerText
            let image = post.querySelector('img').src
            articleList.push({ title, body, image })
        })
        
        return articleList
    })
    console.log(`articles`, articles)
    await browser.close()
})().catch(error => console.log(`error`, error))