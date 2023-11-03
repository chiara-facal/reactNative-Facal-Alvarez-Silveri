import React, {Component} from React;
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

    ComponentDidUpdate(){

        db.collection('users').where('owner', '==', busqueda).orWhere('userName' ,'==', busqueda).onSnapshot(
            usuarios => {
                let users = [];
                usuarios.forEach(user =>
                    {users.push({
                        id: user.id,
                        datos: user.data()
                    })})
            
            this.setState({
                resultados: users
            })
        }
        )
        
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
                ( <FlatList
                    data = {this.state.busqueda}
                    keyExtractor={user => user.id}
                    renderItem = {({item}) => (
                        <View>
                        <Text>{item.datos.owner}</Text>
                        <Text>{item.datos.userName}</Text>
                        </View>
                    )} 
                    />)}
            </View>
        )
    }
}

export default Search