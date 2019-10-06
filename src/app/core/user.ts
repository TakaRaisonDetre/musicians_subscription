export interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    
    currentUsage?: number;
    stripeCustomerId?: string;
    subscriptionId?:string;
    status?:string;
  //  itemId?:string;

  
  }