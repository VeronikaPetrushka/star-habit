import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icons from "./Icons";

const { height } = Dimensions.get("window");

const images = [
    require("../assets/decor/star.png"),
    require("../assets/decor/sparkles.png"),
    require("../assets/decor/stars.png"),
];

const titles = [
    "Welcome to Star Leap",
    "Add habits and track progress!",
    "Choose a goal and get started!",
];

const subtitles = [
    "– the habit tracker that motivates you to shine!",
    "The more stars, the better your progress!",
    "",
];

const buttonTexts = ["Next", "Continue", "Start"];

const Welcome = () => {
    const navigation = useNavigation();
    const [step, setStep] = useState(0);

    const handleNext = () => {
        if (step === 2) {
            navigation.navigate("HMScreen");
        } else {
            setStep((prev) => prev + 1);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={images[step]} style={[styles.image, { height: height * (step === 1 ? 0.59 : step === 2 ? 0.52 : 0.38), resizeMode: step === 0 ? 'contain' : 'cover', marginTop: step === 0 ? height * 0.07 : 0}]} />
            
            <View style={styles.infoContainer}>
                <Text style={styles.title}>
                    {titles[step].split("Star Leap").map((part, index) =>
                        index === 1 ? <Text key={index} style={styles.highlight}>Star Leap</Text> : part
                    )}
                </Text>
                
                {subtitles[step] !== "" && <Text style={styles.text}>{subtitles[step]}</Text>}

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleNext}>
                        <Image source={require("../assets/buttons/left.png")} style={styles.buttonImage} />
                        <Text style={styles.buttonText}>{buttonTexts[step]}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.rightButton]} onPress={handleNext}>
                        <Image source={require("../assets/buttons/right.png")} style={styles.buttonImage} />
                        <View style={styles.iconWrapper}>
                            <Icons type={step === 2 ? "rocket" : "next"} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#000",
    },

    image: {
        width: "100%",
    },

    infoContainer: {
        width: "100%",
        padding: 16,
        alignItems: "center",
        paddingBottom: 30,
    },

    title: {
        fontWeight: "500",
        fontSize: 32,
        color: "#fff",
        textAlign: "center",
        marginBottom: 10,
        lineHeight: 39,
    },

    highlight: {
        color: "#c1a257",
    },

    text: {
        fontWeight: "500",
        fontSize: 15,
        color: "#fff",
        marginBottom: height * 0.06,
        lineHeight: 18,
        textAlign: "center",
    },

    buttonContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: 50,
    },

    button: {
        width: 250,
        height: 99,
        alignItems: "center",
        justifyContent: "center",
    },

    buttonImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },

    buttonText: {
        fontWeight: "500",
        fontSize: 24,
        color: "#241b03",
        position: "absolute",
        top: 35,
    },

    rightButton: {
        width: 111,
        height: 92,
        marginLeft: -20,
    },

    iconWrapper: {
        width: 49,
        height: 49,
        position: "absolute",
        top: 25,
        right: 20,
    },
    
});

export default Welcome;
