#!/bin/bash

docker run -v $(pwd)/app:/app -p 3412:8080 --name url2static --restart=always kazaoki/puppeteer &
