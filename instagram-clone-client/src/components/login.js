import React from 'react';
import { Grid,Image } from 'semantic-ui-react';
import {graphql} from 'react-apollo';
import * as compose from 'lodash.flowright';
// import gpl from 'graphql-tag';

//Utils
import queries from '../utils/queries';


//Componentes
import Signin from './login/signin';
import Signup from './login/signup';
//import LostPassword from './login/lostpassword';
                            

const styles = {
    grid: {
        height: '100%',
        width: '900px',
        margin: '0 auto',
    },
    box:{
        backgroundColor:'white',
        border: '1px solid #e6e6e6',
        textAlign:'center',
        marginBottom:'1em',
        padding:'1em',
    }
}


class Login extends React.Component {
     
state = {
    showLogin:true,
    showRegister:false,
    showLostPassword:false,
    argsSignup:{},
    errorSignup:[],
    success:true,
    argsSignin:{},
    errorSignin:[],
}

showRegister = (ev) => {
    ev.preventDefault();
    this.setState({
        showLogin:false,
        showRegister:true,
        showLostPassword:false,
    })
}

showLogin = (ev) => {
    ev.preventDefault();
    this.setState({
        showLogin:true,
        showRegister:false,
        showLostPassword:false,
     
    })
}

handleLogin = async (ev,args) => {
    console.log(args);
    const response = await this.props.login({
        variables:args
    });
    console.log('Graphql Login response: ' , response);

    const {errors, success, token} = response.data.login;

    if(!success){
        this.setState({errorSignin:errors})
    }else{
        localStorage.setItem('token',token);
        this.props.history.push("/")
    }

}

handleRegister = async (ev,args) => {
    console.log(args);
    const response = await this.props.createUser({
        variables:args
    });  

console.log('Graphql CreateUser response: ' , response);
const {errors ,success} = response.data.createUser;

if(!success){
    this.setState({
        errorSignup: errors,
        success:false
    })
}else {
  this.props.history.push("/");
}
   
}

 handleChange = (ev, input,) => {
   // console.log(args.email);
   const argsSignup = this.state.argsSignup;
    argsSignup[input.name] = input.value;
    this.setState({
            argsSignup
    })

}

handleChangeSignin = (ev, input) => {
const argsSignin = this.state.argsSignin;
argsSignin[input.name] = input.value;
this.setState({
    argsSignin})
}

    render() {
        //fijate que son tres booleanos
const {showLogin, showRegister,argsSignup,errorSignup,success,argsSignin,errorSignin} = this.state;

        return (
            <Grid columns={2} centered
                verticalAlign="middle" style={styles.grid}>
                <Grid.Row>
                    <Grid.Column>
                        <Image src="images/phone.png" fluid alt="movil" />
                    </Grid.Column>
                    <Grid.Column>
                        {showLogin && <Signin styles={styles} handleClick={this.showRegister}  handleSubmit={this.handleLogin}handleChange={this.handleChangeSignin} args={argsSignin}
                        errors={errorSignin} sucess={success}/> }

                        {showRegister && <Signup styles={styles} handleClick={this.showLogin} handleSubmit={this.handleRegister}
                        handleChange={this.handleChange} args={argsSignup}
                        errors={errorSignup} sucess={success}/>}

                        {/* {showLostPassword && <LostPassword styles={styles} />} */}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}
/* 
const mutation = gpl `
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
` */

/* export default compose(
    graphql(mutation,{name:'login'}),
    graphql(mutation,{name:'createUser'})

)(Login) */
//export default graphql(mutation)(Login);


export default compose(
    graphql(queries.mutation.login,{name:'login'}),
    graphql(queries.mutation.createUser,{name:'createUser'}),
)(Login)

//  export default graphql(queries.mutation.createUser)(Login);
//  export default graphql(queries.mutation.login)(Login);
