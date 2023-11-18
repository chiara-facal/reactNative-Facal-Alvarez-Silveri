import react, { Component } from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import { db, auth } from '../../firebase/config';

class Comentario extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        comentarios: [], // Arreglo para almacenar los comentarios
        nuevoComentario: '', // Texto del nuevo comentario
      };
    }
  
    componentDidMount(){
        db.collection('posts').where('id', '==', this.props.route.params.id).orderBy('createdAt', 'desc').onSnapshot(
            comentario => {
                let showComments = [];
                comentario.forEach( unComentario => {
                        showComments.push({
                            datos: unComentario.data()
                        })
                    
                })
                this.setState({
                    comentarios: showComments[0].datos.comments
                })
            }
        )
    }

    guardarComment() {
        db.collection('posts').doc(this.props.route.params.id).update({
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
              data={this.state.comentarios} // Mostrar los comentarios en orden ascendente
              keyExtractor={(com)=> com.text + com.user}
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
  
  export default Comentario;