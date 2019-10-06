"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const helpers = require("./helpers");
const config_1 = require("./config");
// POST Charge
config_1.app.post('/charges', (req, res) => {
    const userId = req.user.uid;
    const sourceId = req.body.sourceId;
    const amount = req.body.amount;
    const currency = req.body.currency;
    const promise = helpers.createCharge(userId, sourceId, amount, currency);
    defaultHandler(promise, res);
});
// GET User Charges
config_1.app.get('/charges', (req, res) => {
    const userId = req.user.uid;
    const promise = helpers.getUserCharges(userId);
    defaultHandler(promise, res);
});
// POST sources
config_1.app.post('/sources', (req, res) => {
    const userId = req.user.uid;
    const sourceId = req.body.sourceId;
    const promise = helpers.attachSource(userId, sourceId);
    defaultHandler(promise, res);
});
// GET customer (includes source and subscription data)
config_1.app.get('/customer', (req, res) => {
    const userId = req.user.uid;
    const promise = helpers.getCustomer(userId);
    defaultHandler(promise, res);
});
// POST subscriptions (creates subscription on user account)
config_1.app.post('/subscriptions', (req, res) => {
    const userId = req.user.uid;
    const sourceId = req.body.sourceId;
    const planId = req.body.planId;
    const promise = helpers.createSubscription(userId, sourceId, planId);
    defaultHandler(promise, res);
});
// PUT subscriptions (cancels subscription)
config_1.app.put('/subscriptions/cancel', (req, res) => {
    const userId = req.user.uid;
    const planId = req.body.planId;
    const promise = helpers.cancelSubscription(userId, planId);
    defaultHandler(promise, res);
});
// Default handling of response
function defaultHandler(promise, res) {
    promise
        .then(data => res.status(200).send(data))
        .catch(err => res.status(400).send(err));
}
exports.api = functions.https.onRequest(config_1.app);
//# sourceMappingURL=api.js.map