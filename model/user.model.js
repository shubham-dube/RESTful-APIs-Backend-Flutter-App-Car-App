const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const db = require("../config/db");
//Define a schema for the user model.

const { Schema } = mongoose;

const categoriesSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

const brandSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    grade: {
        type: String,
    }
});

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type:String,
        required: true
    },
    mobile: { 
        type: Number,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    }
});

const productSchema = new Schema({
    merchantId: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    skuId: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required:true,
    },
    brand: {
        type: String,
        required: true
    },
    mrp: {
        type: String,
        required: true
    },
    sellingPrice: {
        type: String,
        required: true
    },
    stock: {
        type: String,
        required: true
    },
    length: {
        type: String
    },
    breadth: {
        type: String
    },
    height: {
        type: String
    },
    weight: {
        type: String
    },
    color: {
        type: String,
    },
    hsn: {
        type: String,
        required:true,
    },
    manufacturer: {
        type: String
    },
    packer: {
        type: String
    },
    importer: {
        type: String
    },
    status: {
        type: String,
        required:true,
    },
    countryOfOrigin: {
        type: String,
        required:true,
    },
    model: {
        type: String,
        required:true,
    },
    warranty: {
        type: String
    },
    compatibility: {
        type: String
    },
});

const serviceSchema = new Schema({
    merchantId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    skuId: {
      type: String,
      required: true,
    },
    mrp: {
      type: Number,
      required: true,
    },
    sellingPrice: {
      type: String, 
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    confirmTime: {
      type: String,
      required: true,
    },
    pickupCharges: {
      type: String, 
    },
    pickupFlag: {
        type: String,
      required: true,
    },
    freePickup: {
        type: String,
      required: true,
    },
    hsn: {
      type: String,
      required: true,
    },
    inclusions: {
      type: String,
    },
    additionalInclusions: {
      type: String,
    },
    kilometerWarranty: {
      type: String,
    },
    timeWarranty: {
      type: String, 
    },
    compatibility: {
      type: String,
    },
  });
  
  const ordersSchema = new Schema ({
    paymentType: {
        type: String,
        required: true,
        default: 'Cash at Delivery'
    },
        customerId: {
            type: String,
            required: true
        },
      productDetails: [{
        merchantId: {
            type: String,
          required: true
        },
        productId: {
          type: String,
          required: true
        },
        title: {
          type: String,
          required: true
        },
        quantity: {
          type: Number,
          required: true
        },
        price: {
          type: Number,
          required: true
        }
      }],

      serviceDetails: [{
        merchantId: {
            type: String,
          required: true
        },
        serviceId: {
          type: String,
          required: true
        },
        title: {
          type: String,
          required: true
        },
        price: {
          type: Number,
          required: true
        }
      }],

      orderAmount: {
        type: Number,
        required: true
      },
      deliveryAddress: {
        type: String,
        required: true
      },

      status: {
        type: String,
        default: 'pending'
      }
    
  });

userSchema.pre('save', async function () {
    try {
        var user = this;
        const salt = await(bcrypt.genSalt(10));
        const hashpass = await bcrypt.hash(user.password,salt);

        user.password = hashpass;

    } catch (error) {
        throw(error)
    }
});

userSchema.methods.comparePassword = async function (userPassword) {
    try {
        const isMatch = await bcrypt.compare(userPassword,this.password)
        return isMatch;
    } catch (error) {
        throw(error)
    }
};

// const UserModel = db.model("Users", userSchema);
// module.exports.UserModel = UserModel

module.exports = {
    UserModel: db.model("Users", userSchema),
    ProductModel: db.model("Products", productSchema),
    ServiceModel: db.model("Services", serviceSchema),
    CategoriesModel: db.model("Categories", categoriesSchema),
    BrandModel: db.model("Brands", brandSchema),
    OrderModel: db.model("Orders", ordersSchema)
};