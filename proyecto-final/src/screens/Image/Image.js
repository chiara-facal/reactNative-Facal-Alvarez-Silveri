import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import MyCamera from '../../Components/MyCamera/Mycamera';
// import firebase from 'firebase';
import { auth, db } from '../../firebase/config';

class Image extends Component{
    constructor(){
        super()
        this.state = {
            showCamera: false, 
            url: ''
        }
    }
    onImageUpload(url){
        console.log(this.props.route.params.userId)
        if(url){
            this.setState({ url: url , showCamera: false});
            db.collection('users').doc(this.props.route.params.userId).update({
                photo: url
            })
            .then(()=> {console.log("Foto agregada a firestore")})
            .catch((error)=>{console.log(error)})
            this.props.navigation.navigate('Menu')
        }

    }

    render(){
        return(
            <View>
           <Text>¿Desea sacarse una foto de perfil?</Text>
            <TouchableOpacity onPress={() =>this.setState({showCamera: true}) }>
            <Text>Agregar foto</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={() =>this.props.navigation.navigate('Menu') }>
            <Text>Dirigirme a Home</Text>
           </TouchableOpacity>
            {this.state.showCamera ? <MyCamera onImageUpload={(url) => this.onImageUpload(url)} /> : null}
            </View>
 
        )
    }
}

export default Image;