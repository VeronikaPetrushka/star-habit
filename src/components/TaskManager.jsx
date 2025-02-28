import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, Modal, ScrollView, ImageBackground } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { BlurView } from '@react-native-community/blur';
import Progress from './Progress';
import Icons from "./Icons";

const { height } = Dimensions.get('window');

const TaskManager = ({ taskName }) => {
    const navigation = useNavigation();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [createdTask, setCreatedTask] = useState('');
    const [tasks, setTasks] = useState([]);

    const loadTasks = async () => {
        try {
            const storedTasks = await AsyncStorage.getItem('tasks');
            if (storedTasks) {
                setTasks(JSON.parse(storedTasks));
            }
        } catch (error) {
            console.log('Error loading tasks from AsyncStorage:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadTasks();
        }, [])
    );

    const updateTaskStars = async (index) => {
        try {
            const updatedTasks = [...tasks];
            updatedTasks[index].stars += 1;
            setTasks(updatedTasks);
    
            await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
        } catch (error) {
            console.log('Error updating task stars:', error);
        }
    };

    useEffect(() => {
        if (taskName) {
            setCreatedTask(taskName);
            setIsModalVisible(true);

            const timer = setTimeout(() => {
                handleCloseModal();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [taskName]);

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setCreatedTask('');
    };

    return (
        <View style={styling.container}>
            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'flex-start', marginBottom: 10 }}>
                <Image source={require('../assets/decor/star.png')} style={{ width: 114, height: 114, resizeMode: 'contain' }} />
                <Text style={styling.title}>GET USED TO THE GOOD WITH US!</Text>
            </View>

            <View style={{ flexGrow: 1 }} />

            {
                tasks.length > 0 && (
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <Text style={[styling.subTitle, { marginBottom: 20, alignSelf: 'flex-start' }]}>PROGRESS:</Text>
                        <ScrollView style={{ width: '100%', height: 120, marginBottom: 30 }}>
                            {
                                tasks.map((task, index) => (
                                    <View key={index} style={styling.card}>
                                        <Progress stars={task.stars} />
                                        <View style={{ width: 150, marginLeft: 20 }}>
                                            <Text style={styling.cardName} numberOfLines={1} ellipsizeMode='tail'>{task.name}</Text>
                                            <Text style={styling.cardText}>To add a star for the day, click the button</Text>
                                        </View>
                                        <TouchableOpacity style={styling.addBtn} onPress={() => updateTaskStars(index)}>
                                            <LinearGradient
                                                colors={['#c1a257', '#fff8ca']}
                                                style={styling.addBtn} 
                                                start={{ x: 1, y: 0 }}
                                                end={{ x: 0, y: 0 }}
                                            >
                                                <View style={{ width: 24, height: 24 }}>
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

            <TouchableOpacity style={styling.btn} onPress={() => navigation.navigate('CreateTaskScreen')}>
                <ImageBackground source={require('../assets/buttons/left.png')} style={{ width: '100%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styling.btnText}>Create a task</Text>
                    <View style={{ width: 27, height: 27, marginLeft: 15 }}>
                        <Icons type={'plus'} />
                    </View>
                </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity style={styling.btn} onPress={() => navigation.navigate('TasksListScreen')}>
                <ImageBackground source={require('../assets/buttons/left.png')} style={{ width: '100%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styling.btnText}>List of tasks</Text>
                    <View style={{ width: 27, height: 27, marginLeft: 15 }}>
                        <Icons type={'list'} />
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
                    <View style={styling.modalContainer}>
                        <BlurView style={styling.blurBackground} blurType="dark" blurAmount={4} />
                        <View style={styling.modalContent}>
                            <Text style={styling.modalTitle}>{createdTask}</Text>
                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ width: 24, height: 24, marginRight: 5 }}>
                                    <Icons type={'selected'} light />
                                </View>
                                <Text style={styling.modalText}>Task successfully created</Text>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}

        </View>
    )
};

const styling = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        padding: 25,
        paddingTop: height * 0.07,
        backgroundColor: '#1b18fd'
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
        backgroundColor: '#121093',
        borderWidth: 1,
        borderColor: '#8a650d',
        paddingHorizontal: 30,
        paddingVertical: 34,
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

export default TaskManager;