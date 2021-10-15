import { Block } from "@tarojs/components";
import React from "react";
import Taro from "@tarojs/taro";
import withWeapp from "@tarojs/with-weapp";
import "./app.scss";

@withWeapp({
  onLaunch: function () {},
  globalData: {}
}, true)
class App extends React.Component {
  render() {
    return this.props.children;
  }

} //app.js


export default App;