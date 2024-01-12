import puppeteer from 'puppeteer';

export async function scrapeData(url) {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto(url);

  const originElement = await page.waitForSelector('div.CbjZQb.QORQHb > span:nth-child(1)');
  const origin = await page.evaluate(el => el.textContent.trim(), originElement);

  const destinationElement = await page.waitForSelector('div.CbjZQb.QORQHb > span:nth-child(3)');
  const destination = await page.evaluate(el => el.textContent.trim(), destinationElement);

  const priceElement = await page.waitForXPath('//div[@class="QORQHb"]//span');
  const price = await page.evaluate(el => el.textContent.trim(), priceElement);
  const departureTimeElements = await page.$$eval('div.c257Jb.QwxBBf.NbfThf > div.OJg28c.YMlIz.y52p7d',
    elements => elements.map(el => el.textContent.replace(/\+1$/, "").trim()));
  const departingFlight = {
    originCode: await page.waitForXPath('//div[contains(@class, "ZHa2lc tdMWuf y52p7d")]//span[contains(@dir, "ltr") and normalize-space()]')
      .then(element => page.evaluate(el => el.textContent.trim(), element)),
    departureDate: await page.waitForSelector('.tMLpW')
      .then(element => page.evaluate(el => el.textContent.trim(), element)),
    departureTime: await page.waitForXPath('//div[contains(@class, "b0EVyb YMlIz y52p7d")][normalize-space()] | //div[@class="b0EVyb YMlIz y52p7d"][normalize-space()] ')
      .then(element => page.evaluate(el => el.textContent.replace(/\+1$/, "").trim(), element)),
    destinationCode: await page.waitForXPath('//div[contains(@class, "FY5t7d tdMWuf y52p7d")]//span[contains(@dir, "ltr") and normalize-space()]')
      .then(element => page.evaluate(el => el.textContent.trim(), element)),
    arrivalDate: await page.waitForSelector('.tMLpW')
      .then(element => page.evaluate(el => el.textContent.trim(), element)),
    arrivalTime: departureTimeElements[0],
  };

  const returningFlight = {
    originCode: await page.waitForSelector('div:nth-child(2) > div.mz0jqb > div > .yJwmMb > div.c257Jb.QwxBBf.NbfThf > div.ZHa2lc.tdMWuf.y52p7d > span')
      .then(element => page.evaluate(el => el.textContent.trim(), element)),
    departureDate: await page.waitForSelector('div:nth-child(2) > div.uQEzCd > div > div > div.tMLpW')
      .then(element => page.evaluate(el => el.textContent.trim(), element)),
    departureTime: await page.waitForSelector('div:nth-child(2) > div.mz0jqb > div > .yJwmMb > div.c257Jb.QwxBBf.NbfThf > div.b0EVyb.YMlIz.y52p7d')
      .then(element => page.evaluate(el => el.textContent.replace(/\+1$/, "").trim(), element)),
    destinationCode: await page.waitForSelector('div:nth-child(2) > div.mz0jqb > div > .yJwmMb > div.c257Jb.QwxBBf.NbfThf > div.FY5t7d.tdMWuf.y52p7d > span')
      .then(element => page.evaluate(el => el.textContent.trim(), element)),
    arrivalDate: await page.waitForSelector('div:nth-child(2) > div.uQEzCd > div > div > div.tMLpW')
      .then(element => page.evaluate(el => el.textContent.trim(), element)),
    arrivalTime: departureTimeElements[1]
  };

  await browser.close();

  const departingDate = new Date(departingFlight.departureDate + ' ' + departingFlight.departureTime);
  const returningDate = new Date(returningFlight.departureDate + ' ' + returningFlight.departureTime);
  const duration = Math.floor((returningDate - departingDate) / (1000 * 60 * 60 * 24));

  return {
    origin,
    destination,
    price,
    duration,
    departingFlight,
    returningFlight,
  };
}
