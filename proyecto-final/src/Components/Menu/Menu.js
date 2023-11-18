import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import react, { Component } from "react";
import Home from "../../screens/Home/Home";
import NewPost from "../../screens/NewPost/NewPost";
import Profile from "../../screens/Profile/Profile";
import Search from "../../screens/Search/Search";
import {FontAwesome} from "@expo/vector-icons";

const Tab = createBottomTabNavigator()

class Menu extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {

    return (
        <Tab.Navigator screenOptions={{tabBarShowLabel:false }}>
            <Tab.Screen name="Home" component={Home} options ={{tabBarIcon: () => <FontAwesome name = "home" size = {24} color = "black"/>}}/>
            <Tab.Screen name = "Search" component = {Search} options ={{tabBarIcon: () => <FontAwesome name = "search" size = {24} color = "black"/>}}/>
            <Tab.Screen name="NewPost" component={NewPost} options ={{tabBarIcon: () => <FontAwesome name = "plus" size = {24} color = "black"/>}}/>
            <Tab.Screen name="Profile" component={Profile} options ={{tabBarIcon: () => <FontAwesome name = "user-circle" size = {24} color = "black"/>}}/>
        </Tab.Navigator>
    );
  }
}

export default Menu;