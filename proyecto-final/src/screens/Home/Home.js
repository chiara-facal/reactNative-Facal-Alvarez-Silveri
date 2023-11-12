import React, { Component } from "react";
import {
  View,
  Text,
  FlatList 
} from "react-native";
import Post from "../../Components/Post/Post";
import { db } from "../../firebase/config";


class Home extends Component {
  constructor() {
    super();
    this.state = {
      listaPost: []
    }
  }

  componentDidMount(){
    db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
        posteos => {
          let menu = [];
          posteos.forEach(post => {
              menu.push(
                    {
                    id: post.id,
                    datos: post.data()
                    }
                )
            })

            this.setState({
                listaPost: menu
            })
        }
    )
}

  render() {
    return (
      <View>
        <FlatList 
            data= {this.state.listaPost}
            keyExtractor={ unPost => unPost.id }
            renderItem={ ({item}) => <Post infoPost = { item } /> }
        />
      </View>
    );
  }
}


export default Home;