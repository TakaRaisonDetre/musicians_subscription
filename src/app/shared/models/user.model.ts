export interface Users {
    
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    stripeCustomerId?: string;
    subscriptions?: {[key: string]: 'active' | 'pastDue' | 'cancelled';},
    id?:string;
    //roles:Roles;
    firstName?:any;
    lastName?:any;
    generation?:any;
    gender?:any;
    city?:any;  
    Pref_State?:any;
    StreetAddress?:any;
    country?:any;
    language?:any; 
    contactMail?:any; 
    path?:any; 
    shortIntro?:any; 
    facebookpage?:any; 
    twitterpage?:any; 
    userimage?:any;  
    username?:any; 
    website?:any;
    telephone?:any;
    contact_email?:any;

     // for Stripe Connect
     accountId?: string;
     refreshToken?: string;
    }

    export interface Roles{
        user?:boolean;
        artist?:boolean;
        admin?:boolean;
        npo?:boolean;
    }
    