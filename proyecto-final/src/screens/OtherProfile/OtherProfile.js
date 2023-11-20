import React, {Component} from 'react';
import { auth, db } from '../../firebase/config';
import { View, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, Text} from 'react-native';
import User from '../../Components/User/User';


class OtherProfile extends Component {
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
            db.collection('users').where('owner', '==',this.props.route.params.owner).onSnapshot(
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
                db.collection('posts').where('owner', '==', this.props.route.params.owner).onSnapshot(
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
        } else{
            this.props.navigation.navigate('Login')
        }

        
        
  
    }
    
    )
  
}
render(){
        return(
            <View style = {styles.container}>
                <TouchableOpacity style = {styles.button}onPress={() => this.props.navigation.goBack()}>
                <Text style={styles.textButton}>Regresar</Text>
            </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'center'
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
    }
  });

export default OtherProfile;