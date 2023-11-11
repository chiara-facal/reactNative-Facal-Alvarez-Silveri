import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from 'react-native';
import { auth, db } from '../../firebase/config';
import firebase from 'firebase';

class Post extends Component {
    constructor(props){
        super(props)
        this.state={
            img: '',
            description: '',
            date: '',
            email: '',
            likes: '',
            comments: '',
        }
    }
    
    

    crearPost(){
        db.collection('posts').add({
            owner: auth.currentUser.email,
            description: this.state.description,
            likes: [],
            img: '',
            createdAt: Date.now(),
        })
        .then()
        .catch(err => console.log(e))
    }

    

    render(){
        if (users == datos.currentUser) {
            return (
                <View>
                    <Text>----------------------------------------------------</Text>
                        <Text>Datos del Post</Text>
                        <Text>Email: {this.props.infoPost.datos.owner}</Text>
                        <Text>Texto: {this.props.infoPost.datos.post}</Text>
                        
                    <TouchableOpacity></TouchableOpacity>
                </View>
               )
               
        } else () => {
            return (
                <Text>No estas logueado</Text>
            )
        }
       
    }


}


export default Post;