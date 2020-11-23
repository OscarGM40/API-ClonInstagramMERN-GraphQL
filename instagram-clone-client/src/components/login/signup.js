import React from 'react';
import {Divider,Button,Icon,Form,Message} from 'semantic-ui-react';
import _find from 'lodash/find';

const Signup = ({ styles,handleClick,handleSubmit,handleChange,args,errors,success }) => {
    
    console.log()

    return (

        <div >
            <div style={styles.box}>
            <img src="images/logo.png" alt="logo"/>
            <h4>Regístrate para ver fotos y videos de tus amigos.</h4>
            <Form  onSubmit={(ev) => handleSubmit(ev, args)}>
        <Button color="facebook" >
            <Icon name="facebook"></Icon>Iniciar sesión con facebook
        </Button>
            <Divider horizontal>O</Divider>
            
            <Form.Field>
                <Form.Input name="email"  onChange={handleChange} placeholder="email" icon={!errors.length?null:_find(errors,{path:'email'})?
                <Icon name="cancel" color="red" size="large" />:
                <Icon name="check circle outline" color="green" size="large"></Icon>
                } />
            </Form.Field>

            <Form.Field>
                <Form.Input name="fullname"  onChange={handleChange} placeholder="Nombre completo" icon={!errors.length?null:_find(errors,{path:'fullname'})?
                <Icon name="cancel" color="red" size="large" />:
                <Icon name="check circle outline" color="green" size="large"></Icon>
                }  />
            </Form.Field>

            <Form.Field>
                <Form.Input name="username"  onChange={handleChange}  placeholder="nombre de usuario" icon={!errors.length?null:_find(errors,{path:'username'})?
                <Icon name="cancel" color="red" size="large" />:
                <Icon name="check circle outline" color="green" size="large"></Icon>
                } />
            </Form.Field>

            <Form.Field>
                <Form.Input name="password"  onChange={handleChange} type="password" placeholder="Password"
                icon={!errors.length?null:_find(errors,{path:'password'})?
                <Icon name="cancel" color="red" size="large" />:
                <Icon name="check circle outline" color="green" size="large"></Icon>
                }  />
            </Form.Field>        

          
            <Button type="submit" 
            primary fluid
            disabled={!args.email || !args.username || !args.fullname || !args.password}
            >Registrar</Button>

        {
            errors.length>=1? <Message negative header="Debe corregir los siguientes errores"
             list={errors.map(error => `[Campo ${error.path}: ${error.message}]`)}/>: null
        }

            </Form>

            </div>
            <div style={styles.box}>
                ¿Tienes una cuenta? <a href="d" 
                onClick={handleClick}>Inicia sesión</a>
            </div>
        </div>
    );
}

export default Signup;