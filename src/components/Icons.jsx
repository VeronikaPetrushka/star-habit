import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Icons = ({ type, light }) => {

  let imageSource;
  let iconStyle = [styles.icon];

  switch (type) {
    // case '1':
    //   imageSource = require('../assets/panel/1.png');
    //   active && iconStyle.push(styles.active);
    //   break;
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
