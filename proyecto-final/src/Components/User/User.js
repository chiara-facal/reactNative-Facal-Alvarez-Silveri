import React, {Component} from 'react';
import { TouchableOpacity, View, Text, FlatList, Image, StyleSheet} from 'react-native';
import { auth, db} from '../../firebase/config';

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
            "": <Text>Mini bio: {this.props.info.datos.miniBio}</Text>} 
            {this.props.info.datos.photo === "" ? "" :
            <Image style={styles.camera}  source = {{uri: this.props.info.datos.photo}}/> }
            <Text>Cantidad de posteos: {this.props.posteos.length}</Text>
            {this.props.info.datos.owner == auth.currentUser.email ? 
            (<TouchableOpacity onPress={() => this.logOut()}>
            <Text>Salir</Text>        
            </TouchableOpacity>): ""}
            {this.props.posteos.length === 0?
               "":
                (<FlatList
                data = {this.props.posteos}
                keyExtractor={(post) => post.id}
                renderItem = {({item}) => (
                    <View>
                        <Text>Posteos</Text>
                        <Image style={styles.camera} source = {{uri:item.datos.url}}/>
                        <Text>Descripción: {item.datos.post}</Text>
                        {this.props.info.datos.owner == auth.currentUser.email ? 
                        (<TouchableOpacity onPress={() => this.borrarPost(item.id)}>
                        <Text>Borrar posteo</Text>        
                        </TouchableOpacity>): ""}
                    </View>
                )}/>)}
        </View>
    ) }
 }

 const styles = StyleSheet.create({
    camera: {
        width: '100%',
        height: '60vh'
    }
}
)

 export default User;