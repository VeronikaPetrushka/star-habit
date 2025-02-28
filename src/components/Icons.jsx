import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Icons = ({ type, light }) => {

  let imageSource;
  let iconStyle = [styles.icon];

  switch (type) {
    case 'plus':
      imageSource = require('../assets/icons/plus.png');
      break;
    case 'list':
      imageSource = require('../assets/icons/list.png');
      break;
    case 'game':
      imageSource = require('../assets/icons/game.png');
      break;
    case 'selected':
      imageSource = require('../assets/icons/selected.png');
      light && iconStyle.push(styles.light);
      break;
    case 'back':
      imageSource = require('../assets/icons/back.png');
      break;
    case 'star':
      imageSource = require('../assets/icons/star.png');
      break;
    case 'delete':
      imageSource = require('../assets/icons/delete.png');
      break;
    case 'edit':
      imageSource = require('../assets/icons/edit.png');
      break;
    case 'dots':
      imageSource = require('../assets/icons/dots.png');
      break;
    case 'rocket':
      imageSource = require('../assets/icons/rocket.png');
      break;
    case 'next':
      imageSource = require('../assets/icons/next.png');
      break;
    case 'pause':
      imageSource = require('../assets/game/pause.png');
      break;
    case 'left':
      imageSource = require('../assets/game/left.png');
      break;
    case 'right':
      imageSource = require('../assets/game/right.png');
      break;
  }

  return (
    <Image 
      source={imageSource} 
      style={iconStyle} 
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  light: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    tintColor: '#fff8ca',
  },
});

export default Icons;
