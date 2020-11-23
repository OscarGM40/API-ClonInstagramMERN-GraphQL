import mongoose from 'mongoose';
import  validate from 'mongoose-validator';

const userSchema = mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:[true,"El campo usuario es requerido"],
validate:[validate({
    validator:'isLength',
    arguments:[4,15],
    message:'El nombre de usuario debe contener entre {ARGS[0]} y {ARGS[1]}',
    
}),
validate({
    validator:'isAlphanumeric',
    message:'El nombre de usuario debe ser Alfanumérico',
    
})]
        
    },
    password:String,
    fullname:String,
    desc:String,
    bio:String,
    email:{
        type:String,
        validate:validate({
            validator:'isEmail',
            message:'Introduce un email válido',
            
        })
    },
    thumbnail:String,
    posts:{
        type:[],
        default:[]
    },
    following:{
        type:[],
        default:[]
    },
    followers:{
        type:[],
        default:[]
    }
})

const userModel = mongoose.model('User',userSchema);

export default userModel;