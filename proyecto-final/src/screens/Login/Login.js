import react, { Component } from 'react';
import { auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, ActivityIndicator} from 'react-native';

class Login extends Component {
    constructor(){
        super()
        this.state={
            email:'',
            password:'',
            emailErrorl:'',
            passwordErrorl:'',
            botonDeshabilitado: true,
            errorMessage: '',
            cargando: true
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged( user => {
            if( user ){
                this.props.navigation.navigate('Menu')
            } else {
                this.setState({cargando: false})
            }

        } )
    }

    login (email, pass){
        this.setState({
            errorMessage: '',
            cargando: true
        })
        if(this.state.email == '' || this.state.email.includes("@") == false){
            return this.setState({errorMessage: "Es obligatorio ingresar un mail",cargando: false})
        }else if(this.state.password == '' || this.state.password.length <6){
            return this.setState({errorMessage: "Es obligatoria la contraseña",cargando: false})
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
                    return this.setState({ errorMessage: 'El correo electrónico no es válido' ,cargando: false});
                  } else if (error.code === 'auth/wrong-password'){
                  return this.setState({ errorMessage: 'Email invalido, inténtelo nuevamente con un usuario existente.' ,cargando: false});
                 } else if (error.code === 'auth/internal-error') {
                 return this.setState({ errorMessage: 'El usuario y la contraseña no coinciden',cargando: false });
                 } else if (error.code === 'auth/wrong-password')
                 { return this.setState({ errorMessage: 'Contraseña incorrecta',cargando: false });
                }
                });
    }

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
                <Text style = {styles.title}>BEAT</Text>
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
                {this.state.cargando ? (
                    <>
                        <ActivityIndicator size="small" color="#fff" />
                        <Text style={styles.textButton}>Cargando...</Text>
                    </>
                ) 
                :''}
                <Text>{this.state.errorMessage}</Text>
                <TouchableOpacity style={styles.button} onPress={()=>this.login(this.state.email, this.state.password)}>
                    <Text style={styles.textButton}>Ingresar</Text>    
                </TouchableOpacity>
                <TouchableOpacity style = {styles.button}onPress={ () => this.props.navigation.navigate('Register')}>
                   <Text style = {styles.textButton}>¿No tienes cuenta? Registrarse</Text>
                </TouchableOpacity>
                <Text style = {styles.footer}> Chiara Facal, Pedro Alvarez y Mateo Silveri - Programación III</Text>
            </View>
        )
    }}
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
        paddingVertical: 6,
        textAlign: 'center',
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
    },
    title: {
        fontSize: 100, 
        fontFamily: "Pacifico",
        margin: 20,
        marginBottom: 50
    },
    footer: {
        textAlign: 'center',
        marginTop: 200
    }

})


export default Login;
