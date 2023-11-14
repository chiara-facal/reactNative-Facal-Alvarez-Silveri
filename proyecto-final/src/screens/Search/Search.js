import React, {Component} from 'react';
import { View, TextInput, Text, FlatList} from "react-native";
import {db} from '../../firebase/config';


class Search extends Component{
    constructor(){
        super();
        this.state = {
            busqueda: "", 
            resultados: []
        }
    }

componentDidUpdate(){
    
        db.collection('users').where('owner', '==', this.state.busqueda).get()
        .then(usuariosOwner => {
            db.collection('users').where('userName', '==', this.state.busqueda).get()
                .then(usuariosUsername => {
                    const users = []    ;
                    usuariosOwner.forEach(user => {
                        users.push({
                            id: user.id,
                            datos: user.data()
                        });
                    });
                    usuariosUsername.forEach(doc => {
                        users.push({
                            id: doc.id,
                            datos: doc.data()
                        });
                    });

                    this.setState({
                        resultados: users
                    });
                })
                .catch(error => {
                    console.error(error);
                });
        })
        .catch(error => {
            console.error(error);
        });
        
    }

    

    render(){
        return(
            <View>
                 <TextInput
                    onChangeText={(text)=>this.setState({busqueda: text})}
                    placeholder='Buscar usuario o email'
                    keyboardType='default'
                    value={this.state.busqueda}
                    />
                {this.state.resultados.length === 0?
                (<Text>No se encuentran resultados para tu búsqueda</Text>):
                (
                <FlatList
                    data = {this.state.resultados}
                    keyExtractor={user => user.id}
                    renderItem = {({item}) => (
                        <View>
                        <Text>{item.datos.owner} - {item.datos.userName}</Text>
                        </View>
                    )} 
                    />)}
            </View>
        )
    }
}

export default Search;