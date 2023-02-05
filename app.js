const puppeteer=require("puppeteer");

const {number,otp}= require("./credentials");


(async()=>{
    const browser=await puppeteer.launch({headless:false});

    // const context=browser.defaultBrowserContext();

    const page = await browser.newPage();

    try{

       await page.goto("https://app-staging.youshd.com/");
    //    await context.overridePermissions("https://app-staging.youshd.com")



        // await page._client.send("Emulation.clearDeviceMetricsOverride");
        await page.waitForXPath('(//*[@id="root"]/div/div/div[1]/div[2]/input)'
        );
    

        const [ number]=await page.$x('(//*[@id="root"]/div/div/div[1]/div[2]/input)'
        );
        number.click();
    

        const newPagepromise=new Promise(x=>
        browser.once("targetcreated",target=>x(target.page()))

        );

        const fbPopup=await newPagepromise;

        await fbPopup. waitForSelector("#root");


        await fbPopup.click("#root");
        await fbPopup.keyboard.type(number);
        await fbPopup.click("#otp-error");
        await fbPopup.keyboard.type(123456);
        console.log("login sucess");

        // await fbPopup.waitForSelector(".margin-bottom continue-button-bottom");
         
        // await fbPopup.click(".margin-bottom continue-button-bottom");
        if (fbPopup.url() === 'http://app-staging.youshd.com/dashboard') {
            console.log('Successful login');
        } else {
            console.error('Login failed');
        }
    } catch (error) {
        console.error('Login failed: ', error);
    } finally {
        await browser.close();
    }


})();










