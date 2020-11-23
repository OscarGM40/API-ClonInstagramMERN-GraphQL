import React from 'react';
import { Divider, Form, Button, Icon ,Message} from 'semantic-ui-react';

const Signin = ({ styles, handleClick, handleSubmit,handleChange,args,errors }) => {

/*     const args = {
    }

    const handleChange = (ev, input) => {
       args[input.name] = input.value;
    }
 */
    return (
        <div style={styles.box}>
            <div>
                <img src="images/logo.png" alt="logo" />

                <Form onSubmit={(ev) => handleSubmit(ev, args)}>
                 
                    <Form.Field>
                        <Form.Input name="email" onChange={handleChange} placeholder="email o nombre de usuario" icon={<Icon name="check circle outline" color="green" size="large"></Icon>} />
                   </Form.Field>

                     <Form.Field>
                        <Form.Input name="password" type="password" placeholder="Password" onChange={handleChange}
                            icon={<Icon name="cancel" color="red" size="large" />} />
                      </Form.Field>

                    <Button type="submit" primary fluid>Iniciar sesión</Button>
                    <Divider horizontal>O</Divider>

                    <Button color="facebook" >
                        <Icon name="facebook"></Icon>Iniciar sesión con facebook
                    </Button>
{
    errors.length?<Message negative header="Los siguientes errores: "
    list={errors.map(error=>`[${error.path}] ${error.message}`)}/>:null
}
                </Form>

            </div>
            <div style={styles.box}>
                ¿No tienes una cuenta? <a href="c"
                    onClick={handleClick}
                >Registrate</a>
            </div>
        </div>
    );
}

export default Signin;