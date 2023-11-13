import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import MyCamera from '../../Components/MyCamera/Mycamera';

class Image extends Component{
    constructor(){
        super()
        this.state = {
            showCamera: false, 
            url: ''
        }
    }
    onImageUpload(url){
        this.setState({ url: url , showCamera: false});
        this.props.navigation.navigate('Menu')
      }

    render(){
        return(
            <View>
           <Text>¿Desea sacarse una foto de perfil?</Text>
            <TouchableOpacity onPress={() =>this.setState({showCamera: true}) }>
            <Text>Agregar foto</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={() =>this.props.navigation.navigate('Menu') }>
            <Text>Dirigirme a Home</Text>
           </TouchableOpacity>
            {this.state.showCamera ? <MyCamera onImageUpload={(url) => this.onImageUpload(url)} /> : <Text></Text>}
            </View>
 
        )
    }
}

export default Image;