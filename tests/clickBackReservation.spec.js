import { test, expect } from '@playwright/test';
import { loginGoodsReservationEnvDev  } from '../utils/login';
import *  as goods from '../utils/goodsReservation'; 
import userCVM from '../dataJson/userLogin.json';


// let env = "sit"
let user = userCVM.cvm.user

// test.beforeAll(async () => {
//     console.log("🔄 Initializing database cleanup...");
//     await mongo.cleanup(env, user);
// });

test('Go back', async ({ page }) => {
    await loginGoodsReservationEnvDev(page, user, user);

    await goods.clickBackInProductList(page);
});

test('Go back after create GoodsReservation', async ({ page }) => {
    await loginGoodsReservationEnvDev(page, user,user);
    await goods.clickButtonVanShipingCreate(page);

    await goods.clickIncreaseSaleUnitInProductList(page,'0','1');
    await goods.clickIncreaseSaleUnitInProductList(page,'0','5');
    await goods.clickButtonAddGoodsToBasketInProductList(page);
    await goods.clickReserveButtonInSaleSummaries(page);
    await goods.clickButtonConfirmModalInSaleSummaries(page);

    await goods.clickButtonNextInViewPDFPage(page);
    await goods.clickBackInProductList(page);

    

});

