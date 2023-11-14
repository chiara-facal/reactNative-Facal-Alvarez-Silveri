import React, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, ActivityIndicator} from 'react-native';

class Register extends Component {
    constructor(){
        super()
        this.state={
            email:'',
            userName:'',
            password:'',
            miniBio:'',
            errorMessage: '',
            cargando: true, 
            foto_de_perfil: '',
            userId: ''
        }
    }
    componentDidMount(){
        auth.onAuthStateChanged( user => {
            if( user ){
                this.props.navigation.navigate('Image', {userID: this.state.userId})
            }else {
                this.setState({cargando: false})
            }

        } )

    }

    register (email, pass, userName, miniBio, foto_de_perfil){
        this.setState({
            errorMessage: ''
        })
        if(this.state.email == '' || this.state.email.includes("@") == false){
            return this.setState({errorMessage: "Es obligatorio ingresar un mail"})
        }else if (this.state.userName == '') {
            return this.setState({errorMessage:'Es obligatorio el nombre de usuario'})
        }else if (this.state.password == '' || this.state.password.length <6){
            return this.setState({errorMessage: "Es obligatoria la contraseña"})
        }
       
        auth.createUserWithEmailAndPassword(email, pass)
            .then( response => {
                console.log('Registrado ok', response);

                db.collection('users').add({
                    owner: auth.currentUser.email,
                    userName: userName,
                    miniBio: miniBio,
                    photo: foto_de_perfil,
                    createdAt: Date.now()
                     
                })
                .then()

                this.setState({ userId: response.user.uid });

            })
            .catch((error) => {
                // console.log(error);
                this.setState({
                    errorMessage: ''
                })
                if (error.code === 'auth/email-already-in-use') {
                    return this.setState({errorMessage: 'El email introducido ya esta en uso'})
                } else if (error.code === 'auth/invalid-email') {
                    return this.setState({ errorMessage: 'El correo electrónico no es válido' })
                } else {
                  return this.setState({ errorMessage: 'Hubo un error en el registro. Inténtalo de nuevo.' })
                } 
        })}


        
    render(){
        if(this.state.cargando){
            return(
                <View>
                <ActivityIndicator size='large' color='pink'/>
                <Text>Cargando...</Text>
                </View>

            )
        }else{
        return(
            <View style={styles.formContainer}>
                <Text>Registrarse</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder='Email'
                    keyboardType='email-address'
                    value={this.state.email}
                    />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({userName: text})}
                    placeholder='Nombre de usuario'
                    keyboardType='default'
                    value={this.state.userName}
                    />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='Contraseña'
                    keyboardType='default'
                    secureTextEntry={true}
                    value={this.state.password}
                />
                {/* <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({userName: text})}
                    placeholder='Foto de perfil'
                    keyboardType='default'
                    value={this.state.photo}
                    /> */}
        
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({miniBio: text})}
                    placeholder='Mini Bio (Opcional)'
                    keyboardType='default'
                    value={this.state.miniBio}
                    />
                    {this.state.errorMessage !== '' ?
                    <Text>{this.state.errorMessage}</Text>
                    : false
                }
                <TouchableOpacity style={styles.button} onPress={()=>this.register(this.state.email, this.state.password, this.state.userName, this.state.miniBio, this.state.foto_de_perfil)}>
                    <Text style={styles.textButton}>Registrarse</Text>    
                </TouchableOpacity>
                <TouchableOpacity style = {styles.button} onPress={ () => this.props.navigation.navigate('Login')}>
                   <Text style = {styles.textButton}>Ya tengo una cuenta</Text>
                </TouchableOpacity>
            </View>
        )
    }}
}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input:{
        height:20,
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
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745',
        margin: 3,
        width: 250,

    },
    textButton:{
        color: '#fff'
    }

})


export default Register;
