import React, {Component} from 'react';
import { View, TextInput, Text, FlatList, TouchableOpacity} from "react-native";
import {db} from '../../firebase/config';


class Search extends Component{
    constructor(){
        super();
        this.state = {
            busqueda: "", 
            resultados: []
        }
    }

buscador(){

    db.collection('users').where('owner', '>=', this.state.busqueda).where('owner', '<=', this.state.busqueda + '\uf8ff').get()
    .then(usuariosOwner => {
        db.collection('users').where('userName', '>=', this.state.busqueda).where('userName', '<=',this.state.busqueda + '\uf8ff' ).get()
            .then(usuariosUsername => {
                const users = []    ;
                usuariosOwner.forEach(user => {
                    users.push({
                        id: user.id,
                        datos: user.data()
                    });
                });
                usuariosUsername.forEach(doc => {
                    if (users.includes(doc.id)){
                        users.push({
                            id: doc.id,
                            datos: doc.data()
                        });
                    }
                    
                });

                let filtrado = []

                users.forEach(usuario => {
                    if(filtrado.includes(usuario.id)){null}
                    else{filtrado.push({id: usuario.id, datos: usuario.data()})}
                })

                this.setState({
                    resultados: filtrado
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
        {this.state.resultados}
        return(
            <View>
                 <TextInput
                    onChangeText={(text)=>(this.setState({busqueda: text}), this.buscador)}
                    placeholder='Buscar usuario o email'
                    keyboardType='default'
                    value={this.state.busqueda}
                    />
                {this.state.resultados.length === 0?
                (<Text>No se encuentran resultados para tu búsqueda</Text>):
                (
                <FlatList
                    data = {this.state.resultados}
                    keyExtractor={(user, index) => user.id + index}
                    renderItem = {({item}) => (
                        <View>
                            <TouchableOpacity onPress={() =>this.props.navigation.navigate('OtherProfile', {owner: item.datos.owner})}>
                                <Text>{item.datos.owner} - {item.datos.userName}</Text>
                            </TouchableOpacity> 
                        </View>
                    )} 
                    />)}
            </View>
        )
    }
}

export default Search;