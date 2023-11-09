// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/screens/Login/Login';
import Register from './src/screens/Register/Register';
import Profile from './src/screens/Profile/Profile';
import Search from './src/screens/Search/Search';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {

  return (
    
    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name='Registro' component={Register} options={ { headerShown: false } }/>
        <Stack.Screen name='Login' component={Login} options={ { headerShown: false } }/>
        <Stack.Screen name='Home' component={Profile} options={ { headerShown: true} }/>
        <Stack.Screen name='Home' component={Search} options={ { headerShown: true } }/>

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
