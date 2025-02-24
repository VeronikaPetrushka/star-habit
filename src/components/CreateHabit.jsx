import React, { useState } from "react";
import { View, Text,TouchableOpacity, StyleSheet, Dimensions, ScrollView, TextInput, ImageBackground } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from "@react-navigation/native";
import Icons from "./Icons";

const { height } = Dimensions.get('window');

const CreateHabit = ({ habitToEdit }) => {
    const navigation = useNavigation();
    const [habit, setHabit] = useState(habitToEdit?.name || '');
    const [selectedFrequency, setSelectedFrequency] = useState(habitToEdit?.frequency || null);
    const [stars, setStars] = useState(habitToEdit?.stars || 0);

    const handleSave = async () => {
        if (habit && selectedFrequency) {
          try {
            const newHabit = { name: habit, frequency: selectedFrequency, stars: stars };
            const existingHabits = JSON.parse(await AsyncStorage.getItem('habits')) || [];
      
            let updatedHabits;
            if (habitToEdit) {
              updatedHabits = existingHabits.map(h =>
                h.name === habitToEdit.name ? newHabit : h
              );
            } else {
              updatedHabits = [...existingHabits, newHabit];
            }
      
            await AsyncStorage.setItem('habits', JSON.stringify(updatedHabits));
            navigation.navigate( habitToEdit ? 'HabitsListScreen' : 'HMScreen', { habitName: habit });
          } catch (error) {
            console.error('Error saving habit:', error);
          }
        }
      };      

    return (
            <View style={styles.container}>

                <View style={{alignItems: 'center', marginBottom: height * 0.05, width: '100%', flexDirection: 'row'}}>
                    <TouchableOpacity style={{width: 47, height: 47, marginRight: 53}} onPress={() => navigation.goBack('')}>
                        <Icons type={'back'} />
                    </TouchableOpacity>
                    <Text style={[styles.label, {fontSize: 20, lineHeight: 24.2, marginBottom: 0}]}>{ habitToEdit ? 'EDIT A HABIT' : 'CREATE A HABIT'}</Text>
                </View>

                {/* <ScrollView style={{width: '100%'}}> */}
                    <Text style={styles.label}>HABIT NAME</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Type here..."
                        placeholderTextColor="#999"
                        value={habit}
                        onChangeText={setHabit}
                    />

                    <Text style={styles.label}>EXECUTION FREQUENCY</Text>

                    <TouchableOpacity 
                        style={[styles.button, selectedFrequency === 'Several times a day' && {backgroundColor: '#fff8ca'}]}
                        onPress={() => setSelectedFrequency('Several times a day')}
                        >
                        <Text style={[styles.buttonText, selectedFrequency === 'Several times a day' && {color: '#241b03'}]}>Several times a day</Text>
                        {
                            selectedFrequency === 'Several times a day' && (
                                <View style={{width: 24, height: 24, marginLeft: 15}}>
                                    <Icons type={'selected'} />
                                </View>
                            )
                        }
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.button, selectedFrequency === 'Daily' && {backgroundColor: '#fff8ca'}]}
                        onPress={() => setSelectedFrequency('Daily')}
                        >
                        <Text style={[styles.buttonText, selectedFrequency === 'Daily' && {color: '#241b03'}]}>Daily</Text>
                        {
                            selectedFrequency === 'Daily' && (
                                <View style={{width: 24, height: 24, marginLeft: 15}}>
                                    <Icons type={'selected'} />
                                </View>
                            )
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, selectedFrequency === 'Once a week' && {backgroundColor: '#fff8ca'}]}
                        onPress={() => setSelectedFrequency('Once a week')}
                        >
                        <Text style={[styles.buttonText, selectedFrequency === 'Once a week' && {color: '#241b03'}]}>Once a week</Text>
                        {
                            selectedFrequency === 'Once a week' && (
                                <View style={{width: 24, height: 24, marginLeft: 15}}>
                                    <Icons type={'selected'} />
                                </View>
                            )
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, selectedFrequency === 'Once a month' && {backgroundColor: '#fff8ca'}]}
                        onPress={() => setSelectedFrequency('Once a month')}
                        >
                        <Text style={[styles.buttonText, selectedFrequency === 'Once a month' && {color: '#241b03'}]}>Once a month</Text>
                        {
                            selectedFrequency === 'Once a month' && (
                                <View style={{width: 24, height: 24, marginLeft: 15}}>
                                    <Icons type={'selected'} />
                                </View>
                            )
                        }
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.btn} onPress={handleSave}>
                        <ImageBackground source={require('../assets/buttons/left.png')} style={{width: '100%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={styles.btnText}>Save habit</Text>
                        </ImageBackground>
                    </TouchableOpacity>

                    <View style={{height: 50}} />
                {/* </ScrollView> */}

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

    label: {
        fontWeight: '500',
        fontSize: 16,
        color: '#fff',
        marginBottom: 13,
        lineHeight: 19.36
    },

    input: {
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

    button: {
        width: '100%',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#8a650D',
        marginBottom: 12,
        flexDirection: 'row'
    },

    buttonText: {
        fontWeight: '500',
        fontSize: 24,
        color: '#fff',
        lineHeight: 29
    },

    btn: {
        width: '100%',
        height: 81,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },

    btnText: {
        fontWeight: '500',
        fontSize: 24,
        color: '#241b03',
        lineHeight: 29
    },

});

export default CreateHabit;