import { expect } from '@playwright/test';

export async function clickBackInProductList(page) {

    await page.waitForSelector('[data-cy="back-btn"]', { visible: true, timeout: 10000 });
    await page.locator('[data-cy="back-btn"]').click();
}


export async function clickButtonVanShipingCreate(page) {
    await page.locator('[data-cy="van-shipping-goods-reservation-request"]').click();
}


export async function clickIncreaseSaleUnitInProductList(page, row, quantity) {
    console.log('clickIncreaseSaleUnitInProductList');
    for (let i = 0; i < quantity; i++) {
        await page.locator(`[data-cy="button-increase-saleunit-${row}"]`).click();
    }
}
export async function clickButtonAddGoodsToBasketInProductList(page) {
    console.log('clickButtonAddGoodsToBasketInProductList');
   
    await page.locator('[data-cy="button-add-goods-to-basket"]').click();
}
