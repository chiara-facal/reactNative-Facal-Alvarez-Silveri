import React, { Component } from 'react';
import {View, Text} from 'react-native';

class Post extends Component {
    constructor(props){
        super(props)
        this.state={
        }
    }

    render(){
            return (
                <View>
                        <Text>{this.props.infoPost.datos.owner}</Text>
                        <Text>{this.props.infoPost.datos.post}</Text>
                </View>
               )
  
    }


}


export default Post;