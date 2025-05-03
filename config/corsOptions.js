const whitelist=require('./whitelist');
const corsOptions={
    origin: (origin, callback)=>{ 
        if(whitelist.includes(origin) || !origin){  //or no origin
            callback(null, true) 
        } else{
            callback(new Error('Not allowed by CORS'))
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}

module.exports=corsOptions;