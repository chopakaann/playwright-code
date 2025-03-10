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

    await goods.clickIncreaseSaleUnitInProductList('0','10');
    // await goodsReservation.clickIncreaseSaleUnitInProductList('0','5');
    await goods.clickButtonAddGoodsToBasketInProductList();
    // await page.locator(`[data-cy="button-increase-saleunit-0"]`).dblclick();
});

