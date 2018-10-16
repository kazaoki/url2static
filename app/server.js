

const fs = require('fs');
const puppeteer = require('puppeteer');

(async() => {
   const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    // const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // await page.goto('https://kazaoki.jp', {timeout: 5000, waitUntil: 'networkidle2'}); //default 1000
    // await page.goto('http://tipsnote.github.io/vue-test/', {timeout: 5000, waitUntil: 'networkidle2'}); //default 1000
    await page.goto('https://www.google.co.jp/search?q=歯医者+池袋&start=30', {timeout: 5000, waitUntil: 'networkidle2'}); //default 1000

// console.log(await page.text())
console.log(await page.content())

    browser.close();

})();

console.log('123!')