import React, { useState } from 'react';
import { View, Text,TouchableOpacity, Image, StyleSheet, Dimensions, Modal, ImageBackground } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { BlurView } from '@react-native-community/blur';
import Icons from "./Icons";

const { height } = Dimensions.get('window');

const SaveStar = () => {
    const navigation = useNavigation();
    const [isModalVisible, setIsModalVisible] = useState(false);

    return (
        <ImageBackground source={require('../assets/loader.png')} style={{flex: 1}}>
            <View style={styles.container}>

                <Image source={require('../assets/decor/star.png')} style={styles.image} />
                <Text style={styles.title}>SAVE THE STAR</Text>

                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('GameScreen')}>
                    <ImageBackground source={require('../assets/buttons/left.png')} style={{width: '100%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={styles.btnText}>Start play</Text>
                        <View style={{width: 27, height: 27, marginLeft: 15}}>
                            <Icons type={'game'} />
                        </View>
                    </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => setIsModalVisible(true)}>
                    <ImageBackground source={require('../assets/buttons/left.png')} style={{width: '100%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={styles.btnText}>How to play</Text>
                        <View style={{width: 27, height: 27, marginLeft: 15}}>
                            <Icons type={'dots'} />
                        </View>
                    </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.goBack('')}>
                    <Text style={{fontSize: 24, fontWeight: '500', color: '#fff', marginTop: 20}}>Back home</Text>
                </TouchableOpacity>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={() => setIsModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <BlurView style={styles.blurBackground} blurType="dark" blurAmount={4} />
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>How to play</Text>
                            <Text style={styles.modalText}>- Move the net to catch rocks and space junk.</Text>
                            <Text style={styles.modalText}>- Don't let them fall on the star!</Text>
                            <Text style={styles.modalText}>- The longer you protect the star, the more points you get!</Text>

                            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                                <Text style={{ color: '#8a650d', fontSize: 17, alignSelf: 'center', marginTop: 10}}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

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

    image: {
        width: 244,
        height: 244,
        resizeMode: 'contain',
        marginBottom: 15
    },

    title: {
        fontWeight: '500',
        fontSize: 32,
        color: '#c1a257',
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 38.73
    },

    btn: {
        width: '100%',
        height: height * 0.13,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        flexDirection: 'row',
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
        width: '85%',
        zIndex: 2,
    },

    modalTitle: {
        fontWeight: '500',
        fontSize: 26,
        color: '#fff',
        lineHeight: 31.5,
        marginBottom: 20,
        textAlign: 'center'
      },

      modalText: {
        fontWeight: '400',
        fontSize: 15,
        color: '#fff8ca',
        lineHeight: 18.15,
        marginBottom: 7,
      },

      card: {
        width: '100%',
        padding: 18,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#8a650d',
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
        borderRadius: 15,
        alignSelf: 'flex-end'
      }

});

export default SaveStar;