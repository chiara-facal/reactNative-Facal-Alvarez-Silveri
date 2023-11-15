import React, { Component } from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

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
                        <Image style={styles.camera} source = {{uri:this.props.infoPost.datos.url}}/>
                        <Text>{this.props.infoPost.datos.post}</Text>
                </View>
               )
  
    }


}

const styles = StyleSheet.create({
    camera: {
        width: '100%',
        height: '60vh'
    }
}
)

export default Post;