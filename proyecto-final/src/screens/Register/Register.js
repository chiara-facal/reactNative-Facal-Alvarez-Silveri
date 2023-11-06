import react, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import { Camera } from 'expo-camera'
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';

class Register extends Component {
    constructor(){
        super()
        this.state={
            email:'',
            userName:'',
            password:'',
            miniBio:'',
            emailError: '',
            passwordError: '', 
            generalError: '',
            usernameError:'',
        }
    }
    componentDidMount(){

        auth.onAuthStateChanged( user => {
            if( user ){
                this.props.navigation.navigate('Login')
            }

        } )

    }

    register (email, pass, userName){
        if (userName == '') {
            this.setState({usernameError:'Es obligatorio el nombre de usuario'})
        }
        auth.createUserWithEmailAndPassword(email, pass)
            .then( response => {
                console.log('Registrado ok', response);

                db.collection('users').add({
                    owner: auth.currentUser.email,
                    userName: userName,
                    createdAt: Date.now(), 
                })
                .then( res => console.log(res))


            })
            .catch((error) => {
                console.log(error);
                if (error.code === 'auth/invalid-email') {
                  this.setState({ emailError: 'El correo electrónico no es válido' });
                } else if (error.code === 'auth/weak-password')
                 {this.setState({ passwordError: 'La contraseña debe tener al menos 6 caracteres' });
                }  else if (error.code === 'auth/email-already-in-use') {
                    this.setState({emailError: 'El email introducido ya esta en uso'})
                } else {
                  this.setState({ generalError: 'Hubo un error en el registro. Inténtalo de nuevo.' });
                }
              });
    }



    render(){
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
                <Text>{this.state.emailError}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({userName: text})}
                    placeholder='Nombre de usuario'
                    keyboardType='default'
                    value={this.state.userName}
                    />
                 <Text>{this.state.usernameError}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='Contraseña'
                    keyboardType='default'
                    secureTextEntry={true}
                    value={this.state.password}
                />
                 <Text>{this.state.passwordError}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({miniBio: text})}
                    placeholder='Mini Bio (Opcional)'
                    keyboardType='default'
                    value={this.state.miniBio}
                    />
                <TouchableOpacity style={styles.button} onPress={()=>this.register(this.state.email, this.state.password, this.state.userName)}>
                    <Text style={styles.textButton}>Registrarse</Text>  
                <Text>{this.state.generalError}</Text>  
                </TouchableOpacity>
                <TouchableOpacity style = {styles.button} onPress={ () => this.props.navigation.navigate('Login')}>
                   <Text style = {styles.textButton}>Ya tengo una cuenta</Text>
                </TouchableOpacity>
            </View>
        )
    }
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
