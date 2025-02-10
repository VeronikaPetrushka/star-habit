import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground, Dimensions, StyleSheet, Animated, Easing, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Icons from './Icons';

const { width, height } = Dimensions.get('window');

const items = [
    require('../assets/game/items/1.png'),
    require('../assets/game/items/2.png'),
    require('../assets/game/items/3.png'),
    require('../assets/game/items/4.png'),
    require('../assets/game/items/5.png'),
];
const starImage = require('../assets/game/star.png');

const Game = () => {
    const navigation = useNavigation();
    const [score, setScore] = useState(0);
    const [hp, setHp] = useState(100);
    const [basketX, setBasketX] = useState(width / 2 - 86);
    const basketWidth = 172;

    const basketXRef = useRef(basketX);
    const isStarRef = useRef(false); 
    const hpRef = useRef(100); 

    const fallingItemY = useRef(new Animated.Value(0)).current;
    const fallingItemX = useRef(new Animated.Value(Math.random() * (width - 50))).current;

    useEffect(() => {
        startItemFall();
    }, []);

    useEffect(() => {
        hpRef.current = hp;
    }, [hp]);

    const startItemFall = () => {
        isStarRef.current = Math.random() < 0.3;
        fallingItemX.setValue(Math.random() * (width - 50));
        fallingItemY.setValue(0);
    
        Animated.timing(fallingItemY, {
            toValue: height - 310,
            duration: 4000,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(({ finished }) => {
            if (finished) handleItemReachBasket();
        });
    };    
    
    const handleItemReachBasket = () => {
        const itemX = fallingItemX.__getValue();
        const basketLeft = basketXRef.current;
        const basketRight = basketLeft + basketWidth;
    
        const withinBasket = itemX >= basketLeft && itemX <= basketRight;
    
        if (withinBasket) {
            if (isStarRef.current) {
                setScore(prev => prev + 1);
                setHp(prev => Math.min(prev + 30, 100));
            } else {
                setScore(prev => Math.max(prev - 1, 0));
                setHp(prev => Math.max(prev - 20, 0));
            }
        }

        console.log(hpRef.current)
    
        if (hpRef.current < 10) {
            Alert.alert("Game Over", `Final Score: ${score}`);
            navigation.navigate('HomeScreen');
        } else {
            startItemFall();
        }
    };
        
    const moveBasketLeft = () => {
        setBasketX(prev => {
            const newPos = prev - 30;
            basketXRef.current = newPos;
            return Math.max(newPos, 0);
        });
    };
    
    const moveBasketRight = () => {
        setBasketX(prev => {
            const newPos = prev + 30;
            basketXRef.current = newPos;
            return Math.min(newPos, width - basketWidth);
        });
    };    

    return (
        <ImageBackground source={require('../assets/game/back.png')} style={{ flex: 1, justifyContent: 'space-between' }} >

            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 16, paddingTop: height * 0.07 }}>
                <View style={styles.scoreContainer}>
                    <Text style={styles.scoreText}>SCORE: <Text style={styles.score}>{score}</Text></Text>
                </View>
                <TouchableOpacity style={styles.pauseBtn}>
                    <Icons type={'pause'} />
                </TouchableOpacity>
            </View>

            <Animated.Image
                source={isStarRef.current ? starImage : items[Math.floor(Math.random() * items.length)]}
                style={[styles.fallingItem, {
                    transform: [
                        { translateY: fallingItemY },
                        { translateX: fallingItemX }
                    ]
                }]}
            />

            <View style={{ width: '100%'}}>
                <TouchableOpacity>
                    <Image source={require('../assets/game/basket.png')} style={[styles.basket, { left: basketX }]} />
                </TouchableOpacity>

                <View style={styles.bottomContainer}>
                    <Text style={styles.hpText}>STAR HP: {hp}HP</Text>
                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.moveBtn} onPress={moveBasketLeft}>
                            <Icons type={'left'} />
                        </TouchableOpacity>
                        <Image source={require('../assets/game/star.png')} style={{ width: 116, height: 108, resizeMode: 'contain' }} />
                        <TouchableOpacity style={styles.moveBtn} onPress={moveBasketRight}>
                            <Icons type={'right'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    scoreContainer: {
        backgroundColor: '#fff8ca',
        borderRadius: 15,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },

    scoreText: {
        fontSize: 20,
        fontWeight: '500',
        color: '#8a650d',
    },

    score: {
        fontSize: 32,
        fontWeight: '500',
        color: '#8a650d',
    },

    pauseBtn: {
        backgroundColor: '#fff8ca',
        borderRadius: 15,
        paddingVertical: 19,
        paddingHorizontal: 16,
        width: 62,
        height: 62
    },

    basket: {
        width: 172,
        height: 62,
        resizeMode: 'contain',
        position: 'absolute',
        bottom: 20,
    },

    bottomContainer: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingVertical: 36,
        paddingHorizontal: 30
    },

    hpText: {
        fontSize: 17,
        fontWeight: '500',
        color: '#fff',
        lineHeight: 20.6,
        marginBottom: 27
    },

    moveBtn: {
        width: 78,
        height: 78,
        borderRadius: 100,
        padding: 21,
        backgroundColor: '#fff8ca',
    },

    fallingItem: {
        width: 50,
        height: 50,
        position: 'absolute',
        resizeMode: 'contain'
    }
});

export default Game;
