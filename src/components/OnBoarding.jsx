import React, { useState } from "react"
import { View, Text,TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native"
import { useNavigation } from "@react-navigation/native";
import Icons from './Icons';

const { height } = Dimensions.get('window');

const OnBoarding = () => {
    const navigation = useNavigation();
    const [componentIndex, setComponentIndex] = useState(0);


    const handleButtonPress = () => {
        setComponentIndex((prevIndex) => (prevIndex + 1) % 3);

        if(componentIndex === 2) {
            navigation.navigate('HomeScreen')
        }
    };

    return (
        <View style={styles.container}>

            {
                componentIndex === 0 && (
                    <Image source={require('../assets/decor/star.png')} style={{width: '100%', height: height * 0.38, resizeMode: 'contain', marginTop: height * 0.07}} />
                )
            }

            {
                componentIndex === 1 && (
                    <Image source={require('../assets/decor/sparkles.png')} style={{width: '100%', height: height * 0.59}} />
                )
            }

            {
                componentIndex === 2 && (
                    <Image source={require('../assets/decor/stars.png')} style={{width: '100%', height: height * 0.52}} />
                )
            }

            <View style={styles.infoContainer}>
                 
                {
                   componentIndex === 0 && (
                    <Text style={styles.title}>Welcome to <Text style={{color: '#c1a257'}}>Star Leap</Text></Text>
                   ) 
                }

                {
                   componentIndex === 2 && (
                    <Text style={styles.title}>Choose a goal and <Text style={{color: '#c1a257'}}>get started!</Text></Text>
                   ) 
                }

                <Text style={styles.text}>
                    {
                        componentIndex === 0 ? '– the habit tracker that motivates you to shine!'
                        : componentIndex === 1 ? 'Add habits and mark your progress with stars. The more stars, the better!' 
                        : ''
                    }
                </Text>

                <View style={{width: '100%', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row', marginBottom: 50}}>
                    <TouchableOpacity style={styles.btn} onPress={handleButtonPress}>
                        <Image source={require('../assets/buttons/left.png')} style={{width: '100%', height: '100%', resizeMode: 'contain'}} />
                        <Text style={styles.btnText}>{
                            componentIndex === 0 ? 'Next' : 
                            componentIndex === 1 ? 'Continue' :
                            'Start'
                        }</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, {width: 111, height: 92, marginLeft: -20}]} onPress={handleButtonPress}>
                        <Image source={require('../assets/buttons/right.png')} style={{width: '100%', height: '100%', resizeMode: 'contain'}} />
                        <View style={{width: 49, height: 49, position: 'absolute', top: 25, right: 20}}>
                            <Icons type={componentIndex === 3 ? 'rocket' : 'next'} />
                        </View>
                    </TouchableOpacity>
                </View>

            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#000'
    },

    infoContainer: {
        width: '100%',
        padding: 16,
        alignItems: 'center',
        paddingBottom: 30
    },

    title: {
        fontWeight: '500',
        fontSize: 32,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 10,
        lineHeight: 38.73
    },

    text: {
        fontWeight: '500',
        fontSize: 15,
        color: '#fff',
        marginBottom: height * 0.06,
        lineHeight: 18.15,
        textAlign: 'center'
    },

    btn: {
        width: 250,
        height: 99,
        alignItems: 'center',
        justifyContent: 'center',
    },

    btnText: {
        fontWeight: '500',
        fontSize: 24,
        color: '#241b03',
        lineHeight: 29,
        position: 'absolute',
        top: 35,
    },

})

export default OnBoarding;