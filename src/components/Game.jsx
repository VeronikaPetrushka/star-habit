// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, TouchableOpacity, Image, ImageBackground, Dimensions, StyleSheet, Animated, Easing, Modal } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import { useNavigation } from "@react-navigation/native";
// import { BlurView } from '@react-native-community/blur';
// import Icons from './Icons';

// const { width, height } = Dimensions.get('window');

// const items = [
//     require('../assets/game/items/1.png'),
//     require('../assets/game/items/2.png'),
//     require('../assets/game/items/3.png'),
//     require('../assets/game/items/4.png'),
//     require('../assets/game/items/5.png'),
// ];
// const starImage = require('../assets/game/star.png');

// const Game = () => {
//     const navigation = useNavigation();
//     const [score, setScore] = useState(0);
//     const [hp, setHp] = useState(100);
//     const [basketX, setBasketX] = useState(width / 2 - 86);
//     const basketWidth = 172;

//     const basketXRef = useRef(basketX);
//     const isStarRef = useRef(false); 
//     const hpRef = useRef(100); 

//     const fallingItemY = useRef(new Animated.Value(0)).current;
//     const fallingItemX = useRef(new Animated.Value(Math.random() * (width - 50))).current;

//     const [pauseModalVisible, setPauseModalVisible] = useState(false);
//     const [isPaused, setIsPaused] = useState(false);
//     const [finishModalVisible, setFinishModalVisible] = useState(false);

//     useEffect(() => {
//         startItemFall();
//     }, []);

//     useEffect(() => {
//         hpRef.current = hp;
//     }, [hp]);

//     const startItemFall = () => {
//         if (isPaused) return;

//         isStarRef.current = Math.random() < 0.3;
//         fallingItemX.setValue(Math.random() * (width - 50));
//         fallingItemY.setValue(0);
    
//         Animated.timing(fallingItemY, {
//             toValue: height - 310,
//             duration: 2000,
//             easing: Easing.linear,
//             useNativeDriver: true,
//         }).start(({ finished }) => {
//             if (finished) handleItemReachBasket();
//         });    
//     }; 

//     const handleItemReachBasket = () => {
//         const itemX = fallingItemX.__getValue();
//         const basketLeft = basketXRef.current;
//         const basketRight = basketLeft + basketWidth;
    
//         const withinBasket = itemX >= basketLeft && itemX <= basketRight;
    
//         if (withinBasket) {
//             if (isStarRef.current) {
//                 setScore(prev => prev + 1);
//                 setHp(prev => Math.min(prev + 30, 100));
//             } else {
//                 setScore(prev => Math.max(prev - 1, 0));
//                 setHp(prev => Math.max(prev - 20, 0));
//             }
//         }

//         console.log(hpRef.current)
    
//         if (hpRef.current < 10) {
//             setFinishModalVisible(true);
//         } else {
//             startItemFall();
//         }
//     };
        
//     const moveBasketLeft = () => {
//         setBasketX(prev => {
//             const newPos = prev - 30;
//             basketXRef.current = newPos;
//             return Math.max(newPos, 0);
//         });
//     };
    
//     const moveBasketRight = () => {
//         setBasketX(prev => {
//             const newPos = prev + 30;
//             basketXRef.current = newPos;
//             return Math.min(newPos, width - basketWidth);
//         });
//     };  

//     const handlePause = () => {
//         setPauseModalVisible(true);
//         setIsPaused(true);
//     };

//     const handleResume = () => {
//         setPauseModalVisible(false);
//         setIsPaused(false);
//     }

//     const handleTryAgain = () => {
//         setFinishModalVisible(false);
//         setPauseModalVisible(false);
//         setIsPaused(false);
//         setScore(0);
//         setHp(100);
//         setBasketX(width / 2 - 86);
//         startItemFall();
//     };
    
//     const handleBack = () => {
//         setFinishModalVisible(false);
//         setPauseModalVisible(false);
//         setIsPaused(false);
//         setScore(0);
//         setHp(100);
//         setBasketX(width / 2 - 86);
//         navigation.navigate('HomeScreen');
//     };

//     return (
//         <ImageBackground source={require('../assets/game/back.png')} style={{ flex: 1, justifyContent: 'space-between' }} >

//             <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 16, paddingTop: height * 0.07 }}>
//                 <View style={styles.scoreContainer}>
//                     <Text style={styles.scoreText}>SCORE: <Text style={styles.score}>{score}</Text></Text>
//                 </View>
//                 <TouchableOpacity style={styles.pauseBtn} onPress={handlePause}>
//                     <Icons type={'pause'} />
//                 </TouchableOpacity>
//             </View>

//             <Animated.Image
//                 source={isStarRef.current ? starImage : items[Math.floor(Math.random() * items.length)]}
//                 style={[styles.fallingItem, {
//                     transform: [
//                         { translateY: fallingItemY },
//                         { translateX: fallingItemX }
//                     ]
//                 }]}
//             />

//             <View style={{ width: '100%'}}>
//                 <TouchableOpacity>
//                     <Image source={require('../assets/game/basket.png')} style={[styles.basket, { left: basketX }]} />
//                 </TouchableOpacity>

//                 <View style={styles.bottomContainer}>
//                     <Text style={styles.hpText}>STAR HP: {hp}HP</Text>
//                     <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
//                         <TouchableOpacity style={styles.moveBtn} onPress={moveBasketLeft}>
//                             <Icons type={'left'} />
//                         </TouchableOpacity>
//                         <Image source={require('../assets/game/star.png')} style={{ width: 116, height: 108, resizeMode: 'contain' }} />
//                         <TouchableOpacity style={styles.moveBtn} onPress={moveBasketRight}>
//                             <Icons type={'right'} />
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </View>

//             <Modal
//                 animationType="fade"
//                 transparent={true}
//                 visible={pauseModalVisible}
//                 onRequestClose={() => setPauseModalVisible(false)}
//             >
//                 <View style={styles.modalContainer}>
//                     <BlurView style={styles.blurBackground} blurType="dark" blurAmount={4} />
//                     <View style={styles.modalContent}>
//                         <Text style={styles.modalTitle}>PAUSE</Text>
//                         <TouchableOpacity style={styles.addBtn} onPress={handleResume}>
//                             <LinearGradient
//                                 colors={['#c1a257', '#fff8ca']}
//                                 style={styles.btn} 
//                                 start={{ x: 1, y: 0 }}
//                                 end={{ x: 0, y: 0 }}
//                             >
//                                 <Text style={styles.btnText}>Resume</Text>
//                             </LinearGradient>
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={handleBack}>
//                         <Text style={{ color: '#8a650d', fontSize: 17, alignSelf: 'center', marginTop: 10}}>BACK HOME</Text>
//                     </TouchableOpacity>
//                     </View>
//                 </View>
//             </Modal>

//             {finishModalVisible && (
//                 <Modal
//                     animationType="fade"
//                     transparent={true}
//                     visible={finishModalVisible}
//                     onRequestClose={() => setFinishModalVisible(false)}
//                 >
//                     <View style={styles.modalContainer}>
//                         <BlurView style={styles.blurBackground} blurType="dark" blurAmount={4} />
//                         <View style={styles.modalContent}>
//                             <Text style={styles.modalTitle}>THE STAR HAS GONE OUT!</Text>
//                             <Text style={styles.modalText}>Your score: {score}</Text>
//                             <TouchableOpacity style={styles.addBtn} onPress={handleTryAgain}>
//                                 <LinearGradient
//                                     colors={['#c1a257', '#fff8ca']}
//                                     style={styles.btn} 
//                                     start={{ x: 1, y: 0 }}
//                                     end={{ x: 0, y: 0 }}
//                                 >
//                                     <Text style={styles.btnText}>Restart</Text>
//                                 </LinearGradient>
//                             </TouchableOpacity>
//                             <TouchableOpacity onPress={handleBack}>
//                             <Text style={{ color: '#8a650d', fontSize: 17, alignSelf: 'center', marginTop: 10}}>BACK HOME</Text>
//                         </TouchableOpacity>
//                         </View>
//                     </View>
//                 </Modal>
//             )}

//         </ImageBackground>
//     );
// };

// const styles = StyleSheet.create({
//     scoreContainer: {
//         backgroundColor: '#fff8ca',
//         borderRadius: 15,
//         paddingVertical: 12,
//         paddingHorizontal: 16,
//     },

//     scoreText: {
//         fontSize: 20,
//         fontWeight: '500',
//         color: '#8a650d',
//     },

//     score: {
//         fontSize: 32,
//         fontWeight: '500',
//         color: '#8a650d',
//     },

//     pauseBtn: {
//         backgroundColor: '#fff8ca',
//         borderRadius: 15,
//         paddingVertical: 19,
//         paddingHorizontal: 16,
//         width: 62,
//         height: 62
//     },

//     basket: {
//         width: 172,
//         height: 62,
//         resizeMode: 'contain',
//         position: 'absolute',
//         bottom: 20,
//     },

//     bottomContainer: {
//         width: '100%',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//         paddingVertical: 36,
//         paddingHorizontal: 30
//     },

//     hpText: {
//         fontSize: 17,
//         fontWeight: '500',
//         color: '#fff',
//         lineHeight: 20.6,
//         marginBottom: 27
//     },

//     moveBtn: {
//         width: 78,
//         height: 78,
//         borderRadius: 100,
//         padding: 21,
//         backgroundColor: '#fff8ca',
//     },

//     fallingItem: {
//         width: 50,
//         height: 50,
//         position: 'absolute',
//         resizeMode: 'contain'
//     },

//     modalContainer: {
//         flex: 1,
//         alignItems: 'center',
//         paddingTop: 100,
//         zIndex: 1,
//     },

//     blurBackground: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         zIndex: 1,
//     },

//     modalContent: {
//         backgroundColor: '#000',
//         borderWidth: 1,
//         borderColor: '#8a650d',
//         paddingHorizontal: 64,
//         paddingVertical: 53,
//         borderRadius: 15,
//         width: '85%',
//         zIndex: 2,
//     },

//     modalTitle: {
//         fontWeight: '500',
//         fontSize: 26,
//         color: '#fff',
//         lineHeight: 31.5,
//         marginBottom: 46,
//         textAlign: 'center'
//       },

//       modalText: {
//         fontWeight: '400',
//         fontSize: 20,
//         color: '#fff',
//         lineHeight: 24.2,
//         marginBottom: 60,
//         textAlign: 'center'
//       },

//       btn: {
//         width: '100%',
//         height: height * 0.081,
//         alignItems: 'center',
//         justifyContent: 'center',
//         flexDirection: 'row',
//         marginBottom: 13
//     },

//     btnText: {
//         fontWeight: '500',
//         fontSize: 24,
//         color: '#241b03',
//         lineHeight: 29
//     },

// });

// export default Game;
