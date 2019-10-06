// project and events 
export interface Project {
 id?:any;
 userId?:any;
 roles?:{Project_Owner : true};
 project_name?:any;
 type?:any;
 project_owner?:any;
 short_description_en?:any;
 long_description_en?:any;
 objective_en?:any;
 reward_gold_en?:any;
 reward_silver_en?:any;
 reward_bronze_en?:any;
 reward_black_en?:any;
 short_description_jp?:any;
 long_description_jp?:any;
 objective_jp?:any;
 reward_gold_jp?:any;
 reward_silver_jp?:any;
 reward_bronze_jp?:any;
 reward_black_jp?:any;
 createdAt?:string;
 path?:string;
 target_amount?:number;
 isOpen?:Boolean,
 status?:Boolean,
 date?:any,
 venue?:any,
 start_at?:any,
 ticketprice?:any,
 ticketamount?:any
 
}