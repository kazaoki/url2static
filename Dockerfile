FROM kazaoki/puppeteer

ADD ./app /app

CMD ["node", "/app/server.js"]
