"use strict";
//// Initialize Express App and Middleware ////
Object.defineProperty(exports, "__esModule", { value: true });
const CORS = require("cors");
exports.cors = CORS({ origin: true });
function corsMiddleware(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
}
const express = require("express");
exports.app = express();
const helpers_1 = require("./helpers");
exports.app.use(exports.cors);
exports.app.use(corsMiddleware);
exports.app.use(helpers_1.authenticateUser);
const admin = require("firebase-admin");
//// Service account required for Stripe Connect OAuth
const serviceAccount = require('../../credentials.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://raisondetre-tokyo.firebaseio.com"
});
const firestore = admin.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);
//// If not using Stripe Connect, initialize without service account
// admin.initializeApp(functions.config().firebase);
exports.db = admin.firestore();
exports.auth = admin.auth();
//// Initalize Stripe NodeJS SDK ////
const Stripe = require("stripe");
// Possible bug with v1.0 and firebase-tools CLI
// export const stripeSecret       = functions.config().stripe.secret;
// export const stripePublishable  = functions.config().stripe.publishable;
// export const stripeClientId     = functions.config().stripe.clientid; // only used for stripe connect
exports.stripeSecret = serviceAccount.stripe.secret;
exports.stripePublishable = serviceAccount.stripe.publishable;
exports.stripeClientId = serviceAccount.stripe.clientid;
exports.stripe = new Stripe(exports.stripeSecret);
//# sourceMappingURL=config.js.map