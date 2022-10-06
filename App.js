import React, { Component } from 'react';
import { StyleSheet, Text, SafeAreaView, StatusBar, View } from 'react-native';
import Color from './src/Theme/Colors'
import AppNavigator from './src/Navigator/AppNavigation';


const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

export default class App extends Component{
  render() {
    return(
      <SafeAreaView style={styles.container}>
          <MyStatusBar backgroundColor={Color.statusBarBackground} barStyle="light-content" />
          <AppNavigator/>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Color.statusBarBackground
  },
});

/*  - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */