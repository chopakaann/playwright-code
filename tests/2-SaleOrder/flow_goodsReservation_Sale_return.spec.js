import { test, expect } from '@playwright/test';
import { loginGoodsReservation , loginSaleOrderEnv  } from '../../utils/login';
import { getSalePriceProduct, getBasePriceProduct ,convertStringToNumber  } from '../../utils/utils';
import *  as goods from '../../utils/goodsReservation'; 
import userCVM from '../../dataJson/userLogin.json';
import environment from '../../dataJson/environment.json';
import *  as sale from '../../utils/saleOrder'; 
const Mongo = require('../../database/mongo');  
//test.describe.configure({mode:'serial'});  // อันนี้ เป็นคำสัั่งที่ให้ Run เคส ต่อเนื่องกัน 


let env = environment.environmentTest;
let user = userCVM.cvm.user;
let qtySaleUnit = '500';
let productName = 'หงส์ทอง 35 ดีกรี 350 ml (แสงโสม)';



test.beforeAll(async () => {
    let mongo = new Mongo(env, user);  
    console.log(`Environment: ${env}`);
    await mongo.connect();  
    console.log("Database connected!");
    await mongo.cleanup();  
    await mongo.close();
  });

   test.describe.serial('Goods Reservation & Sale Order', () => {  
   
    test('GoodsReservation CVM', async ({ page }) => {
  
        await loginGoodsReservation  (page,  env, user, user);
        await goods.clickButtonVanShipingCreate(page);

        console.log('log :verify page product list');
        await goods.verifyPageGoodsReservation(page,"รายการเบิกสินค้า");
        await goods.verifyCategoryProductSearch(page,'ทั้งหมด');
        await goods.verifyImageProductInProductList(page);
        await goods.verifyPageGoodverifyIncludeVatSaleunitPriceInProductListsReservation(page, 0, '60.00');

        await goods.selectProductCategoryInProductList(page,'BrownSpirits');
        await goods.inputSearchProductInProductList(page,productName);
        await goods.clickButtonSearchProductInProductList(page);

        await goods.inputQuantitySaleUnitInProductList(page,0, qtySaleUnit);
        await goods.clicktextPriceInProductList(page);
        await goods.clickButtonAddGoodsToBasketInProductList(page);

        console.log('log','verify product list in summaries page');
        await goods.verifyProductNameInSalesummaries(page, '0','1.'+ productName );
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

        await loginSaleOrderEnv(page, env,user, user);

        console.log('verify search product code not found');
        await sale.inputTextSearch(page, '11111');
        await sale.clickButtonSearch(page);
        await sale.verifyEmptyProduct(page, 'ไม่พบข้อมูล');
        
        console.log('verify search product name not found');
        await sale.clearInputProductSerach(page);
        await sale.inputTextSearch(page, 'Sing');
        await sale.clickButtonSearch(page);
        await sale.verifyEmptyProduct(page, 'ไม่พบข้อมูล');

        await sale.clearInputProductSerach(page);
        await sale.inputTextSearch(page, productName);
        await sale.clickButtonSearch(page);
      
        let blendSaleQty = '10';
        let blendBaseQty = '5';
        await sale.inputQuantitySaleUnit(page, blendSaleQty);
        await sale.inputQuantityBaseUnit(page,blendBaseQty);

   
        const priceSaleBlend = convertStringToNumber(await getSalePriceProduct(page, 0, blendSaleQty));
        console.log('Total Sale Price:', priceSaleBlend);
        const prictBaseBlend = convertStringToNumber(await getBasePriceProduct(page, 0, blendBaseQty ));
        console.log('total Base Price' , prictBaseBlend);

        const totalAmount = (priceSaleBlend + prictBaseBlend).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
      
        console.log ('Total Amount', totalAmount)

        await sale.verifyFooterandTotalAmount(page, totalAmount);

        await sale.clickButtonTakeOrder(page);
        await sale.verifyOrderDetailInSummaryPage(page,0, productName, blendSaleQty,"โหล",priceSaleBlend.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));

        await sale.clickButtonPayment(page);
        await sale.clickButtonPaymentByCash(page);

        await sale.clickButtonConfirmPayment(page);
        await sale.verifyModalConfirmPayment(page,"คุณต้องการยืนยันการชำระเงินหรือไม่");
        await sale.clickConfirmInModalConfirmPayment(page);

        console.log ('verify page summary');
        await sale.verifyHeaderTitle(page,"สรุปการชำระเงิน");
        await sale.verifyHeaderInListPaymentDetail(page,"รายการชำระเงิน");

        await sale.clickButtonPrintTaxInvoice(page, "พิมพ์ใบเสร็จ");

        await sale.clickButtonHomePageTaxInvoice(page);
        await sale.clickConfirmGotoHomePage(page);

        await sale.verifyRedirectBacktoToDoListSaleInt(page, env);


        



    } )

  });