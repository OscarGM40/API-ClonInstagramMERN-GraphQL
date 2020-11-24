import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import models from './models';

const auth = {

    getToken: ({_id}) => {
        const newToken = jwt.sign({user:_id},process.env.SECRET,{
                expiresIn:'10s'
        })
        const refreshToken = jwt.sign({user:_id},process.env.SECRET,{
            expiresIn:'10m'
    })
        return [newToken,refreshToken];
    },
    login: async (email,password,User, SECRET) => {
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

    const [newToken,refreshToken] = auth.getToken(user,process.env.SECRET);
   // console.log(token)

        return {
            success:true,
            token:newToken,
            errors:[]
        }
    },
    checkHeaders: async (req,res,next) => {
        const token = req.headers["x-token"];
        
        if(token){
            try {
                //{user} va a ser el id unicamente!
                const {user} = jwt.verify(token,process.env.SECRET)
                req.user = user;
             //  console.log(req.user)
            } catch (error) {
                //INVALID TOKEN-first try to refresh
                const newToken = await auth.checkToken(token);
                //console.log(newToken);
                req.user = newToken.user;
                if(newToken.token){
                    res.set("Access-Control-Expose-Headers","x-token")
                    res.set("x-token",newToken.token)
                }
            }
        }
        //console.log(req.headers)
        next()    
    },
    checkToken: async (token) => {
        let idUser = null;
        try{
            const {user} =  jwt.decode(token);
            idUser = user;
        }catch (error) {
            return {}
        }
        const user = await models.User.findOne({_id:idUser});
        //  console.log(user)
        const [newToken] = auth.getToken(user);
        return {
            user:user._id,
            token:newToken
        }
    },
}


export default auth;