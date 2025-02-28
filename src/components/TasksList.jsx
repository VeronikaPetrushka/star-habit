import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Modal, ScrollView, TextInput } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { BlurView } from '@react-native-community/blur';
import Progress from './Progress';
import Icons from "./Icons";

const { height } = Dimensions.get('window');

const TasksList = ({ taskName }) => {
    const navigation = useNavigation();
    const [mv, setMV] = useState(false);
    const [editedTask, setEditedTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

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

    const handleDelete = async (name) => {
        try {
          const storedTasks = await AsyncStorage.getItem('tasks');
          if (storedTasks) {
            const tasksArray = JSON.parse(storedTasks);
            const updatedTasks = tasksArray.filter(task => task.name !== name);
            await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
            setTasks(updatedTasks);
          }
        } catch (error) {
          console.log('Error deleting task from AsyncStorage:', error);
        }
      };   
      
    const filteredTasks = tasks.filter(i => 
        i.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        if (taskName) {
          setEditedTask(taskName);
          setMV(true);

          const timer = setTimeout(() => {
            handleCloseModal();
          }, 3000);

          return () => clearTimeout(timer);
        }
      }, [taskName]);

    const handleCloseModal = () => {
        setMV(false);
        setEditedTask('');
    };

    return (
            <View style={styles.container}>

                <View style={{alignItems: 'center', flexDirection: 'row', marginBottom: height * 0.05, width: '100%'}}>
                    <TouchableOpacity style={{width: 47, height: 47, marginRight: 53}} onPress={() => navigation.navigate('TaskManagerScreen')}>
                        <Icons type={'back'} />
                    </TouchableOpacity>
                    <Text style={styles.title}>LIST OF TASKS</Text>
                </View>

                {
                    filteredTasks.length > 0 && (
                        <TextInput
                            style={styles.searchBar}
                            placeholder="Search tasks..."
                            placeholderTextColor="#999"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />    
                    )
                }

                {
                    filteredTasks.length > 0 ? (
                        <ScrollView style={{width: '100%'}}>
                            {
                                filteredTasks.map((task, index) => (
                                    <View key={index} style={styles.card}>
                                        <View style={{width: '100%', alignItems: 'flex-start', flexDirection: 'row', marginBottom: 34}}>
                                            <Progress stars={task.stars} />
                                            <View style={{marginLeft: 20, width: '70%'}}>
                                                <Text style={styles.cardName} numberOfLines={1} ellipsizeMode='tail'>{task.name}</Text>
                                                <Text style={styles.cardText}>Execution frequency: {task.frequency}</Text>
                                            </View>
                                        </View>
                                        <View style={{width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <TouchableOpacity style={styles.btn} onPress={() => handleDelete(task.name)}>
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
                                            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('CreateTaskScreen', {taskToEdit: task})}>
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
                        <Text style={styles.noText}>There are no tasks right now</Text>
                    )
                }
            </View>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        padding: 25,
        paddingTop: height * 0.07,
        backgroundColor: '#1b18fd'
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

export default TasksList;