import React, {Component} from 'react';
import { TouchableOpacity, View, Text, FlatList } from 'react-native';
import { auth, db} from '../../firebase/config';
import firebase from 'firebase';

class User extends Component{
    constructor(props){
        super(props)
        this.state = {
            estado: ""
        }
    }


logOut(){
    auth.signOut()
    this.props.navigation.navigate('Login');
}

borrarPost(id){
    db.collection('posts').doc(id).delete()
    .then(()=>{
        console.log("Post eliminado")
    })
    .catch((error) =>{
        console.log(error)
    })}

render(){
    return(
        <View>
            <Text>Usuario: {this.props.info.datos.userName}</Text>
            <Text>Email: {this.props.info.datos.owner}</Text>
            {this.props.info.datos.miniBio === "" ? 
            <Text></Text>: <Text>Mini bio: {this.props.info.datos.miniBio}</Text>} 
         {/* Foto de perfil */} 
            <Text>Cantidad de posteos: {this.props.posteos.length}</Text>
            {this.props.posteos.length === 0?
                (<Text></Text>):
                (<FlatList
                data = {this.props.posteos}
                keyExtractor={(post) => post.id}
                renderItem = {({item}) => (
                    <View>
                        <Text>Posteos</Text>
                        <Text>Descripción: {item.datos.post}</Text>
                        {this.props.info.datos.owner == auth.currentUser.email ? 
                        (<TouchableOpacity onPress={() => this.borrarPost(item.id)}>
                        <Text>Borrar posteo</Text>        
                        </TouchableOpacity>): ""}
                    </View>
                )}/>)}
            {this.props.info.datos.owner == auth.currentUser.email ? 
            (<TouchableOpacity onPress={() => this.logOut()}>
            <Text>Salir</Text>        
            </TouchableOpacity>): ""}
        </View>
    ) }
 }

 export default User;