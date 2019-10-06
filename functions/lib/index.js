"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('./app/config');
const auth = require("./app/auth");
const webhooks = require("./app/webhooks");
const connect = require("./app/connect");
const Aggregate = require("./app/aggregate");
const Mailing = require("./app/mailsend");
const api_1 = require("./app/api");
// Main Authenticated User API
exports.app = api_1.api;
// Auth Functions
exports.createStripeCustomer = auth.createStripeCustomer;
// Webhook Functions
exports.recurringPaymentWebhook = webhooks.recurringPaymentWebhook;
// Connect Functions
exports.stripeRedirect = connect.redirect;
exports.oauthCallback = connect.callback;
// Aggregation 
// comments
exports.AggregateProjectComents = Aggregate.AggregateComments;
// aggregate project followers
exports.AggregateProjectFollowers = Aggregate.AggregateProjectFollowers;
// aggregate project donors 
exports.AggregateProjectDonors = Aggregate.AggregateProjectDonors;
// aggregate artist follows 
exports.AggregateArtistFollowers = Aggregate.AggregateArtistFollowers;
// aggregate artist donors 
exports.AggregateArtistDonors = Aggregate.AggregateArtistDonors;
// Get Donation Total for artists
exports.GetDonationArtist = Aggregate.GetDonationArtist;
// get Monthluy Donation Total for artist --- we do not used we use front code 
//export const GetMonthlyDonationArtist = Aggregate.GetMonthlyDonationArtist;
// get donation total for project
exports.GetDonationProject = Aggregate.GetDonationProject;
// aggregate donation for project
exports.TotalProjectDonation = Aggregate.AggregateProjectDonationForUser;
// aggregate donation for artist 
exports.TotalArtistDonation = Aggregate.AggregateArtistDonationForUser;
// mail related cloud function
exports.ProjectFollowerMail = Mailing.followProjectEmail;
// mail related cloud function
exports.ArtistFollowerMail = Mailing.followArtistEmail;
/////////////////////////////////////////
/// User Statistics Overview /////////////////////
///////////////////////////////////////////
/// count of managed artists 
exports.AggregateUserManagedArtists = Aggregate.AggregateUserManagingArtist;
//// count of managed projects
exports.AggregateUserManagedProjects = Aggregate.AggregateUserManagingProject;
//// count of patronized artists
exports.AggregateUserPatronizedArtists = Aggregate.AggregateUserPatronizingArtist;
/// cost of patronized projecgt
exports.AggregateUserPatronizedProjects = Aggregate.AggregateUserPatronizingProject;
//# sourceMappingURL=index.js.map