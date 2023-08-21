// import jwt
var jwt=require('jsonwebtoken');
const JWT_SECRET='harryisagoodboy';



// fetchuser is a middleware function which takes reqst,responseand next as i/p where next is called at the end to call the next middleware and in this case it calls the async fn in route 3 in auth.js
const fetchuser=(req,res,next)=>{
        // Get user from the jwt token and add id to req object
            // fetch token using header which is named auth-token
            const token=req.header('auth-token');
            // If token is not present, deny access
            if(!token){
                res.status(401).send({error:"Please authenticate using a valid token"})
            }

            // verify the token
            try {
                const data=jwt.verify(token,JWT_SECRET)
            req.user=data.user;
            next();
            } catch (error) {
                res.status(401).send({error:"Please authenticate using a valid token"})

            }
            
}

module.exports=fetchuser;
