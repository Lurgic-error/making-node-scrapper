const puppeteer = require('puppeteer');

puppeteer.launch()
    .then(async browser => {
        const page = await browser.newPage()
        await page.goto("https://www.reddit.com/r/scraping/")
        await page.waitForSelector('body')
        let scrappedPosts = await page.evaluate(() => {
            let posts = document.body.querySelectorAll('.Post')
            let scrappedItems = []
            posts.forEach(post =>{
                let postTitle = post.querySelector('h3').innerText
                let postDescription = ''
                try {
                    postDescription = post.querySelector('p').innerText
                } catch (error) {
                    console.log(`error`, error)
                }
                scrappedItems.push({
                    title:postTitle,
                    description:postDescription
                })
            })
            let items = {
                posts:scrappedItems
            }
            return items
        })
        console.log(`scrappedPosts`, scrappedPosts)
        await browser.close()
    })
    .catch(err => console.log(`err`, err))


