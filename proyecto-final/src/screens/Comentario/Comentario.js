import react, { Component } from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput} from 'react-native';
import { db, auth } from '../../firebase/config';
import firebase from 'firebase';

class Comentario extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        comentarios: [], // Arreglo para almacenar los comentarios
        nuevoComentario: '', // Texto del nuevo comentario
      };
    }
  
    componentDidMount(){
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
            comentario => {
                let showComments = [];
                comentario.forEach( unComentario => {
                    if(this.props.route.params.id === unComentario.id){
                        showComments.push({
                            datos: unComentario.data()
                        })
                    }

                    
                })
                this.setState({
                    comentarios: showComments[0].datos.comments
                })
            }
        )
    }
    

    guardarComment() {
        db.collection('posts').doc(this.props.route.params.id).update({
            comments: firebase.firestore.FieldValue.arrayUnion({ userEmail: auth.currentUser.email, text: this.state.nuevoComentario})
        })
            .then(res => {
                
                this.setState({
                    nuevoComentario: '',
                })
            })
            .catch(e => console.log(e))
    }
  
    render() {
      
      return (
        <View style={styles.container}>
          {this.state.comentarios.length === 0 ? (
            <Text>Aún no hay comentarios</Text>
          ) : (
            <FlatList
              data={this.state.comentarios} 
              keyExtractor={(com)=> com.text + com.user}
              renderItem={({ item }) => (
                <View style={styles.comentarioContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('OtherProfile', { owner: item.userEmail, navigation: this.props.navigation })}>
                    <Text style={styles.autor}>{item.userEmail}</Text>
                    </TouchableOpacity>
                  <Text style={styles.texto}>{item.text}</Text>
                </View>
              )}/>)}
            <View style={styles.seccionComments}>
              <TextInput
                style={styles.inputComments}
                onChangeText={(text) => this.setState({ nuevoComentario: text })}
                placeholder='Insertar comentario'
                keyboardType='default'
                value={this.state.nuevoComentario}
              />
          
              {this.state.nuevoComentario === '' ? null : 
                    <TouchableOpacity style={styles.botonComentar} onPress={() => this.guardarComment()}>
                        <Text style={styles.textoBoton}>Comentar</Text>
                    </TouchableOpacity>}
            </View>
          {/* Botón para regresar a la página principal */}
          <TouchableOpacity  style = {styles.botonComentar} onPress={() => this.props.navigation.goBack()}>
            <Text style={styles.textoBoton}>Regresar</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    comentarioContainer: {
      marginBottom: 10,
    },
    autor: {
      fontWeight: 'bold',
      fontSize: 20
    },
    texto: {
      marginTop: 5,
      fontSize: 20
    },
    seccionComments: {
      marginTop: 20
    },
    inputComments: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 8,
      marginBottom: 10,
    },
    botonComentar: {
      backgroundColor: '#0099CC',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      margin: 10
    },
    textoBoton: {
      color: 'white',
      fontWeight: 'bold',
    },
    textoRegresar: {
      marginTop: 10,
      color: 'blue',
    },
  });
  
  export default Comentario;