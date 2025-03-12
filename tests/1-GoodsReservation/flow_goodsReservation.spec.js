import { test, expect } from '@playwright/test';
import { loginGoodsReservationEnvDev  } from '../../utils/login';
import *  as goods from '../../utils/goodsReservation'; 
import userCVM from '../../dataJson/userLogin.json';
import environment from '../../dataJson/environment.json';
const Mongo = require('../../database/mongo');  // ไปที่โฟลเดอร์ database


let env = environment;
let user = userCVM.cvm.user;


test.beforeAll(async () => {
    let mongo = new Mongo(env, user);  // You can pass 'sit' and employeeId or any employeeIds
    await mongo.connect();  // Connect to MongoDB
    console.log("Database connected!");
    await mongo.cleanup();  
    await mongo.close();
  });

test('GoodsReservation CVM', async ({ page }) => {
    await loginGoodsReservationEnvDev(page, user, user);
    await goods.clickButtonVanShipingCreate(page);
    await goods.verifyPageGoodsReservation(page,"รายการเบิกสินค้า");

    
   




});

