 import gpl from 'graphql-tag';

const queries = {
  query:{

  },
    mutation:{
login:gpl `
      mutation($email:String!,$password:String!){
        login(email:$email,password:$password){
          success
          token
          errors{
            path
            message
          }
        }
      }
`,

        createUser: gpl`
        mutation($username:String!,
             $password: String!,
              $fullname:String!,
               $email:String!) {
            createUser(
              username:$username,
              password:$password,
              fullname:$fullname,
              email:$email){
                success
                errors{
                  path
                  message
                }
              }
            }
            `
          }
    }

    export default queries;