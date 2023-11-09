import React, {Component} from 'react';
import { TouchableOpacity, View } from 'react-native';
import { auth } from '../../firebase/config';

class User extends Component{
    constructor(props){
        super(props)
        this.state = {
            estado: ""
        }
    }
logOut(){
    auth.signOut();
    this.props.navigation.navigate("Login")
}

render(){
    return(
        <View>
            <Text>Usuario: {this.props.info.datos.userName}</Text>
            <Text>Email: {this.props.info.datos.owner}</Text>
            <Text>Minio bio: {this.props.info.datos.miniBio}</Text>
         {/* Foto de perfil */}
         {/* Cantidad de posteos */}
         {/* Mostrar todos los posteos */}
         {/* Poder borrar posteo si es el dueño de ellos */}
        {this.props.info.datos.owner == auth.currentUser.email ? 
        (<TouchableOpacity onPress={() => this.logOut()}>
            <Text>Salir</Text>
        </TouchableOpacity>): ""}
        </View>
    )
}
}

export default User;