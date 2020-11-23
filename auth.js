import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const auth = {

    getToken: ({_id},SECRET) => {
        const token = jwt.sign({user:_id},SECRET,{
                expiresIn:'5d'
        })
        const refreshToken = jwt.sign({user:_id},SECRET,{
            expiresIn:'10m'
    })
        return [token,refreshToken];
    },
    login: async (email,password,User,SECRET) => {
       // console.log("hola mundo",email,password,User,SECRET);
       const user = await User.findOne({email})   

       if(!user){
           return {
               success:false,
               errors:[{path:'email',message:'Email no existe'}]
           }
       }
       const validPassword = await bcrypt.compare(password,user.password);
    //    console.log('haspassword', validPassword)
    if(!validPassword){
        return {
            success:false,
            errors:[{path:'password',message:"Contraseña incorrecta"}]
        }
    }

    const [token,refreshToken] = auth.getToken(user,SECRET);
   // console.log(token)

        return {
            success:true,
            token,
            errors:[]
        }
    }
}


export default auth;