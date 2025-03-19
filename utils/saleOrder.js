export const inputTextSearch = async (page,  text)=>{
    await page.waitForSelector('[data-cy="input-product-search"]', { visible: true, timeout: 10000 });
    await page.locator('[data-cy="input-product-search"]').fill(text);
}
export const clickButtonSearch = async (page,  text)=>{
    await page.waitForSelector('[data-cy="input-product-search"]', { visible: true, timeout: 10000 });
    await page.locator('[data-cy="button-product-search"]').click();
}


export const verifyEmptyProduct = async (page,text)=>{
      
    await page.waitForSelector('[data-cy="empty-product"]', { visible: true, timeout: 10000 });
    await waitLoading(page); 
    await expect('[data-cy="empty-product"]').toHaveText(text); 
}

export const waitLoading = async (page)=>{
    await page.waitForSelector('[data-cy="loading"]', { state: 'detached', timeout: 10000 });
}

