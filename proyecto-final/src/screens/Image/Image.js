import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
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
            <View style = {styles.formContainer}>
           <Text style ={styles.text}>¿Desea sacarse una foto de perfil?</Text>
            <TouchableOpacity style = {styles.button} onPress={() =>this.setState({showCamera: true}) }>
            <Text style = {styles.textButton}>Agregar foto</Text>
           </TouchableOpacity>
           <TouchableOpacity style = {styles.button} onPress={() =>this.props.navigation.navigate('Menu') }>
            <Text style = {styles.textButton}>Dirigirme a Home</Text>
           </TouchableOpacity>
            {this.state.showCamera ? <MyCamera onImageUpload={(url) => this.onImageUpload(url)} /> : null}
            </View>
 
        )
    }
}

const styles = StyleSheet.create({
    formContainer:{
        flex: 1,
        paddingHorizontal:10,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        height: 50,
        margin: 20, 
        marginTop: 70,
        textAlign: 'center'
    },
    button:{
        backgroundColor:'#0099CC',
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#0099CC',
        margin: 30,
        width: 250,
        alignItems: 'center',
        height: 35

    },
    textButton:{
        color: 'black'
    }
})


export default Image;