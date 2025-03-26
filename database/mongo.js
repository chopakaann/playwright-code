const { MongoClient } = require("mongodb");

const appEnv = {
    sit: "sit",
};

class Mongo {
    constructor(env, employeeId) {
        // Define variables
        this.env = env ?? process.env.APP_ENV ?? "dev";
        this.employeeIds = employeeId ? [employeeId] : ["DEMO0017", "DEMO0018", "DEMO0019"];

        // Database configuration
        this.client = undefined;
        this.uri = process.env.MONGO_URI
            ? process.env.MONGO_URI
            : "mongodb://otcuser:otcPassw0rd@10.7.55.55:27017/?authSource=admin&readPreference=primary&directConnection=true&ssl=false";

        // Databases
        this.retailDatabase =
        this.env == appEnv.sit ? "nsi_retail_sit" : "nsi_retail";
        this.env == appEnv.sit ? "nsi_sale_order_sit" : "nsi_sale_order";
        this.env == appEnv.sit ? "nsi_payment_sit" : "nsi_payment";

        // Collections
        this.goodsReservationsCollection = "goods_reservations";   
        this.contactsCollection = "contacts";  
        this.vehicleStocksCollection = "vehicle_stocks"; 
        this.saleOrderCollection = "sales_orders"; 
        this.receiptCollection = "receipts"; 
        this.paymentsCollection = "payments";
    }


    
    async connect() {
        if (!this.client) {
            this.client = new MongoClient(this.uri);
            await this.client.connect();
            console.log("Database connected!");
        }
    }

    async close() {
        if (this.client) {
            console.log("Database connection closed!");
            await this.client.close();
        }
    }

    async cleanup() {
        // Find employee
        const employees = await this.findEmployees(this.employeeIds);
        const contactIds = employees.map((doc) => doc.contactId);

        // Delete goods reservations
        await this.deleteGoodsReservations(contactIds);
        await this.deleteVehicleStocks(contactIds);
    }

    async findEmployees(employeeIds) {
        const filter = { employeeId: { $in: employeeIds } };
        const cursor = this.client
            .db(this.retailDatabase)
            .collection(this.contactsCollection)
            .find(filter);

        const documents = await cursor.toArray();
        return documents;
    }

    async deleteGoodsReservations(contactIds) {
        const filter = { createdBy: { $in: contactIds } };
        const result = await this.client
            .db(this.retailDatabase)
            .collection(this.goodsReservationsCollection)
            .deleteMany(filter);

        console.log(`Deleted ${result.deletedCount} documents from goods_reservations collection.`);
    }
    async deleteVehicleStocks(contactIds) {
        const filter = { createdBy: { $in: contactIds } };
        const result = await this.client
            .db(this.retailDatabase)
            .collection(this.vehicleStocksCollection)
            .deleteMany(filter);

        console.log(`Deleted ${result.deletedCount} documents from vehicle stock collection.`);
    }
}

module.exports = Mongo;  

