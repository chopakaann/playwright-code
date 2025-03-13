import { test, expect } from '@playwright/test';
import { loginGoodsReservationEnvDev  } from '../../utils/login';
import *  as goods from '../../utils/goodsReservation'; 
import userCVM from '../../dataJson/userLogin.json';
import environment from '../../dataJson/environment.json';
const Mongo = require('../../database/mongo');  


let env = environment;
let user = userCVM.cvm.user;
let qtySaleUnit = '10';

test.beforeAll(async () => {
    let mongo = new Mongo(env, user);  
    await mongo.connect();  
    console.log("Database connected!");
    await mongo.cleanup();  
    await mongo.close();
  });

test('GoodsReservation CVM', async ({ page }) => {
    await loginGoodsReservationEnvDev(page, user, user);
    await goods.clickButtonVanShipingCreate(page);

    console.log('log :verify page product list');
    await goods.verifyPageGoodsReservation(page,"รายการเบิกสินค้า");
    await goods.verifyCategoryProductSearch(page,'ทั้งหมด');
    await goods.verifyImageProductInProductList(page);
    await goods.verifyPageGoodverifyIncludeVatSaleunitPriceInProductListsReservation(page, 0, '60.00');

    await goods.selectProductCategoryInProductList(page,'BrownSpirits');
    await goods.inputSearchProductInProductList(page,'หงส์ทอง 35 ดีกรี 350 ml (แสงโสม)');
    await goods.clickButtonSearchProductInProductList(page);

    await goods.inputQuantitySaleUnitInProductList(page,0, qtySaleUnit);
    await goods.clicktextPriceInProductList(page);
    await goods.clickButtonAddGoodsToBasketInProductList(page);

    



    const currentUrl = page.url();
    const goodsReservationID = currentUrl.split('/').pop();
    console.log(`Extracted ID: ${goodsReservationID}`); 

    console.log('log','verify product list in summaries page');
    await goods.verifyProductNameInSalesummaries(page, '0','1.หงส์ทอง 35 ดีกรี 350 ml (แสงโสม)' );
    await goods.verifyQuatitySaleUnitInSaleSummaries(page, '0', qtySaleUnit);
    await goods.verifyQuatityBaseUnitInSaleSummaries(page, '0', '0');
    await goods.clickReserveButtonInSaleSummaries(page);

    





});

