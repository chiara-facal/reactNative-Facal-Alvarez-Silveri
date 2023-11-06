import React, {Component} from "react"
import {Camera} from 'expo-camera'

class MyCamera extends Component{
    constructor(props){
        super(props);
        this.state = { permisos : false , photo : '', showCamera: true}
    }

    componentDidMount() {
        Camera.requestCameraPermissionsAsync()
        .then(res => {
            if (res.granted === true) {

            }
        })
    }

    sacarFoto(){
        this.metodos
    }

    render(){
        return (
            <>
                {this.state.permisos ?
                <View>
                    <Camera style = {StyleSheet.camera} type = {Camera.Constants}></Camera>
                </View>
                }
            </>
        )
    }
}