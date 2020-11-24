import bcrypt from 'bcrypt';
import auth from './../auth';
import {isAuthenticatedResolver} from './../permissions'

const formatErrors = (error,otherErrors) => {
    const errors = error.errors;
   // console.log(errors)
    let objErrors = [];

    if(errors){
        Object.entries(errors).map((error) => {
           const { path, message } = error[1];
            objErrors.push({path,message});
        })
        // console.log(objErrors);
        objErrors = objErrors.concat(otherErrors);
        return objErrors;

    }else if (otherErrors.length){
        return otherErrors;
    }



    const unkownError = {};
    switch(error.code){
        case 11000:
            unkownError.path = "username"
            unkownError.message ="El nombre de usuario ya existe"
            break;
        default:
            unkownError.path="Desconocido"
            unkownError.message= error.message
    }
    return [unkownError]
}

export default{
    Query:{
        allUsers: isAuthenticatedResolver.createResolver(
            (parent,args,{models},info) =>  models.User.find(),
            ),    


        getUser:(parent,args,{models},info) =>  models.User.findOne(args)
    },
    Mutation:{
        login:  (parent,{email,password},{models:{User},SECRET}) =>  
             auth.login(email,password, User, SECRET)
        ,
        createUser: async (parent,{password,...args},{models,SECRET}) => {
            //return models.User.create(args)
            const otherErrors = [];

            try {

                if(password.length<8){
                    otherErrors.push({path:'password',message:'Password debe ser mayor a 8 caracteres'})
                }
                const hashPassword = await bcrypt.hash(password,10);
                const user = await models.User.create({...args,
                password : hashPassword});
     
if(otherErrors.length) {
    throw otherErrors;
}

                return {
                    success:true,
                    errors:[]
                };
                
            } catch (error) {
               // console.log(error)

                    return {
                    success:false,
                    errors: formatErrors(error,otherErrors),
                };
            }
        }
    }
}