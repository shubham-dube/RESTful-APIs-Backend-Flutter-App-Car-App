const {UserService,MerchantService} = require("../services/user.services");

exports.register = async(req,res,next)=>{
    try{
        const {name,email,mobile,password} = req.body;
        const successRes = await UserService.registerUser(name,email,mobile,password);
        console.log(successRes);
        res.json({status:true,success: "User Reg Successfully"});
    } catch(err){
        throw(err);
    }
}

exports.login = async(req,res,next)=>{
    try{
        const {mobile,password} = req.body;
        const user = await UserService.checkUser(mobile);
        if(!user){
            throw new Error("User not Exist");
        }

        const isMatch = await  user.comparePassword(password);
        if(isMatch === false){
            throw new Error("Password is Incorrect");
        }

        let tokenData  = {_id:user._id,mobile:user.mobile};
        // create a jwt token
        var token = await UserService.createToken(tokenData,"123", "1h")
        console.log(token);
        res.json({status:true,token:token,message:"Login Successfull"})

    } catch(err){
        throw(err);
    }
}

exports.getUserData = async (req,res) => {
    try {
        const mobile = req.body.mobile;
        const userData = await UserService.getUserData(mobile);
        res.json(userData[0]);
    } 
    catch (error){
        throw(error)
    }
}

exports.addProduct = async(req,res)=>{
    try{
        const successRes = await MerchantService.addProduct(req.body);
        console.log(successRes);
        res.json({status:true,success: "Product Added Successfully"});
    } catch(err){
        throw(err);
    }
}

exports.getProducts = async(req,res)=>{
    try{
        const products = await MerchantService.getProducts(req.body);
        res.json(products);

    } catch(err){
        throw(err);
    }
}

exports.addService = async(req,res)=>{
    try{
        const successRes = await MerchantService.addService(req.body);
        console.log(successRes);
        res.json({status:true,success: "Service Added Successfully"});

    } catch(err){
        throw(err);
    }
}

exports.getServices = async(req,res)=>{
    try{
        const Services = await MerchantService.getServices(req.body);
        res.json(Services);

    } catch(err){
        throw(err);
    }
}

exports.getCategories = async(req,res)=>{
    try{
        const Categories = await MerchantService.getCategories();
        res.json(Categories);
    } catch(err){
        throw(err);
    }
}

exports.addBrand = async(req,res)=>{
    try{
        const {name} = req.body;
        const successRes = await MerchantService.addBrand(name);
        console.log(successRes);
        res.json({status:true,success: "Brand Added Successfully"});
    } catch(err){
        throw(err);
    }
}

exports.getBrands = async(req,res)=>{
    try{
        const Brands = await MerchantService.getBrands();
        res.json(Brands);
    } catch(err){
        throw(err);
    }
}

exports.placeOrder = async(req,res)=>{
    try{
        const successRes = await UserService.placeOrder(req.body);
        console.log(successRes);
        res.json({status:true,success: "Order Successfully"});
    } catch(err){
        throw(err);
    }
}

exports.getOrders = async(req,res)=>{
    try{
        const Orders = await UserService.getOrders(req.body);
        res.json(Orders);
    } catch(err){
        throw(err);
    }
}

exports.cancelOrder = async(req,res)=>{
    try{
        var response = await UserService.cancelOrder(req.body);
        console.log(response);
        res.json(response);
    } catch(err){
        throw(err);
    }
}

exports.acceptOrder = async(req,res)=>{
    try{
        var response = await MerchantService.acceptOrder(req.body);
        console.log(response);
        res.json(response);
    } catch(err){
        throw(err);
    }
}