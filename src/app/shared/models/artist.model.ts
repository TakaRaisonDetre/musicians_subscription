
export interface Artist {
    id?:any;
    userId?:string;
    roles?:{artist : true};
    short_description_en?:any;
    short_description_jp?:any;
    objective?:any;
    objective_jp?:any;
    bronze_reward?:any;
    silver_reward?:any;
    gold_reward?:any;
    bronze_reward_jp?:any;
    silver_reward_jp?:any;
    gold_reward_jp?:any;
    firstName?:any;
    lastName?:any;
    artistName?:any; 
    labelName?:any; 
    path?:any; 
    twitterpage?:any;
    website?:any;
    facebookpage?:any; 
    isOpen?:Boolean;
    isFunding?:Boolean;
    isMonthlySubscribed?:Boolean;
    artist_patron_amount:number;
    artist_patron_count:number;
    artist_follower_count:number;
    videoquery?:any;
    artist_patron_target_amount?:number;

    }
    

  