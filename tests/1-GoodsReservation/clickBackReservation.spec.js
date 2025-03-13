import { test, expect } from '@playwright/test';
import { loginGoodsReservationEnvDev  } from '../../utils/login';
import *  as goods from '../../utils/goodsReservation'; 
import userCVM from '../../dataJson/userLogin.json';
import environment from '../../dataJson/environment.json';
const Mongo = require('../../database/mongo');  // ไปที่โฟลเดอร์ database


let env = environment;
let user = userCVM.cvm.user;


test.beforeAll(async () => {
    let mongo = new Mongo(env, user);  
    await mongo.connect();  
    console.log("Database connected!");
    await mongo.cleanup();  
    await mongo.close();
  });

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

