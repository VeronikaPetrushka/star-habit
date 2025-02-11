import React, { useEffect, useState, useCallback } from 'react';
import { View, Text,TouchableOpacity, Image, StyleSheet, Dimensions, Modal, ScrollView, ImageBackground } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { BlurView } from '@react-native-community/blur';
import ProgressBar from './ProgressBar';
import Icons from "./Icons";

const { height } = Dimensions.get('window');

const Home = ({ habitName }) => {
    const navigation = useNavigation();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [createdHabit, setCreatedHabit] = useState('');
    const [habits, setHabits] = useState([]);

    const loadHabits = async () => {
        try {
            const storedHabits = await AsyncStorage.getItem('habits');
            if (storedHabits) {
                setHabits(JSON.parse(storedHabits));
            }
        } catch (error) {
            console.log('Error loading habits from AsyncStorage:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadHabits();
          }, [])
        );

    const updateHabitStars = async (index) => {
        try {
            const updatedHabits = [...habits];
            updatedHabits[index].stars += 1;
            setHabits(updatedHabits);
    
            await AsyncStorage.setItem('habits', JSON.stringify(updatedHabits));
        } catch (error) {
            console.log('Error updating habit stars:', error);
        }
    };    

    useEffect(() => {
        if (habitName) {
          setCreatedHabit(habitName);
          setIsModalVisible(true);

          const timer = setTimeout(() => {
            handleCloseModal();
          }, 3000);

          return () => clearTimeout(timer);
        }
      }, [habitName]);

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setCreatedHabit('');
    };

    return (
        <ImageBackground source={require('../assets/loader.png')} style={{flex: 1}}>
            <View style={styles.container}>

                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'flex-start', marginBottom: 10}}>
                    <Image source={require('../assets/decor/star.png')} style={{width: 114, height: 114, resizeMode: 'contain'}} />
                    <Text style={styles.title}>GET USED TO THE GOOD WITH US!</Text>
                </View>

                <View style={{flexGrow: 1}} />

                {
                    habits.length > 0 && (
                        <View style={{width: '100%', alignItems: 'center'}}>
                            <Text style={[styles.subTitle, {marginBottom: 20, alignSelf: 'flex-start'}]}>PROGRESS:</Text>
                            <ScrollView style={{width: '100%', height: 120, marginBottom: 30}}>
                                {
                                    habits.map((habit, index) => (
                                        <View key={index} style={styles.card}>
                                            <ProgressBar stars={habit.stars} />
                                            <View style={{width: 150, marginLeft: 20}}>
                                                <Text style={styles.cardName} numberOfLines={1} ellipsizeMode='tail'>{habit.name}</Text>
                                                <Text style={styles.cardText}>to add a star for the day click the button</Text>
                                            </View>
                                            <TouchableOpacity style={styles.addBtn} onPress={() => updateHabitStars(index)}>
                                                <LinearGradient
                                                    colors={['#c1a257', '#fff8ca']}
                                                    style={styles.addBtn} 
                                                    start={{ x: 1, y: 0 }}
                                                    end={{ x: 0, y: 0 }}
                                                >
                                                    <View style={{width: 24, height: 24}}>
                                                        <Icons type={'plus'} />
                                                    </View>
                                                </LinearGradient>
                                            </TouchableOpacity>
                                        </View>
                                    ))
                                }
                            </ScrollView>
                        </View>
                    )
                }

                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('CreateHabitScreen')}>
                    <ImageBackground source={require('../assets/buttons/left.png')} style={{width: '100%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={styles.btnText}>Create a habit</Text>
                        <View style={{width: 27, height: 27, marginLeft: 15}}>
                            <Icons type={'plus'} />
                        </View>
                    </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('HabitsListScreen')}>
                    <ImageBackground source={require('../assets/buttons/left.png')} style={{width: '100%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={styles.btnText}>List of habits</Text>
                        <View style={{width: 27, height: 27, marginLeft: 15}}>
                            <Icons type={'list'} />
                        </View>
                    </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('SaveStarScreen')}>
                    <ImageBackground source={require('../assets/buttons/left.png')} style={{width: '100%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={styles.btnText}>Save the star</Text>
                        <View style={{width: 27, height: 27, marginLeft: 15}}>
                            <Icons type={'game'} />
                        </View>
                    </ImageBackground>
                </TouchableOpacity>

                {isModalVisible && (
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={isModalVisible}
                        onRequestClose={handleCloseModal}
                    >
                        <View style={styles.modalContainer}>
                            <BlurView style={styles.blurBackground} blurType="dark" blurAmount={4} />
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>{createdHabit}</Text>
                                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ width: 24, height: 24, marginRight: 5 }}>
                                        <Icons type={'selected'} light />
                                    </View>
                                    <Text style={styles.modalText}>Habit successfully created</Text>
                                </View>
                            </View>
                        </View>
                    </Modal>
                )}

                </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        padding: 25,
        paddingTop: height * 0.07
    },

    title: {
        fontWeight: '700',
        fontSize: 24,
        color: '#fff',
        lineHeight: 29.05,
        width: '63%'
    },

    subTitle: {
        fontWeight: '500',
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
        marginBottom: height * 0.06,
        lineHeight: 24.2
    },

    btn: {
        width: '100%',
        height: height * 0.13,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 13
    },

    btnText: {
        fontWeight: '500',
        fontSize: 24,
        color: '#241b03',
        lineHeight: 29
    },

    modalContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 100,
        zIndex: 1,
    },

    blurBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
    },

    modalContent: {
        backgroundColor: '#000',
        borderWidth: 1,
        borderColor: '#8a650d',
        paddingHorizontal: 30,
        paddingVertical: 34,
        borderRadius: 15,
        width: '85%',
        zIndex: 2,
        alignItems: 'center'
    },

    modalTitle: {
        fontWeight: '500',
        fontSize: 26,
        color: '#fff',
        lineHeight: 31.5,
        marginBottom: 32,
        textAlign: 'center'
      },

      modalText: {
        fontWeight: '400',
        fontSize: 15,
        color: '#fff8ca',
        lineHeight: 18.15,
      },

      card: {
        width: '100%',
        padding: 18,
        borderWidth: 1,
        borderColor: '#8a650d',
        backgroundColor: 'rgba(36, 27, 3, 0.6)',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'space-between'
      },

      cardName: {
        width: '100%',
        fontWeight: '500',
        fontSize: 18,
        color: '#fff',
        lineHeight: 21.8,
        marginBottom: 17
      },

      cardText: {
        fontWeight: '400',
        fontSize: 14,
        color: '#fff',
        lineHeight: 17,
      },

      addBtn: {
        width: 60,
        height: 43,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end'
      }

});

export default Home;