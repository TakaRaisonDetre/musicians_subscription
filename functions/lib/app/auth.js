"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const config_1 = require("./config");
const helpers_1 = require("./helpers");
exports.createStripeCustomer = functions.auth
    .user().onCreate((user, context) => {
    const userRef = config_1.db.collection('users').doc(user.uid);
    return helpers_1.createCustomer(user)
        .then(customer => {
        /// update Firestore with stripe customer id
        const data = { stripeCustomerId: customer.id };
        return userRef.set(data, { merge: true });
    })
        .catch(console.log);
});
//# sourceMappingURL=auth.js.map