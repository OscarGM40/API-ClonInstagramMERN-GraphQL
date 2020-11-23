import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
import cors from 'cors'; 

// import typeDefs from './types';
// import resolvers from './resolvers';
import models from './models';

//mezclar todos los  archivos de carpetas de types y resolvers
import path from 'path';
import {fileLoader,mergeTypes,mergeResolvers} from 'merge-graphql-schemas'

const typeDefs = mergeTypes(fileLoader
    (path.join(__dirname,'./types')));

const resolvers = mergeResolvers(fileLoader
     (path.join(__dirname,'./resolvers')));

const SECRET = "my_secret_key"


const app = express();
app.use(cors({
    origin:["http://localhost:3000"]
}))

//middlewares
const server = new ApolloServer({
    typeDefs:typeDefs,
    resolvers:resolvers,
    /*Por medio del objeto Context podemos enviar a Graphql lo que queramos */
    context:{
        models,
        SECRET,
        user:{
            _id:1,
            username:'bob'
        }
    }
});

server.applyMiddleware({app})

mongoose.connect('mongodb://localhost/instagram-clone',{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex:true, 
})
.then(()=> {
    console.log("Conectado a Mongo: " + mongoose.connection.name);
    app.listen(4000,() => {
        console.log("Server on port 4000.Visit localhost:4000/graphql")
    })
})




