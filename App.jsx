import React, { useState, useEffect, useRef } from 'react';
import { Animated, View, ImageBackground, StyleSheet } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import StartScreen from './src/screens/StartScreen';
import TaskManagerScreen from './src/screens/TaskManagerScreen';
import CreateTaskScreen from './src/screens/CreateTaskScreen';
import TasksListScreen from './src/screens/TasksListScreen';

import StarLoader from './src/components/StarLoader';

enableScreens();

const Stack = createStackNavigator();

const loader = require('./src/assets/loader.png');

const App = () => {
      const [loaderIsEnded, setLoaderIsEnded] = useState(false);

      const loaderAnim = useRef(new Animated.Value(0)).current;
    
      useEffect(() => {
          Animated.timing(loaderAnim, {
              toValue: 1,
              duration: 3000,
              useNativeDriver: true,
          }).start(() => {
                  setLoaderIsEnded(true);
              });
      }, []);  

  return (
      <NavigationContainer>
            {
                  !loaderIsEnded ? (
                  <View style={{ flex: 1 }}>
                        <ImageBackground style={{ flex: 1 }} source={loader}>
                              <View style={styles.container}>
                              <Animated.View style={[styles.imageContainer, { opacity: loaderAnim }]}>
                                    <ImageBackground source={loader} style={styles.image} />
                              </Animated.View>
                              <View style={{width: '100%', alignItems: 'center', marginLeft: -50}}>
                                    <StarLoader />
                              </View>
                              </View>
                        </ImageBackground>
                  </View>
                  ) : (
                        <Stack.Navigator initialRouteName={"StartScreen" }>
                              <Stack.Screen 
                                    name="StartScreen" 
                                    component={StartScreen} 
                                    options={{ headerShown: false }} 
                              />
                              <Stack.Screen 
                                    name="TaskManagerScreen" 
                                    component={TaskManagerScreen} 
                                    options={{ headerShown: false }} 
                              />
                              <Stack.Screen 
                                    name="CreateTaskScreen" 
                                    component={CreateTaskScreen} 
                                    options={{ headerShown: false }} 
                              />
                              <Stack.Screen 
                                    name="TasksListScreen" 
                                    component={TasksListScreen} 
                                    options={{ headerShown: false }} 
                              />
                        </Stack.Navigator>
                  )
            }
      </NavigationContainer>
    );
};

const styles = StyleSheet.create({
      container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
      },
      imageContainer: {
          width: '100%',
          height: '100%',
          position: 'absolute',
      },
      image: {
          width: '100%',
          height: '100%',
          resizeMode: 'cover',
      },
  });  

export default App;
