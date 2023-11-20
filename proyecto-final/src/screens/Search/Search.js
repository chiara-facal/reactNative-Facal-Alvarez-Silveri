import React, {Component} from 'react';
import { View, TextInput, Text, FlatList, TouchableOpacity, StyleSheet} from "react-native";
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

    db.collection('users').where('owner', '>=', this.state.busqueda).where('owner', '<=', this.state.busqueda + '\uf8ff').onSnapshot(
    usuariosOwner => {
        db.collection('users').where('userName', '>=', this.state.busqueda).where('userName', '<=',this.state.busqueda + '\uf8ff' ).onSnapshot(
            (usuariosUsername => {
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
                    }
                    
                );

                let filtrado = []

                users.forEach((usuario) => {
                    if (
                    filtrado.some(
                    (item) => item.id == usuario.id))  
                        {null} 
                    else {
                      filtrado.push({ id: usuario.id, datos: usuario.datos });
                    }
                  });
                  
                  this.setState({
                    resultados: filtrado,
                  });
            })

    )})
   
}
    
    render(){
        return(
            <View style = {styles.container}> 
                 <TextInput
                    style={styles.input}
                    onChangeText={(text)=>{this.setState({busqueda: text}), this.buscador()}}
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
                        <View style = {styles.resultsContainer}>
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
const styles = StyleSheet.create({
container: {
    flex: 1,
    alignItems: 'center',  
    justifyContent: 'center',  
    marginTop: 10, 
    width: '100%'
}, 
input:{
    height:50,
    paddingVertical:15,
    paddingHorizontal: 10,
    borderWidth:1,
    borderColor: '#0099CC',
    borderStyle: 'solid',
    borderRadius: 6,
    marginVertical:10,
    width: 350
},
resultsContainer: {
    flex: 1, 
    marginVertical: 10,
    width: 350, 
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center'
}
})

export default Search;