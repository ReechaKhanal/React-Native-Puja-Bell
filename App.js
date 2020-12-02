import RNShakeEvent from 'react-native-shake-event';
import React, { Component, PropTypes } from 'react';
import { ImageBackground, Image, StyleSheet, Text, View, SafeAreaView, Animated, DeviceEventEmitter, NativeModules} from "react-native";
import Sound from 'react-native-sound';
import Icon from 'react-native-vector-icons/FontAwesome'; // and this
import invariant from 'invariant';
import SplashScreen from 'react-native-splash-screen';

var appSounds;
export default class MyComponent extends React.Component {
    
  playSound = () => {
    Sound.setCategory('Playback');
    appSounds = new Sound('abcd.aac',Sound.MAIN_BUNDLE,(error)=>{
      if(error){
        console.log('Error loading sound: ' + error);
        return;
      }
      appSounds.play((success) => {
        if(!success){
          console.log('Issue Playing File');
        }
      });
    });
  }
    
  constructor(p) {
    super(p);
    this.state = {
      amin: new Animated.Value(0)
    };
  } // now we want to animate the state now it will automaticaly updated

  startAnimation(){
    console.log('loop');
    //Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.amin, {
          toValue: -1, // so i add the delay here
          duration: 100,
          useNativeDriver: true
        }),
        Animated.timing(this.state.amin, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true
        }),
        Animated.timing(this.state.amin, {
          toValue: -1,
          duration: 100,
          useNativeDriver: true
        }),
        Animated.timing(this.state.amin, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true
        }),
        Animated.timing(this.state.amin, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        })
      ]).start();
    //).start();
  }
  componentWillMount() { 
    SplashScreen.hide()   
    RNShakeEvent.addEventListener('shake', () => {
      { this.playSound(); this.startAnimation(); }
      console.log('Sound');
    });
  }
  componentWillUnmount() {
    RNShakeEvent.removeEventListener('shake');
  }
  render () {
    const rotation = this.state.amin.interpolate({
      inputRange: [-1, 1], // left side to right side
      outputRange: ['-10deg', '10deg']// before that we have to check now it's perfect
    });

    return(
      <ImageBackground source={require('./background.jpg')} style={styles.image}>
          <View style={styles.container}>
            <Text style={styles.titleText}>
              Welcome to Your Puja Bell
            </Text>
          </View>
        <Animated.View style={{ alignSelf: 'center', transform: [{ rotate: rotation }] }}>
          <Icon name="bell" style={{ fontSize: 400, height:500, color:"#D4AF37", backgroundColor:"transparent"}}/>
        </Animated.View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  image: {
    flex:1,
    resizeMode:"cover",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#a30e03',
    paddingVertical: 50,
  },
  buttonPlay: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'rgba(00,80,00,1)',
    borderWidth: 1,
    borderColor: 'rgba(80,80,80,0.5)',
    overflow: 'hidden',
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
});