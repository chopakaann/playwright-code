import { expect } from '@playwright/test';


export const inputTextSearch = async (page,  text)=>{
    await page.waitForSelector('[data-cy="input-product-search"]', { visible: true, timeout: 10000 });
    await page.locator('[data-cy="input-product-search"]').fill(text);
}
export const clickButtonSearch = async (page,  text)=>{
    await page.waitForSelector('[data-cy="input-product-search"]', { visible: true, timeout: 10000 });
    await page.locator('[data-cy="button-product-search"]').click();
}


export const verifyEmptyProduct = async (page,text)=>{

        const input = await page.waitForSelector('[data-cy="empty-product"]', { visible: true, timeout: 10000 });
            let name = await input.textContent(); 
            console.log("emtry :" ,name);
        
            let trimName = name.trim();
            console.log("emtrytrimName :" ,trimName);
            let trimtext  = text.trim();
            console.log("emtrytrimtext :" ,trimtext);
        
            expect(trimName).toBe(trimtext);
}

export const waitLoading = async (page)=>{
    await page.waitForSelector('[data-cy="loading"]', { state: 'detached', timeout: 10000 });
}

export const clearInputProductSerach = async (page)=>{

    await page.locator('[data-cy="input-product-search"]').fill('');
}
export const inputQuantitySaleUnit = async (page, qty) => {
    console.log('inputQuantitySaleUnit');
    const inputField = page.locator('[data-cy="input-number-saleunit-0"]');
    await inputField.fill(qty.toString()); 
    await inputField.blur(); 
}
