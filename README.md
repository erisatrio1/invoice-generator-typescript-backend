# Setup Project

Create .env file for both services based on .env.example

## Description

this service help us to generate invoice automatically. using new technology stack such as typescript, mongobd, postgresql, puppeteer, minio, and etc. 

invoice-generator service accept ID parameter for generating invoice, then will send to rabbit mq for consume pdf-generator.

pdf-generator will consume the link_html the generate pdf with puppeeter.

## Technolgy used
invoice-generator: mongodb, rabbit, and postgresql

pdf-generator: mongodb, rabbit, minio

```shell

npm install

npm run build

npm run start

```