import react, { Component } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatList 
} from "react-native";
import Post from "../../Components/Post/Post";
import { auth, db } from "../../firebase/config";





class Home extends Component {
  constructor() {
    super();
    this.state = {listaPost: []}
  }

  componentDidMount(){
    //Traer datos
    db.collection('posts').where("owner", "==", "traer el mail de los usuarios").onSnapshot(
        posteos => {
            let postsAMostrar = [];

            posteos.forEach( unPost => {
                postsAMostrar.push(
                    {
                        id: unPost.id,
                        datos: unPost.data()
                    }
                )
            })

            this.setState({
                listaPost: postsAMostrar
            })
        }
    )
}


  logout() {
    auth.signOut();
    this.props.navigation.navigate("Login");
  }

  render() {
    console.log(this.state.users);
    return (
      <View>
        <Text>HOME</Text>
        <Text>Lista Posteos</Text>

        <FlatList 
            data= {this.state.listaPost}
            keyExtractor={ unPost => unPost.id }
            renderItem={ ({item}) => <Post infoPost = { item } /> }
        />

        <TouchableOpacity onPress={() => this.logout()}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      height: '100vh',
    },
  });

export default Home;