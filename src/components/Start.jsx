import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icons from "./Icons";

const { height } = Dimensions.get("window");

const imgs = [
    require("../assets/decor/star.png"),
    require("../assets/decor/sparkles.png"),
    require("../assets/decor/stars.png"),
];

const ttls = [
    "Welcome to Starry Flows",
    "Add tasks and track progress!",
    "Choose a goal and get started!",
];

const subttls = [
    "– the task tracker that motivates you to shine!",
    "The more stars, the better your progress!",
    "",
];

const btnsTxt = ["Next", "Continue", "Start"];

const Start = () => {
    const navigation = useNavigation();
    const [step, setStep] = useState(0);

    const handleNext = () => {
        if (step === 2) {
            navigation.navigate("TaskManagerScreen");
        } else {
            setStep((prev) => prev + 1);
        }
    };

    return (
        <View style={styling.container}>
            <Image source={imgs[step]} style={[styling.image, { height: height * (step === 1 ? 0.59 : step === 2 ? 0.52 : 0.38), resizeMode: step === 0 ? 'contain' : 'cover', marginTop: step === 0 ? height * 0.07 : 0}]} />
            
            <View style={styling.infoContainer}>
                <Text style={styling.title}>
                    {ttls[step].split("Starry Flows").map((part, index) =>
                        index === 1 ? <Text key={index} style={styling.highlight}>Starry Flows</Text> : part
                    )}
                </Text>
                
                {subttls[step] !== "" && <Text style={styling.text}>{subttls[step]}</Text>}

                <View style={styling.btnsContainer}>
                    <TouchableOpacity style={styling.btn} onPress={handleNext}>
                        <Image source={require("../assets/buttons/left.png")} style={styling.btnImg} />
                        <Text style={styling.btnText}>{btnsTxt[step]}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styling.btn, styling.rightBtn]} onPress={handleNext}>
                        <Image source={require("../assets/buttons/right.png")} style={styling.btnImg} />
                        <View style={styling.icon}>
                            <Icons type={step === 2 ? "rocket" : "next"} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styling = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#1b18fd",
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

    btnsContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: 50,
    },

    btn: {
        width: 250,
        height: 99,
        alignItems: "center",
        justifyContent: "center",
    },

    btnImg: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },

    btnText: {
        fontWeight: "500",
        fontSize: 24,
        color: "#241b03",
        position: "absolute",
        top: 35,
    },

    rightBtn: {
        width: 111,
        height: 92,
        marginLeft: -20,
    },

    icon: {
        width: 49,
        height: 49,
        position: "absolute",
        top: 25,
        right: 20,
    },
    
});

export default Start;
