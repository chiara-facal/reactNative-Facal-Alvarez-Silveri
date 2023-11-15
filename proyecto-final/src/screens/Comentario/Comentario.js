import react, { Component } from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import { db } from '../../firebase/config';
import PostComentario from '../../components/PostComentario';

class Comentario extends Component {
    constructor(props){
        super(props)
        this.state={
            listaComments:[]
        }
    }
}
export default Comentario;