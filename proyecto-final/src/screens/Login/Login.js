import react, { Component } from 'react';
import { auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';

class Login extends Component {
    constructor(){
        super()
        this.state={
            email:'',
            password:'',
            emailErrorl:'',
            passwordErrorl:'',
            botonDeshabilitado: true,
            errorMessage: ''
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged( user => {
            if( user ){
                this.props.navigation.navigate('Menu')
            }

        } )
    }

    login (email, pass){
        this.setState({
            errorMessage: ''
        })
        if(this.state.email == '' || this.state.email.includes("@") == false){
            return this.setState({errorMessage: "Es obligatorio ingresar un mail"})
        }else if(this.state.password == '' || this.state.password.length <6){
            return this.setState({errorMessage: "Es obligatoria la contraseña"})
        }
        auth.signInWithEmailAndPassword(email, pass)
            .then( response => {
                console.log('Login ok', response);
                this.props.navigation.navigate('Menu')

            })
            .catch( error => {
                console.log(error);
                this.setState({
                    errorMessage: ''
                })
                if (error.code === 'auth/invalid-email') {
                    return this.setState({ errorMessage: 'El correo electrónico no es válido' });
                  } else if (error.code === 'auth/wrong-password'){
                  return this.setState({ errorMessage: 'Email invalido, inténtelo nuevamente con un usuario existente.' });
                 } else if (error.code === 'auth/internal-error') {
                 return this.setState({ errorMessage: 'El usuario y la contraseña no coinciden' });
                 } else if (error.code === 'auth/wrong-password')
                 { return this.setState({ errorMessage: 'Contraseña incorrecta' });
                }
                });
    }

    render(){
        return(
            <View style={styles.formContainer}>
                <Text>Login</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder='Email'
                    keyboardType='email-address'
                    value={this.state.email}
                    />   
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='Contraseña'
                    keyboardType='default'
                    secureTextEntry={true}
                    value={this.state.password}
                />
                <Text>{this.state.errorMessage}</Text>
                <TouchableOpacity style={styles.button} onPress={()=>this.login(this.state.email, this.state.password)}>
                    <Text style={styles.textButton}>Ingresar</Text>    
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => this.props.navigation.navigate('Register')}>
                   <Text>Registrarse</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
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
    },
    button:{
        backgroundColor:'blue',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    textButton:{
        color: '#fff'
    }

})


export default Login;
