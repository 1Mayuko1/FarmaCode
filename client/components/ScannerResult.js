import React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {BtnTheme, colors} from "../constants/helpers";
import {code32Symbols} from "../constants/utils/consts";
import {Button} from "react-native-elements";

const ScannerResult = ({ route, navigation }) => {

    const { scanData } = route.params

    const goToMainPage = () => {
        navigation.navigate('Scanner');
    }

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
        return console.log('scanData undef')
    }

    let startNumber = decode(scanData).toString().slice(0, -1)

    console.log('scanData', scanData)
    console.log('decode(scanData)', decode(scanData))

    let keyNumber = (num) => {
        if (num.length < 1) return null

        let arr = num.split('')

        let newArr = []
        arr.map((el, index) => {
            if (index % 2 > 0) {
                if (el * 2 >= 10) {
                    let sum = (el * 2).toString().split('')
                    return newArr.push(sum)
                } else {
                    return newArr.push(el * 2)
                }
            } else {
                return newArr.push(el)
            }
        })

        let res = 0
        newArr.flat(1).map(el => {
            return res += +el
        })

        return res % 10
    }

    // Послідовність символів ШК Code

    let numbersArray = []
    let symbolsSequence = (sequence) => {
        if (sequence.length < 1) return null

        let data = sequence + keyNumber(startNumber).toString()

        let resSequence = []
        let iterationNumber = +data

        for (let i = 0; i < 6; i++) {
            if(i === 0) {
                let symbol = (iterationNumber - Math.floor((iterationNumber / 32)) * 32).toString()
                resSequence.push(symbol)
                iterationNumber = Math.floor((iterationNumber / 32))
            } else {
                let symbol = (iterationNumber - Math.floor((iterationNumber / 32)) * 32).toString()
                resSequence.push(symbol)
                iterationNumber = Math.floor((iterationNumber / 32))
            }
        }

        let coddedArray = resSequence.map(el => {
            return Object.keys(code32Symbols).find(key => code32Symbols[key] === +el)
        })

        numbersArray = resSequence
        return coddedArray.reverse()
    }

    symbolsSequence(startNumber)

    const Info = () => {
        return (
            <View style={styles.infoTxtContainer}>
                <View style={styles.infoTxtBlock}>
                    <Text style={styles.infoTxt}>Декодована послідовність:</Text>
                    <Text style={styles.infoRes}>{startNumber}</Text>
                </View>
                <View style={styles.infoTxtBlockKeyNumber}>
                    <Text style={styles.infoTxt}>Контрольна цифра - </Text>
                    <Text style={styles.infoResKeyNumber}>{keyNumber(startNumber)}</Text>
                </View>
                <View style={styles.infoTxtBlock}>
                    <Text style={styles.infoTxt}>Вихідна послідовність</Text>
                    <Text style={styles.infoRes}>{startNumber + keyNumber(startNumber).toString()}</Text>
                </View>
                <View style={styles.infoTxtBlock}>
                    <Text style={styles.infoTxt}>Послідовність з контрольною цифрою</Text>
                    <Text style={styles.infoRes}>{numbersArray.reverse().join(' ')}</Text>
                </View>
            </View>
        )
    }

    const goToBarcodeItemInfo = () => {
        navigation.navigate('BarcodeItemInfo', {
            barcodeNumber: startNumber,
        });
    }

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.h1Text}>Результат сканування</Text>
            <Text style={styles.h2Text}>{scanData}</Text>
            <View style={styles.infoContainer}>
                <Info />
            </View>
            <View style={styles.goToMainPageBtnContainer}>
                <Button
                    title='Про товар'
                    buttonStyle={{backgroundColor: colors.wildBlue, borderRadius: 10}}
                    containerStyle={{ width: 200, marginBottom: 25}}
                    titleStyle={{ fontWeight: 'bold', color: colors.beige}}
                    onPress={goToBarcodeItemInfo}
                    theme={BtnTheme}
                />
            </View>
            <View style={styles.goToMainPageBtnContainer}>
                <Button
                    title='На головну'
                    buttonStyle={{backgroundColor: colors.pastelGray, borderRadius: 10}}
                    containerStyle={{ width: 200, marginBottom: 25}}
                    titleStyle={{ fontWeight: 'bold', color: colors.beige}}
                    onPress={goToMainPage}
                    theme={BtnTheme}
                />
            </View>
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
        marginTop: 10,
        fontSize: 30,
        textAlign: 'center',
        alignSelf: 'center',
    },
    infoContainer: {
        marginTop: 10
    },
    infoTxtContainer: {
        marginTop: 10,
        alignSelf: 'center',
    },
    infoTxtBlock: {
        marginTop: 20,
    },
    infoTxtBlockKeyNumber: {
        marginTop: 20,
        alignSelf: 'center',
        flexDirection: 'row'
    },
    infoResKeyNumber: {
        fontWeight: 'bold',
        fontSize: 17,
        marginTop: 1,
    },
    infoTxt: {
        textAlign: 'center',
        fontSize: 17,
    },
    infoRes: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 17,
        marginTop: 3,
    },
    goToMainPageBtnContainer: {
        marginTop: 30,
        marginBottom: 5,
        alignSelf: 'center',
    }
});

export default ScannerResult
