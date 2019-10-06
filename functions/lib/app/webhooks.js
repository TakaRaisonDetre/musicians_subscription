"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const helpers_1 = require("./helpers");
exports.recurringPaymentWebhook = functions.https.onRequest((req, res) => {
    const data = req.body.data.object;
    const customerId = data.customer;
    const planId = data.lines.data[0].plan.id;
    const hook = req.body.type;
    helpers_1.recurringPayment(customerId, planId, hook)
        .then(() => res.status(200).send(`successfully handled ${hook}`))
        .catch(err => res.status(400).send(err));
});
//# sourceMappingURL=webhooks.js.map