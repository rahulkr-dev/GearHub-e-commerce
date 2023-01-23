const {Schema,model} = require('mongoose')

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    cart:{
        type:Schema.Types.ObjectId,
        ref:"cart"
    },
    role:{
        type:String,
        default:"customer",
        enum:['admin','customer']
    }
},{
    timestamps:true
})

const User = model('user',userSchema);

module.exports = User;