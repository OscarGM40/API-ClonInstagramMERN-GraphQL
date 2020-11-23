export default{
    Query:{
        getPost:(parent,args,{models},info) =>  models.Post.findOne(args)
    },
    Mutation:{
        createPost: (parent,args,{models,user},info) => {
            return models.Post.create({...args.post,by:user})
        }
    }
}