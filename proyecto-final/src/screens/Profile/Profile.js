import React, {Component} from 'react';
import { auth, db } from '../../firebase/config';
import {View, Text, ActivityIndicator, FlatList} from 'react-native';
import User from '../../Components/User/User';


class Profile extends Component {
    constructor(){
        super();
        this.state = 
        {infoUsuario: []}
    }

componentDidMount(){
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
}
render(){
    return(
        <View>
            <Text>Mi perfil</Text>
            {this.state.infoUsuario.length === 0?
            <ActivityIndicator size='large' color='pink'/>:
            <FlatList
            data = {this.state.infoUsuario}
            keyExtractor={user => user.id}
            renderItem = {({item}) => <User info = {item}/>}/>}
        </View>
    )
}

}

export default Profile;