import { expect } from '@playwright/test';
import { trimAndCheck, checkTrimmedText} from '../utils/utils';

export  const clickBackInProductList = async (page) =>{

    await page.waitForSelector('[data-cy="back-btn"]', { visible: true, timeout: 10000 });
    await page.locator('[data-cy="back-btn"]').click();
}


export const  clickButtonVanShipingCreate = async (page)=> {
    await page.waitForSelector('[data-cy="van-shipping-goods-reservation-request"]', { visible: true, timeout: 10000 });
    await page.locator('[data-cy="van-shipping-goods-reservation-request"]').click();
}


export const clickIncreaseSaleUnitInProductList = async (page, row, quantity) => {
    console.log('clickIncreaseSaleUnitInProductList');
    for (let i = 0; i < quantity; i++) {
        await page.locator(`[data-cy="button-increase-saleunit-${row}"]`).click();
    }
}
export const clickButtonAddGoodsToBasketInProductList = async (page)=> {
    console.log('clickButtonAddGoodsToBasketInProductList');
   
    await page.locator('[data-cy="button-add-goods-to-basket"]').click();
}

export const clickReserveButtonInSaleSummaries = async (page) => {

    await page.locator('[data-cy="salesummaries-reserve-button"]').click();
}

export const clickButtonNextInViewPDFPage = async (page) =>{

    await page.locator('[data-cy="van-shipping-goods-reservation-request"]').click();
}


export const clickButtonConfirmModalInSaleSummaries = async (page)=>{

    await page.locator('[data-cy="confirm-modal-confirm-button"]').click();
}

export const verifyPageGoodsReservation = async (page,text)=>{
    let headerTitle = await page.locator('[data-cy="header-title"]').textContent();
    console.log(headerTitle);

    let trimHeaderTitle = headerTitle.trim();
    let trimExpectTitle = text.trim();

    expect(trimHeaderTitle).toBe(trimExpectTitle);
    
}
