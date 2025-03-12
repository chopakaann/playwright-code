import { test } from '@playwright/test';
import { expect } from '@playwright/test';


export async function loginGoodsReservationEnvDev(page, user, password) {
    await loginTechServPortal(page, user, password);
    
    await page.waitForSelector('#techserv-abbrev-name-219', { timeout: 20000 });
    
    const token = await page.evaluate(() => {
        return JSON.parse(localStorage.getItem('techserv-oauth-user:https://oatdev.thaibevapp.com:42E6EC86-ABCE-49C2-BD13-B45F63E71951')).access_token;
    });

    console.log(token);
    // const urlWithToken = `https://sit.imaginic.dev/?accessToken=${token}`;
    const urlWithToken =`https://sit-device-uat.thaibevapp.com/?accessToken=${token}`;

    console.log(urlWithToken);

    await page.goto(urlWithToken);  
    await selectOrganization(page);  
    await page.click('[data-cy="main-menu-goodsreservation"]');
}


export async function loginTechServPortal(page, user, password) {
    await page.goto('https://techservportaldev.thaibevapp.com/');
    console.log(user);
    console.log(password);

    await page.waitForSelector('#Username', { timeout: 20000 });
    await page.fill('#Username', user);    
    await page.waitForSelector('#Password', { timeout: 20000 });
    await page.fill('#Password', password);   
    await page.click('#btnLogin');
}



export async function selectOrganization(page) {
    await page.locator('#org-select-company').waitFor({ state: 'visible', timeout: 20000 });
    await page.locator('#org-select-channels').waitFor({ state: 'visible' });
    await page.locator('#org-select-sales').waitFor({ state: 'visible' });

    const submitButton = page.locator('[data-cy="org-button-submit"]');
    await submitButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(submitButton).toBeEnabled(); // เช็คว่าปุ่มไม่ถูกปิดใช้งาน
    await submitButton.click();
}

export async function loading(page, limit = 100000) {
    console.log('loading');
    await page.locator('[data-cy="loading"]').waitFor({ state: 'detached', timeout: limit });
}
