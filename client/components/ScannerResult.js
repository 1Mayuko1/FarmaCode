import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {colors} from "../constants/helpers";
import {code32Symbols} from "../constants/utils/consts";

const ScannerResult = ({ route, navigation }) => {
    const { type, scanData } = route.params

    let decode = (code) => {

        let resArr = []
        let codedLetters = []
        let arr = code.split('')

        arr.map(el => {
            Object.keys(code32Symbols).map(value => {
                if (value === el) {
                    codedLetters = [...codedLetters, code32Symbols[el]]
                }
            })
        })

        codedLetters.reverse()

        for (let i = 0; i < 6; i++) {
            resArr = [...resArr, codedLetters[i] * 32 ** i]
        }

        let decodedNumber = 0
        resArr.map(value => {
            decodedNumber += value
        })

        if (decodedNumber.toString().length <= 8) {
            let sliced = decodedNumber.toString()
            return '0' + sliced
        }

        return decodedNumber
    }

    if (!scanData) {
        return null
    } else {
        decode(scanData)
    }

    console.log('scanData', scanData)
    console.log('decode(scanData)', decode(scanData))

    return (
        <View style={styles.mainContainer}>
            {/*<Text style={styles.h1Text}>Тип отриманого коду: {type}</Text>*/}
            {/*<Text style={styles.h2Text}>Декодований Код: {decode(scanData)}</Text>*/}
            <Text style={styles.h2Text}>Декодований Код:</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: colors.beige,
        height: Dimensions.get('screen').height,
    },
    h1Text: {
        marginTop: 100,
        fontSize: 30,
        textAlign: 'center',
        alignSelf: 'center',
    },
    h2Text: {
        marginTop: 30,
        fontSize: 30,
        textAlign: 'center',
        alignSelf: 'center',
    },
});

export default ScannerResult
