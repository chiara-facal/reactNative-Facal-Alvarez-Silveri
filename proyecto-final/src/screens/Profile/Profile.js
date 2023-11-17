import React, {Component} from 'react';
import { auth, db } from '../../firebase/config';
import { View, Text, ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import User from '../../Components/User/User';


class Profile extends Component {
    constructor(){
        super();
        this.state = 
        {infoUsuario: [],
        postUsuario: []
    
    }
    }

componentDidMount(){
    auth.onAuthStateChanged( user => {
        if( user ){
            db.collection('users').where('owner', '==',auth.currentUser.email).onSnapshot(
                usuarios => {
                    let users = [];
                    usuarios.forEach(user =>
                        {users.push({
                            id: user.id,
                            datos: user.data()
                        })})
                
                this.setState({
                    infoUsuario: users
                })
            }
            )
        } else{
            this.props.navigation.navigate('Login')
        }

        db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(
            posteos => {
                let publicaciones = [];
                posteos.forEach(post =>
                    {publicaciones.push({
                        id: post.id,
                        datos: post.data()
                    })})
                this.setState({
                    postUsuario: publicaciones
                })
            }
        )
        
  
    }
    
    )
  
}
render(){
        return(
            <View style = {styles.container}>
                <Text>Mi perfil</Text>
                {this.state.infoUsuario.length === 0?
                (<ActivityIndicator size='large' color='pink'/>):
                (<FlatList
                data = {this.state.infoUsuario}
                keyExtractor={user => user.id}
                renderItem = {({item}) => <User info = {item} posteos = {this.state.postUsuario}/>}/>)}
            </View>
)
    
}

}


const styles = StyleSheet.create({
    container: {
      flex: 1, 
    },
  });

export default Profile;