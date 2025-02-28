import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';
import Icons from './Icons';

const Progress = ({ stars }) => {
    const radius = 28;
    const strokeWidth = 8;
    const circumference = 2 * Math.PI * radius;
    const starLimit = 12;

    const percentageGoal = Math.min((stars / starLimit) * 100, 100);
    const offsetGoal = circumference - (percentageGoal / 100) * circumference;

    return (
        <View style={styles.container}>
            <Svg height={radius * 2 + strokeWidth} width={radius * 2 + strokeWidth}>
                <Circle
                    stroke="#fff8ca"
                    fill="none"
                    cx={radius + strokeWidth / 2}
                    cy={radius + strokeWidth / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                />
                <Circle
                    stroke="#8a650d"
                    fill="none"
                    cx={radius + strokeWidth / 2}
                    cy={radius + strokeWidth / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offsetGoal}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${radius + strokeWidth / 2} ${radius + strokeWidth / 2})`}
                />
                <SvgText
                    fill="#fff"
                    fontSize="15"
                    fontWeight="900"
                    x={radius + strokeWidth / 2 - 8}
                    y={radius + strokeWidth / 2}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    flexDirection="row"
                >
                    {stars}
                    <View style={{width: 15, height: 15, position: 'absolute', top: 22, left: 35}}>
                        <Icons type={'star'} />
                    </View>
                </SvgText>
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Progress;
