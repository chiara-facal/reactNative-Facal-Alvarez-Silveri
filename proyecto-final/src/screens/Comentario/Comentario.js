import react, { Component } from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import { db, auth } from '../../firebase/config';

class Comentarios extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        comentarios: [], // Arreglo para almacenar los comentarios
        nuevoComentario: '', // Texto del nuevo comentario
      };
    }
  
    componentDidMount(){
        db.collection('posts').onSnapshot(
            comentario => {
                let showComments = [];
                comentario.forEach( unComentario => {
                    if (unComentario.id == this.props.route.params.id.id) {
                        showComments.push({
                            id: unComentario.id,
                            datos: unComentario.data()
                        })
                    }
                })
                this.setState({
                    comentarios: showComments
                })
            }
        )
    }

    guardarComment() {
        db.collection('posts').doc(this.props.route.params.infoPost.id).update({
            comments: firebase.firestore.FieldValue.arrayUnion({ text: this.state.nuevoComentario, userEmail: auth.currentUser.email, createdAt: Date.now() })
        })
            .then(res => {
                //this.state.comentarios.push({ text: this.state.textoComment, userEmail: auth.currentUser.email, createdAt: Date.now() })
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
              data={this.state.comentarios.reverse()} // Mostrar los comentarios en orden ascendente
              keyExtractor={(com)=> com.id}
              renderItem={({ item }) => (
                <View style={styles.comentarioContainer}><TouchableOpacity onPress={() => this.props.navigation.navigate('OtherProfile', { userData: comment.item.userEmail, navigation: this.props.navigation })}></TouchableOpacity>
                  <Text style={styles.autor}>{item.auth.currentUser.email}</Text>
                  <Text style={styles.texto}>{item.Text}</Text>
                </View>
              )}
            />
          )}
  
          
  
          {/* Botón para regresar a la página principal */}
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Text style={styles.textoRegresar}>Regresar</Text>
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
    },
    texto: {
      marginTop: 5,
    },
    seccionComments: {
      marginTop: 20,
    },
    inputComments: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 8,
      marginBottom: 10,
    },
    botonComentar: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
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
  
  export default Comentarios;