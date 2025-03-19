import { test, expect } from '@playwright/test';
import { loginGoodsReservationEnvDev , loginSaleOrderEnvDev } from '../../utils/login';
import *  as goods from '../../utils/goodsReservation'; 
import userCVM from '../../dataJson/userLogin.json';
import environment from '../../dataJson/environment.json';
import *  as sale from '../../utils/saleOrder'; 
const Mongo = require('../../database/mongo');  


let env = environment;
let user = userCVM.cvm.user;
let qtySaleUnit = '500';



test.beforeAll(async () => {
    let mongo = new Mongo(env, user);  
    await mongo.connect();  
    console.log("Database connected!");
    await mongo.cleanup();  
    await mongo.close();
  });

  test.describe.serial('Goods Reservation & Sale Order', () => {  
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

        console.log('log','verify product list in summaries page');
        await goods.verifyProductNameInSalesummaries(page, '0','1.หงส์ทอง 35 ดีกรี 350 ml (แสงโสม)' );
        await goods.verifyQuatitySaleUnitInSaleSummaries(page, '0', qtySaleUnit);
        await goods.verifyQuatityBaseUnitInSaleSummaries(page, '0', '0');


        const currentUrl = page.url();
        const goodsReservationID = currentUrl.split('/').pop();
        console.log(`Extracted ID: ${goodsReservationID}`); 

        await goods.clickReserveButtonInSaleSummaries(page);
        await goods.clickButtonConfirmModalInSaleSummaries(page);
        await goods.clickButtonNextInViewPDFPage(page);




        const goodsReservationText = await page.locator(`[data-cy="van-shipping-goods-reservation-id-0"]`).textContent();
        console.log (goodsReservationText);
        let goodsReservationDocumentNumber = goodsReservationText.split('| สถานะ : ')[0].trim();
        const goodsReservationStatus = goodsReservationText.split('| สถานะ : ')[1].trim();
        console.log (goodsReservationDocumentNumber);
        console.log (goodsReservationStatus);

        await goods.verifyStatusInGoodsReservationList(page, 0,goodsReservationStatus);

        





    });

    test('Sale Order ', async ({page}) => { 

        await loginSaleOrderEnvDev(page, user, user);

        await sale.inputTextSearch(page, '11111');
        await sale.clickButtonSearch(page);
    
        await sale.verifyEmptyProduct(page, 'ไม่พบข้อมูล');

    } )

  });