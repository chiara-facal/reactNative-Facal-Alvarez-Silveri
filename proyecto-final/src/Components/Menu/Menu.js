import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import react, { Component } from "react";
import Home from "../../screens/Home/Home";
import NewPost from "../../screens/NewPost/NewPost";
import Profile from "../../screens/Profile/Profile";
import Search from "../../screens/Search/Search";

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
            <Tab.Screen name = "Search" component = {Search}/>
            <Tab.Screen name="NewPost" component={NewPost}/>
            <Tab.Screen name="Profile" component={Profile}/>
        </Tab.Navigator>
    );
  }
}

export default Menu;