"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const rp = require("request-promise");
const functions = require("firebase-functions");
const config_1 = require("./config");
const CORS = require("cors");
const qs = require("querystring");
const cors = CORS({ origin: true });
///// STRIPE CONNECT /////
// Redirects the user to login with their stripe account
exports.redirect = functions.https.onRequest((req, res) => {
    const base = 'https://connect.stripe.com/oauth/authorize?';
    const queryParams = {
        client_id: config_1.stripeClientId,
        response_type: 'code',
        scope: 'read_write',
    };
    const endpoint = base + qs.stringify(queryParams);
    res.redirect(endpoint);
});
// OAuth Callback used to mint the auth token and create the Firebase user
exports.callback = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const code = req.query.code;
        mintFirebaseToken(code)
            .then(token => res.status(200).send({ token }))
            .catch(err => res.status(400).send(err));
    });
});
/////// Connect Helpers /////
function mintFirebaseToken(code) {
    return __awaiter(this, void 0, void 0, function* () {
        // Make a post request to Stripe's oauth token endpoint
        const options = {
            uri: 'https://connect.stripe.com/oauth/token',
            form: {
                grant_type: 'authorization_code',
                client_id: config_1.stripeClientId,
                code: code,
                client_secret: config_1.stripeSecret
            }
        };
        let stripeCredentials = yield rp.post(options);
        stripeCredentials = JSON.parse(stripeCredentials);
        // Save the Stripe account ID and refresh token
        const accountId = stripeCredentials.stripe_user_id;
        const uid = 'stripe:' + accountId;
        const refreshToken = stripeCredentials.refresh_token;
        // Mint a custom auth token
        const firebaseToken = yield config_1.auth.createCustomToken(uid);
        // Retrieve the account details and update in Firestore
        const account = yield config_1.stripe.accounts.retrieve(accountId);
        const userData = {
            uid,
            accountId,
            refreshToken,
            email: account.email,
            displayName: account.display_name,
        };
        yield config_1.db.doc(`users/${uid}`).set(userData, { merge: true });
        return firebaseToken;
    });
}
exports.mintFirebaseToken = mintFirebaseToken;
//# sourceMappingURL=connect.js.map