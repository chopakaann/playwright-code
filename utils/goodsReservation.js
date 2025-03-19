import { expect } from '@playwright/test';


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
export const verifyCategoryProductSearch = async (page,text)=>{
    const locator = page.locator('[data-cy="category-product-search"]');

    await locator.waitFor(); // รอให้ element ปรากฏ
    await expect(locator).toBeVisible(); // ตรวจสอบว่า element มองเห็นได้
    await expect(locator).toHaveText(text); // ตรวจสอบว่า element มีข้อความที่ต้องการ
}

export const verifyImageProductInProductList = async (page)=>{
    const locator = page.locator('[data-cy="image-product-0"]');
    await locator.waitFor(); 
    await expect(locator).toBeVisible(); 
    
}

export const verifyPageGoodverifyIncludeVatSaleunitPriceInProductListsReservation = async (page,row, salePrice)=>{
    let productSalePrice = await page.locator('[data-cy="text-include-vat-saleunit-price-' + row + '"]').textContent();
    console.log(productSalePrice);

    let trimSalePrice = productSalePrice.trim();
    let trimExpectSalePrice = salePrice.trim();

    expect(trimSalePrice).toBe(trimExpectSalePrice);
    
}
export const selectProductCategoryInProductList = async (page, ProductCategory)=>{
    await page.locator('[data-cy="category-product-search"]').click();
    await page.locator('[data-cy="category-product-search-dropdown-items"]').getByText(ProductCategory).click();
}

export const inputSearchProductInProductList = async (page, productName)=>{
    await page.locator('[data-cy="input-product-search"]').fill(productName);
}

export const clickButtonSearchProductInProductList = async (page)=>{
    await page.locator('[data-cy="button-product-search"]').click();
}

export const inputQuantitySaleUnitInProductList = async (page, row, qty)=>{
    await page.waitForSelector('[data-cy="input-number-saleunit-' + row + '"]', { visible: true, timeout: 10000 });
    await page.locator('[data-cy="input-number-saleunit-' + row + '"]').fill(qty);
}

export const clicktextPriceInProductList = async (page)=>{
    await page.waitForSelector('[data-cy="text-price-saleunit-0"]', { visible: true, timeout: 10000 });
    await page.locator('[data-cy="text-price-saleunit-0"]').click();
}

export const verifyProductNameInSalesummaries = async (page, row, productName) => {
    const input = await page.waitForSelector('[data-cy="salesummaries-productname-' + row + '"]', { visible: true, timeout: 10000 });

    let name = await input.textContent(); // ใช้ input.textContent() ตรงๆ ไม่ต้องใช้ page.locator()
    console.log(name);

    let trimproductName = name.trim();
    let trimExpecproductName = productName.trim();

    expect(trimproductName).toBe(trimExpecproductName);
}
export const verifyQuatitySaleUnitInSaleSummaries = async (page,  row, qtySaleUnit ) => {
    console.log("Expected qtySaleUnit:", qtySaleUnit); 
    const value = await page.locator('[data-cy="salesummaries-sale-unit-' + row + '"] > [data-cy="input-number-sale-unit"]').inputValue();
    console.log(value);
    expect(value).toBe(qtySaleUnit); 
}
export const verifyQuatityBaseUnitInSaleSummaries = async (page, row, qtyBaseUnit ) => {
    const value = await page.locator('[data-cy="salesummaries-base-unit-' + row + '"] > [data-cy="input-number-base-unit"]').inputValue();
    console.log(value);
    expect(value).toBe(qtyBaseUnit); 
}

export const verifyStatusInGoodsReservationList = async (page, row, id ) => {
    await expect(page.locator('[data-cy="van-shipping-goods-reservation-status-'+row+'"]')).toHaveText(id);

}


