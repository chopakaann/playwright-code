const { MongoClient } = require("mongodb");
require("dotenv").config();

class Mongo {
    constructor() {
        this.client = null;
        this.uri = process.env.MONGO_URI || "mongodb://otcuser:otcPassw0rd@10.7.55.55:27017/?authSource=admin";
    }

    async connect() {
        if (!this.client) {
            this.client = new MongoClient(this.uri);
            await this.client.connect();
            console.log("✅ Database connected!");
        }
    }

    async close() {
        if (this.client) {
            await this.client.close();
            this.client = null;
            console.log("✅ Database connection closed!");
        }
    }

    async cleanup(env, employeeIds) {
        await this.connect();
        console.log(`🔄 Cleaning up database for env: ${env} and employees: ${employeeIds}`);

        // กำหนดค่าตาม `env`
        const isSIT = env === "sit";
        const retailDatabase = isSIT ? "nsi_retail_sit" : "nsi_retail";
        const salesOrderDatabase = isSIT ? "nsi_sales_order_sit" : "nsi_sales_order";
        const paymentDatabase = isSIT ? "nsi_payment_sit" : "nsi_payment";
        const sapInterfaceDatabase = isSIT ? "nsi_sap_interface_sit" : "nsi_sap_interface";

        // รายชื่อ Collection ที่ต้องลบ
        const collections = {
            // contacts: "contacts",
            // receipts: "receipts",
            // salesOrders: "sales_orders",
            // payments: "payments",
            // goodsReturns: "goods_returns",
            // vehicleStocks: "vehicle_stocks",
            goodsReservations: "goods_reservations",
            // runningDocuments: "running_documents",
            // salesOrderSap: "sales_orders",
        };

        // ค้นหา Contact ID จากพนักงานที่ต้องการลบ
        const employees = await this.findEmployees(retailDatabase, collections.contacts, employeeIds);
        const contactIds = employees.map((doc) => doc.contactId);

        // ลบข้อมูลใน Collection ต่างๆ
        // await this.deleteDocuments(salesOrderDatabase, collections.receipts, contactIds);
        // await this.deleteDocuments(paymentDatabase, collections.payments, contactIds);
        // await this.deleteDocuments(retailDatabase, collections.goodsReturns, contactIds);
        // await this.deleteDocuments(salesOrderDatabase, collections.salesOrders, contactIds, "createdBy.contactId");
        // await this.deleteDocuments(retailDatabase, collections.vehicleStocks, contactIds);
        await this.deleteDocuments(retailDatabase, collections.goodsReservations, contactIds);
        // await this.deleteDocuments(retailDatabase, collections.runningDocuments, contactIds);

        console.log("✅ Cleanup completed!");
    }

    async findEmployees(database, collection, employeeIds) {
        const filter = { employeeId: { $in: employeeIds } };                                         
        return await this.client.db(database).collection(collection).find(filter).toArray();
    }

    async deleteDocuments(database, collection, contactIds, field = "createdBy") {
        const filter = { [field]: { $in: contactIds } };
        const result = await this.client.db(database).collection(collection).deleteMany(filter);
        console.log(`✅ Deleted ${result.deletedCount} documents from ${collection} (${database})`);
    }
}

module.exports = new Mongo();
