import React, { Component } from 'react';
import {View, Text, Image, StyleSheet,TextInput, TouchableOpacity, FlatList} from 'react-native';
import { db, auth } from '../../firebase/config';
import { AntDesign } from '@expo/vector-icons';
import firebase from 'firebase';

class Post extends Component {
    constructor(props){
        super(props)
        this.state={
            img: '',
            description: '',
            date: '',
            email: '',
            likes: '',
            comments: '',
        }
    }

    componentDidMount(){
        let likes = this.props.infoPost.datos.likes

        if(likes.length === 0){
            this.setState({
                like: false
            })
        }

        if (likes.length >0) {
            likes.forEach(like => {{if (like === auth.currentUser.email) {
                this.setState({ like: true })
            }}});
        }
    }


    like(){
        db.collection("posts").doc(this.props.infoPost.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(
            this.setState({
                like: true
            })
        )
    }

    unLike(){
        db.collection("posts").doc(this.props.infoPost.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(
            this.setState({
                like: false
            })
        )
    }

    Comentario(){
        db.collection("posts").doc(this.props.infoPost.id).update({
            comments: firebase.firestore.FieldValue.arrayUnion({userEmail: auth.currentUser.email,texto:this.state.comments})
        })
        .then(
            this.setState({
                comments: ''
            })
        )
        .catch(e => console.log(e))
    }


    render(){
            return (
                <View style = {styles.formContainer}>
                    <TouchableOpacity onPress={() => {if (this.props.infoPost.datos.owner == auth.currentUser.email){
                        this.props.navigation.navigate("Profile")
                    }else{
                        this.props.navigation.navigate('OtherProfile', {owner: this.props.infoPost.datos.owner})
                    }}
                       }>
                        <Text style = {styles.usuario}>{this.props.infoPost.datos.owner}</Text>
                    </TouchableOpacity>
                    <Image style={styles.camera} source = {{uri:this.props.infoPost.datos.url}}/>
                    <Text>{this.props.infoPost.datos.post}</Text>

                    {this.props.infoPost.datos.likes.length === 0 
                    ?
                    <TouchableOpacity onPress={() => this.like()}>
                        <Text style = {styles.textButton}>Likes: <AntDesign name="hearto"  size={24} color="black" /> {this.props.infoPost.datos.likes.length}</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => this.unLike()}>
                        <Text style = {styles.textButton}>Likes: <AntDesign name="heart" size={24} color="black" /> {this.props.infoPost.datos.likes.length}</Text>
                    </TouchableOpacity>}
                
                
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Comentario", {id: this.props.infoPost.id})}>
                        <Text style = {styles.textButton}>Ver todos los comentarios</Text>
                    </TouchableOpacity>
                    <View style={styles.seccionComments}>
                        <TextInput
                        style={styles.inputComments}
                        onChangeText={(text) => this.setState({ comments: text })}
                        placeholder="Insertar comentario"
                        keyboardType="default"
                        value={this.state.comments}
                        />
                        {this.state.comments === '' ? null : 
                            <TouchableOpacity style={styles.textButton} onPress={() => this.Comentario()}>
                                <Text style={styles.textButton}>Comentar</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
               )
  
    }


}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        paddingTop: 5,
        paddingBottom: 10,
        paddingLeft: 10,
        margin: 15,
        backgroundColor: 'lightgrey',
        borderRadius: 6,
  
    },
    camera: {
        width: '97%',
        height: 250
    },
    textButton: {
        color: "black",
        fontSize: 15,
    },
    seccionComments: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    inputComments: {
        height: 20,
        width: 225,
      },
    usuario: {
        fontSize: 15,
        margin: 5, 
        fontWeight: 'bold'
    }

}
)

export default Post;