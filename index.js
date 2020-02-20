const puppeteer = require('puppeteer');

searchTerms = [
	'payroll'
];
(async () => {
	const browser = await puppeteer.launch({headless:false});
	const page = await browser.newPage();
	await page.setViewport({width: 1366, height: 768})
	await page.goto('https://www.google.com');//, {waitUntil: 'networkidle0'}
	
	for(var term in searchTerms){
		await page.type('input[name=q]', searchTerms[term], {delay: 100});
		await page.click('input[type="submit"]');
		page.waitForNavigation();
		console.log("1");
		await page.waitForSelector('.sA5rQ');
		const links = await page.$$('.sA5rQ');
		console.log("links: ", links.length);
		const linkTexts = await page.$$eval('.sA5rQ', anchors => { return anchors.map(a => { return a.textContent }) });
		
		console.log('links text: ', linkTexts);
		await links[0].click();
		await page.waitForNavigation();
		var pageTitle = await page.title();
		console.log("title: ", pageTitle);
	}	await page.screenshot({path: './screenshots/' + pageTitle + '.png'});
		console.log("screenshot saved");
	
	//await browser.close();
	
})();



