require('./app/config');
import * as auth from './app/auth';
import * as webhooks from './app/webhooks';
import * as connect from './app/connect';
import * as Aggregate from './app/aggregate';
import * as Mailing from './app/mailsend';
import { api } from './app/api';

// Main Authenticated User API
export const app = api;

// Auth Functions
export const createStripeCustomer    = auth.createStripeCustomer;

// Webhook Functions
export const recurringPaymentWebhook = webhooks.recurringPaymentWebhook;

// Connect Functions
export const stripeRedirect = connect.redirect;
export const oauthCallback  = connect.callback;



// Aggregation 
// comments
export const AggregateProjectComents = Aggregate.AggregateComments;
// aggregate project followers
export const AggregateProjectFollowers = Aggregate.AggregateProjectFollowers;
// aggregate project donors 
export const AggregateProjectDonors = Aggregate.AggregateProjectDonors
// aggregate artist follows 
export const AggregateArtistFollowers = Aggregate.AggregateArtistFollowers;
// aggregate artist donors 
export const AggregateArtistDonors = Aggregate.AggregateArtistDonors;


// Get Donation Total for artists
export const GetDonationArtist = Aggregate.GetDonationArtist;

// get Monthluy Donation Total for artist --- we do not used we use front code 
//export const GetMonthlyDonationArtist = Aggregate.GetMonthlyDonationArtist;

// get donation total for project
export const GetDonationProject = Aggregate.GetDonationProject;

// aggregate donation for project
export const TotalProjectDonation = Aggregate.AggregateProjectDonationForUser;
// aggregate donation for artist 
export const TotalArtistDonation = Aggregate.AggregateArtistDonationForUser;


// mail related cloud function
export const ProjectFollowerMail = Mailing.followProjectEmail;
// mail related cloud function
export const ArtistFollowerMail = Mailing.followArtistEmail;

/////////////////////////////////////////
/// User Statistics Overview /////////////////////
///////////////////////////////////////////
/// count of managed artists 
export const AggregateUserManagedArtists = Aggregate.AggregateUserManagingArtist;
//// count of managed projects
export const AggregateUserManagedProjects = Aggregate.AggregateUserManagingProject;
//// count of patronized artists
export const AggregateUserPatronizedArtists = Aggregate.AggregateUserPatronizingArtist;
/// cost of patronized projecgt
export const AggregateUserPatronizedProjects = Aggregate.AggregateUserPatronizingProject;