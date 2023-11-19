// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/screens/Login/Login';
import Register from './src/screens/Register/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Menu from './src/Components/Menu/Menu';
import Image from './src/screens/Image/Image'
import OtherProfile from './src/screens/OtherProfile/OtherProfile'
import Comentario from './src/screens/Comentario/Comentario';
import CambiarContrasena from './src/screens/CambiarContrasena.js/CambiarContrasena';
import Profile from './src/screens/Profile/Profile';

export default function App() {

  const Stack = createNativeStackNavigator()

  return (
    
    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
       <Stack.Screen name='Login' component={Login} options={ { headerShown: false } }/>
        <Stack.Screen name='Register' component={Register} options={ { headerShown: false } }/>
        <Stack.Screen name = "Image" component= {Image} options = {{headerShown: false}}/>
        <Stack.Screen  name = 'Profile' component={Profile} options={{headerShown: false}}/>
        <Stack.Screen name = "OtherProfile" component = {OtherProfile} options = {{headerShown: false}}/>
        <Stack.Screen name='Menu' component={Menu} options={ { headerShown: false } }/>
        <Stack.Screen name = 'Comentario' component = {Comentario} options={{headerShown: false}}/>
        <Stack.Screen name = 'CambiarContrasena' component = {CambiarContrasena} options = {{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>

);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'flex-start',
},
});