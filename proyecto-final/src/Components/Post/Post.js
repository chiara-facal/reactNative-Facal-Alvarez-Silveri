import React, { Component } from 'react';
import {View, Text} from 'react-native';
import {auth } from '../../firebase/config';

class Post extends Component {
    constructor(props){
        super(props)
        this.state={
            usuarioLogueado: false
        }
    }
    
    componentDidMount(){
        auth.onAuthStateChanged( user => {
            if( user ){
                this.setState({
                    usuarioLogueado: true
                })
            }

        } )

    }

    render(){
        if (this.state.usuarioLogueado) {
            return (
                <View>
                        <Text>{this.props.infoPost.datos.owner}</Text>
                        <Text>{this.props.infoPost.datos.post}</Text>
                </View>
               )
               
        } else {
            return (
                <Text>El usuario debe estar logueado para ver los posteos</Text>
            )
        }
       
    }


}


export default Post;