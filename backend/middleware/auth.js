

const auth = (req, res, next)=>{

    if(req.isAuthenticated()){
        next();
    }else{
        console.log("Access Denied");
    }
}

const isAdmin = (req, res, next) =>{
    if (req.isAuthenticated() && (req.user.power === 1)) {
        next();
    }else{
        console.log("Access Denied");
        console.log(req.user);
    }
    // return res.redirect(403, "/error");
}

module.exports = {auth, isAdmin}