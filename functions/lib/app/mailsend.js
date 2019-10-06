"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const SENDGRID_API_KEY = functions.config().sendgrid.key;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);
// follower of project 
exports.followProjectEmail = functions.firestore
    .document('users/{userId}/following_projects/{followid}')
    .onCreate((change, context) => {
    const userId = context.params.userId;
    return config_1.db.collection('users').doc(userId)
        .get()
        .then(doc => {
        const user = doc.data();
        const msg = {
            to: user.email,
            from: 'no-reploy@raisondetre.tokyo',
            subject: 'プロジェクトフォロワー通知：レゾンデートル',
            // text: `Hey ${toName}. You have a new follower!!! `,
            // html: `<strong>Hey ${toName}. You have a new follower!!!</strong>`,
            // custom templates
            templateId: 'd-061aa4b8c08d48c3bb01f9f18cd10d04',
            substitutionWrappers: ['{{', '}}'],
            substitutions: {
                name: user.displayName
                // and other custom properties here
            }
        };
        return sgMail.send(msg);
    })
        .then(() => console.log('email successfully sent'))
        .catch(err => console.log(err));
});
// follower of artist
exports.followArtistEmail = functions.firestore
    .document('users/{userId}/following_artists/{followedId}')
    .onCreate((change, context) => {
    const userId = context.params.userId;
    return config_1.db.collection('users').doc(userId)
        .get()
        .then(doc => {
        const user = doc.data();
        const msg = {
            to: user.email,
            from: 'no-reploy@raisondetre.tokyo',
            subject: 'アーティストフォロワー通知：レゾンデートル',
            // text: `Hey ${toName}. You have a new follower!!! `,
            // html: `<strong>Hey ${toName}. You have a new follower!!!</strong>`,
            // custom templates
            templateId: 'd-1d03fceb9007486b9f1b39ff9ce1509b',
            substitutionWrappers: ['{{', '}}'],
            substitutions: {
                name: user.displayName
                // and other custom properties here
            }
        };
        return sgMail.send(msg);
    })
        .then(() => console.log('email successfully sent'))
        .catch(err => console.log(err));
});
//# sourceMappingURL=mailsend.js.map