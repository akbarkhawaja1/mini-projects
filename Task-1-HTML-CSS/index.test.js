describe('Testing website functionality', () => {
	let page;

	beforeAll(async () => {
		page = await global.browser.newPage()
		await page.goto('http://localhost:5500')
	})

	afterAll(async () =>{
		await page.close();
	})

	test('dark mode button updates button text and saves preference', async () => {
		const darkModeButton = await page.$('#dark-mode-toggle')
		const intialText = await page.evaluate(button => button.textContent, darkModeButton)
		expect(intialText).toBe('Dark Mode')

		await darkModeButton.click();

		const bodyClass = await page.evaluate(() => document.body.classList.contains('dark-mode'))
		expect(bodyClass).toBe(true)

		const buttonTextAfterClick = await page.evaluate(button => button.textContent, darkModeButton)
		expect(buttonTextAfterClick).toBe('Light Mode')

		await darkModeButton.click();

		const bodyClassAfterSecondClick = await page.evaluate(() => document.body.classList.contains('dark-mode'))
		expect(bodyClassAfterSecondClick).toBe(false)

		const buttonTextAfterSecondClick = await page.evaluate(button => button.textContent, darkModeButton)
		expect(buttonTextAfterSecondClick).toBe('Dark Mode')
	
	})

	test('hash changes determine section visibility', async () => {
		const welcomeMessage = await page.$eval('#welcome-message', el => window.getComputedStyle(el).display)
		const aboutSection = await page.$eval('#about', el => window.getComputedStyle(el).display)

		expect(welcomeMessage).toBe('block')
		expect(aboutSection).toBe('none')

		await page.goto('http://localhost:5500/#about')
		await page.waitForSelector('#about', {visible: true})

		const updatedWelcomeMessage = await page.$eval('#welcome-message', el => window.getComputedStyle(el).display)
		const updatedAboutSection = await page.$eval('#about', el => window.getComputedStyle(el).display)

		expect(updatedWelcomeMessage).toBe('none')
		expect(updatedAboutSection).toBe('block')
	})
})


