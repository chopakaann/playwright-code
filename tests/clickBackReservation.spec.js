import { test, expect } from '@playwright/test';
import { loginGoodsReservationEnvDev  } from '../utils/login';
import *  as goods from '../utils/goodsReservation'; 


test('Go back', async ({ page }) => {
    await loginGoodsReservationEnvDev(page, "DEMO0017", "DEMO0017");

    await goods.clickBackInProductList(page);
});

test('Go back after create GoodsReservation', async ({ page }) => {
    await loginGoodsReservationEnvDev(page, "DEMO0017", "DEMO0017");
    await goods.clickButtonVanShipingCreate(page);

    await goods.clickIncreaseSaleUnitInProductList(page,'0','1');
    await goods.clickIncreaseSaleUnitInProductList(page,'0','5');
    await goods.clickButtonAddGoodsToBasketInProductList(page);
    await goods.clickReserveButtonInSaleSummaries(page);
    await goods.clickButtonConfirmModalInSaleSummaries(page);

    await goods.clickButtonNextInViewPDFPage(page);
    await goods.clickBackInProductList(page);

    

});

