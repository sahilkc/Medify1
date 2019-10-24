import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar, BackHandler, Alert, Header, Image } from 'react-native';
import { Icon } from "react-native-elements";
import { onSignIn } from '../Authentication/Auths';
// import CardStack, { Card } from 'react-native-card-stack-swiper';


export default class Home extends React.Component {
  static navigationOptions = {
    header: null,

  };

  render() {
    return (

      <View style={styles.container}>
        {/* <CardStack style={styles.content} ref={swiper => { this.swiper = swiper }}>
    <Card style={[styles.card, styles.card1]}><Text style={styles.label}>A</Text></Card>
    <Card style={[styles.card, styles.card2]}><Text style={styles.label}>B</Text></Card>
    <Card style={[styles.card, styles.card1]}><Text style={styles.label}>C</Text></Card>
  </CardStack>
 */}


        <Text>Press back button</Text>
        <Text>Home Screen</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    paddingLeft: 10
  },

});