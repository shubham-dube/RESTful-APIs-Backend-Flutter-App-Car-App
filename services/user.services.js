const {UserModel, ProductModel, ServiceModel, CategoriesModel, BrandModel, OrderModel}  = require('../model/user.model');
const jwt = require('jsonwebtoken');

class UserService{
    static async registerUser(name,email,mobile,password){
        try{
            const createUser = new UserModel({name,email,mobile,password});
            await createUser.save();
            return {status:true,message:"Saved in Database"};

        }catch(err){
            throw err;
        }
    }

    static async checkUser(mobile){
        try{
            return await UserModel.findOne({mobile});
        }catch(err){
            throw err;
        }
    }

    static async createToken(tokenData, secretKey,jwtExpiry){
        return jwt.sign(tokenData,secretKey ,{ expiresIn : jwtExpiry });
    }

    static async getUserData(mobile){
        const User =  await UserModel.find({mobile}).select(['name', 'email','mobile','password']);
        console.log(User);
        return User;
    }

    static async placeOrder(oderDetailsObject){
        try{
            const createOrder = new OrderModel(oderDetailsObject);
            await createOrder.save();
            return {status:true,message:"Order Received in Database"};

        }catch(err){
            throw err;
        }
    }

    static async getOrders(getOrdersObject){
        const Orders =  await OrderModel.find(getOrdersObject);
        console.log(Orders);
        return Orders;
    }

    static async cancelOrder(updateDetail){
        var response = await OrderModel.updateOne({ _id: updateDetail.orderId },
                                    { $set: { status: 'Cancelled' } },);
        return response;
    }

}

class MerchantService {
    static async addProduct(productObject) {
        try{
            const createProduct = new ProductModel(productObject);
            await createProduct.save();
            return {status:true,message:"Product Saved in Database"};

        }catch(err){
            throw err;
        }
    }

    static async getProducts(productObject){
        const Products =  await ProductModel.find(productObject);
        console.log("Products Length : " + Products.length);
        return Products;
    }

    static async addService(serviceObject) {
        try{
            const createService = new ServiceModel(serviceObject);
            await createService.save();
            return {status:true,message:"Service Saved in Database"};

        }catch(err){
            throw err;
        }
    }

    static async getServices(serviceObject){
        const Services =  await ServiceModel.find(serviceObject);
        console.log("Services Length : " + Services.length);
        return Services;
    }

    static async getCategories(type){
        const Categories =  await CategoriesModel.find();
        console.log(Categories);
        return Categories;
    }
    static async getBrands(type){
        const Brands =  await BrandModel.find();
        console.log(Brands);
        return Brands;
    }

    static async addBrand(name) {
        try{
            const createBrand = new BrandModel({name});
            await createBrand.save();
            return {status:true,message:"Brand Saved in Database"};
        }catch(err){
            throw err;
        }
    }

    static async acceptOrder(updateDetail){
        var response = await OrderModel.updateOne({ _id: updateDetail.orderId },
                                    { $set: { status: 'Accepted' } },);
        return response;
    }
}

module.exports = {
    UserService,
    MerchantService
};