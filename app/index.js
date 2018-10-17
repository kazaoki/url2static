const fs = require('fs')
const puppeteer = require('puppeteer')
const http = require('http')
const url = require('url')
const server = http.createServer()

const count_file = 'count.dat'

server.on('request', async(req, res) => {
    let parse = url.parse(req.url, true)
    let query = parse.query
    let target_url = Object.keys(query)[0]

    // proxy get
    if(target_url){

        // fetch
        const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']})
        const page = await browser.newPage()
        await page.goto(target_url, {timeout: 5000, waitUntil: 'networkidle2'})

        // output
        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.write(await page.content())
        res.end()
        browser.close()

        // count up
        let count;
        try {
            fs.statSync(count_file);
            count = fs.readFileSync(count_file)
        } catch(err) {
            count = 0
        }
        fs.writeFileSync(count_file, ++count)
    }

    // return count.dat
    else if(parse.path === '/count.dat'){

        // count load
        let count = fs.readFileSync(count_file)

        // output
        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.write(count)
        res.end()
    }

}).listen(8080)
