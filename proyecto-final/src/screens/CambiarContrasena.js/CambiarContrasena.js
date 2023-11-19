import React, {Component} from 'react';
import {updatePassword, reauthenticateWithCredential, EmailAuthProvider} from 'firebase/auth';
import {auth } from '../../firebase/config';
import {View, TextInput, StyleSheet, TouchableOpacity, Text} from 'react-native';
import firebase from 'firebase';

class CambiarContrasena extends Component{
    constructor(){
        super();
        this.state = {
            nuevaContrasena: '',
            contraActual: '',
            error: '',
            mensaje: ''
        }
    }

cambio(nuevaContrasena){
    const credential = firebase.auth.EmailAuthProvider.credential(auth.currentUser.email, this.state.contraActual)

    auth.currentUser.reauthenticateWithCredential(credential)
    .then(() => {
        return auth.currentUser.updatePassword(nuevaContrasena)
    })
    .then(()=>
    {this.setState({nuevaContrasena: '', contraActual: '', mensaje: 'Contraseña actualizada con éxito'});
    })
    .catch((error) => {
        if (error.code == 'auth/wrong-password'){
            this.setState({
                error: 'Contraseña actual incorrecta'
            })
        } else {
            this.setState({
                error: "Error al cambiar la contraseña. Por favor intentalo más tarde."
            })
        }
    
    })
      

}

render(){
    return(
        <View style = {styles.formContainer}>
         <TextInput
        style={styles.input}
        onChangeText={(text)=>this.setState({contraActual: text})}
        placeholder='Ingresa tu contraseña actual'
        keyboardType='default'
        secureTextEntry={true}
        value={this.state.contraActual}/>
        <Text>{this.state.error}</Text>
        <TextInput
        style={styles.input}
        onChangeText={(text)=>this.setState({nuevaContrasena: text})}
        placeholder='Nueva contraseña'
        keyboardType='default'
        secureTextEntry={true}
        value={this.state.nuevaContrasena}/>
        <TouchableOpacity style={styles.button} onPress={()=>this.cambio(this.state.nuevaContrasena)}>
            <Text style={styles.textButton}>Cambiar contraseña</Text>    
        </TouchableOpacity>
        <Text>{this.state.error}</Text>
        <TouchableOpacity style = {styles.button}onPress={() => this.props.navigation.goBack()}>
            <Text style={styles.textButton}>Regresar</Text>
        </TouchableOpacity>
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
    input:{
        height:50,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
        width: 350
    },
    button:{
        backgroundColor:'#0099CC',
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#0099CC',
        margin: 10,
        width: 250,
        alignItems: 'center',
        height: 35

    },
    textButton:{
        color: '#fff'
    }})

export default CambiarContrasena;