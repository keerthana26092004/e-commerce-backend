// const jwt = require("jsonwebtoken");

// const auth =(req, res ,next)=>{
//     // const token = req.header("Authorization").replace("Bearer" , " ");
//    //                                  or
// //    "bearer hdbuegdueyfgk"
// //    ["bearer "  " djegfin"]
// const authHeader = req.header("Authorization");
// if(!authHeader){
//     return res.status(401).json({error: "Authorization is missing"});
// }
//     const token = authHeader.split(" ")[1];
//     if(!token) {
        
//      return res.status(401).json({error: "token required"});
//     }
//     try{
//         const decoded = jwt.verify(token , "secret_key");
//         req.user = decoded;
//         next();
//     }
//     catch(err){
//         console.log(err);
//         res.status(401).json({error: "invalid token"});
//     }

// };
// module.exports=auth;
const jwt=require("jsonwebtoken");
const auth=(req,res,next)=>{
    // const token=req.header("Authorization".replace("Bearer"," "));
    const token = req.header("Authorization").split(" ")[1];//string ku space provide panum
    if(!token)return res.status(401).json({error:"Token required"});

    try{
        const decoded=jwt.verify(token,"secret_key");
        req.user={id:decoded.userId};
        next();
    }
    catch(err){
        res.status(401).json({error:"Invalid Token"});//expire
    }
};
module.exports=auth;