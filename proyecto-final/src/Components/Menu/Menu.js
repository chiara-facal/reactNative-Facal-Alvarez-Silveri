import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import react, { Component } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatList 
} from "react-native";
import Home from "../../screens/Home/Home";
import User from "../User/User";
import NewPost from "../../screens/NewPost/NewPost";

const Tab = createBottomTabNavigator()

class Menu extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {

    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="NewPost" component={NewPost}/>
            <Tab.Screen name="User" component={User}/>
        </Tab.Navigator>
    );
  }
}

export default Menu;