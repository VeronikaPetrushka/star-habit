import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet, Easing } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const StarLoader = () => {
  const star1Anim = useRef(new Animated.Value(0)).current;
  const star2Anim = useRef(new Animated.Value(0)).current;
  const star3Anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateStar = (anim, delay) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: 1500,
            easing: Easing.linear,
            useNativeDriver: true,
            delay,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 1500,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateStar(star1Anim, 0);
    animateStar(star2Anim, 250);
    animateStar(star3Anim, 500);
  }, []);

  const getStyle = (anim, xOffset, size) => ({
    transform: [
      { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [0, -20] }) },
      { translateX: anim.interpolate({ inputRange: [0, 1], outputRange: [xOffset, 0] }) },
      { rotate: anim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] }) },
    ],
    opacity: anim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }),
    width: size,
    height: size,
  });

  return (
    <View style={styles.loaderContainer}>
      <Animated.View style={[styles.star, getStyle(star1Anim, 60, 32)]}>
        <StarSVG />
      </Animated.View>
      <Animated.View style={[styles.star, getStyle(star2Anim, 40, 24)]}>
        <StarSVG />
      </Animated.View>
      <Animated.View style={[styles.star, getStyle(star3Anim, 20, 18)]}>
        <StarSVG />
      </Animated.View>
    </View>
  );
};

const StarSVG = () => (
  <Svg viewBox="0 0 350 350" width="100%" height="100%">
    <Path
      d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"
      fill="#f8de7e"
    />
  </Svg>
);

const styles = StyleSheet.create({

  loaderContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -30 }],
    flexDirection: 'row',
    alignItems: 'center',
  },

  star: {
    position: 'absolute',
  },

});

export default StarLoader;
