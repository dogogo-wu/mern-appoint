

const auth = (req, res, next)=>{

    if(req.isAuthenticated()){
        next();
    }else{
        console.log("Access Denied");
    }
}

module.exports = auth