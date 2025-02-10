import React, { useEffect, useState, useCallback } from 'react';
import { View, Text,TouchableOpacity, StyleSheet, Dimensions, Modal, ScrollView, TextInput } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { BlurView } from '@react-native-community/blur';
import ProgressBar from './ProgressBar';
import Icons from "./Icons";

const { height } = Dimensions.get('window');

const HabitsList = ({ habitName }) => {
    const navigation = useNavigation();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editedHabit, setEditedHabit] = useState('');
    const [habits, setHabits] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

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

    const handleDelete = async (name) => {
        try {
          const storedHabits = await AsyncStorage.getItem('habits');
          if (storedHabits) {
            const habitsArray = JSON.parse(storedHabits);
            const updatedHabits = habitsArray.filter(habit => habit.name !== name);
            await AsyncStorage.setItem('habits', JSON.stringify(updatedHabits));
            setHabits(updatedHabits);
          }
        } catch (error) {
          console.log('Error deleting habit from AsyncStorage:', error);
        }
      };   
      
    const filteredHabits = habits.filter(habit => 
        habit.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        if (habitName) {
          setEditedHabit(habitName);
          setIsModalVisible(true);

          const timer = setTimeout(() => {
            handleCloseModal();
          }, 3000);

          return () => clearTimeout(timer);
        }
      }, [habitName]);

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setEditedHabit('');
    };

    return (
        <View style={styles.container}>

            <View style={{alignItems: 'center', flexDirection: 'row', marginBottom: height * 0.05, width: '100%'}}>
                <TouchableOpacity style={{width: 47, height: 47, marginRight: 53}} onPress={() => navigation.navigate('HomeScreen')}>
                    <Icons type={'back'} />
                </TouchableOpacity>
                <Text style={styles.title}>LIST OF HABITS</Text>
            </View>

            {
                filteredHabits.length > 0 && (
                    <TextInput
                        style={styles.searchBar}
                        placeholder="Search habits..."
                        placeholderTextColor="#999"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />    
                )
            }

            {
                filteredHabits.length > 0 ? (
                    <ScrollView style={{width: '100%'}}>
                        {
                            filteredHabits.map((habit, index) => (
                                <View key={index} style={styles.card}>
                                    <View style={{width: '100%', alignItems: 'flex-star', flexDirection: 'row', marginBottom: 34}}>
                                        <ProgressBar stars={habit.stars} />
                                        <View style={{marginLeft: 20, width: '70%'}}>
                                            <Text style={styles.cardName} numberOfLines={1} ellipsizeMode='tail'>{habit.name}</Text>
                                            <Text style={styles.cardText}>Execution frequency: {habit.frequency}</Text>
                                        </View>
                                    </View>
                                    <View style={{width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <TouchableOpacity style={styles.btn} onPress={() => handleDelete(habit.name)}>
                                            <LinearGradient
                                                colors={['#c1a257', '#fff8ca']}
                                                style={styles.btn} 
                                                start={{ x: 1, y: 0 }}
                                                end={{ x: 0, y: 0 }}
                                            >
                                                <Text style={styles.btnText}>Delete</Text>
                                                <View style={{width: 24, height: 24, marginLeft: 15}}>
                                                    <Icons type={'delete'} />
                                                </View>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('CreateHabitScreen', {habitToEdit: habit})}>
                                            <LinearGradient
                                                colors={['#c1a257', '#fff8ca']}
                                                style={styles.btn} 
                                                start={{ x: 1, y: 0 }}
                                                end={{ x: 0, y: 0 }}
                                            >
                                                <Text style={styles.btnText}>Edit</Text>
                                                <View style={{width: 24, height: 24, marginLeft: 15}}>
                                                    <Icons type={'edit'} />
                                                </View>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))
                        }
                        <View style={{height: 100}} />
                    </ScrollView>
                ) : (
                    <Text style={styles.noText}>There is no habits right now</Text>
                )
            }

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
                            <Text style={styles.modalTitle}>{editedHabit}</Text>
                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ width: 24, height: 24, marginRight: 5 }}>
                                    <Icons type={'selected'} light />
                                </View>
                                <Text style={styles.modalText}>The habit has been edited</Text>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}

        </View>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#000',
        padding: 25,
        paddingTop: height * 0.07
    },

    title: {
        fontWeight: '500',
        fontSize: 20,
        color: '#fff',
        lineHeight: 24.2
    },

    searchBar: {
        width: '100%',
        padding: 22,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#8a650D',
        color: '#fff',
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 19.36,
        marginBottom: height * 0.04,
    },

    btn: {
        width: 137,
        height: 43,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        flexDirection: 'row',
    },

    btnText: {
        fontWeight: '500',
        fontSize: 16,
        color: '#241b03',
        lineHeight: 19.4
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
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#8a650d',
        alignItems: 'center',
        marginBottom: 10,
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
        borderRadius: 15,
        alignSelf: 'flex-end'
      },

      noText: {
        fontWeight: '400',
        fontSize: 17,
        color: '#969696',
        lineHeight: 17,
        marginVertical: 'auto'
      }

});

export default HabitsList;