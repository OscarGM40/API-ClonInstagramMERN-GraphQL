/*Vamos a crear las cosas necesarias para poder hacer una consulta en GraphQL con Apollo */
import React from 'react';
import  {graphql} from 'react-apollo';
import gpl from 'graphql-tag';
import {Toolbar} from './../components/toolbar';
 
const query = gpl`
{
    allUsers {
        username
    }
}
`
const userItem = (user,i) => (<li key={i}>{user.username}</li>)

export default graphql(query)(
    ({data:{allUsers=[],loading}}) => 
        // if(loading) return null;
        [<Toolbar />, 
            <ul>
                {
                    allUsers.map(userItem)
                }

            </ul>
            ])