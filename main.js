const puppeteer = require('puppeteer')
const cheerio = require("cheerio")
const jsonfile = require("jsonfile")

const main = async (url) => {

  // 1) abrir pagina do site
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto(url)

  // 2) capturar o titulo da pagina
  const body = await page.evaluate(() => document.querySelector('body').innerHTML)
  const $ = cheerio.load(body)

  const response = {
    title: $("h1").text()
  }

  // 3) salvar as informacoes encontradas em um arquivo json
  jsonfile.writeFile(
    './clickrbs.json',
    response
  ).then(() => {
    console.log("Arquivo foi criado!")
  }).catch((err) => console.log(err))

  await browser.close()
}

main("https://www.clicrbs.com.br/")