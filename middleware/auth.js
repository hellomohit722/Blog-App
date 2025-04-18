const { verifyToken } = require("../service/auth");

function checkForAuthenticationCookie(cookieName) {
    return (req,res,next)=>{
        const token = req.cookies[cookieName];
        if(!token)
        {
            return next();
        }
        try{
            const user = verifyToken(token);
            req.user = user;
        }
        catch(err){
            return res.status(401).json({message:"Unauthorized"});
        }
        return next();
    };
}

module.exports = checkForAuthenticationCookie;