import React, {useState} from 'react'
import {
    binaryDecode,
    code32Symbols,
    numberInBinary9,
} from "../constants/utils/consts";
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {BtnTheme, colors} from "../constants/helpers";
import {Button, Overlay} from "react-native-elements";


const Painter = ({startNumber}) => {

    // console.log('startNumber -', startNumber)
    // Обчислення контрольної цифри C

    const [modalVisible, setModalVisible] = useState(false)

    const toggleModalOverlay = () => {
        setModalVisible(!modalVisible)
    }

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

        // console.log('2. Контрольна цифра -', (res % 10).toString())
        return res % 10
    }

    // Послідовність символів ШК Code

    let numbersArray = []
    let symbolsSequence = (sequence) => {
        if (sequence.length < 1) return null

        let data = sequence + keyNumber(startNumber).toString()
        // console.log('3. Вихідна послідовність -', data)

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

        // let coddedArray = resSequence.map(el => {
        //     return Object.keys(code39Symbols).find(key => code39Symbols[key] === +el)
        // })

        numbersArray = resSequence

        // console.log('4. Послідовність символів ШК Code 32 -', coddedArray.reverse().join(''))
        // console.log('5. Послідовність з контрольною цифрою -', resSequence.join(' '))
        return coddedArray.reverse()
    }

    keyNumber(startNumber)

    let codedLetters = symbolsSequence(startNumber)
    let codedNumbers = binaryDecode(numberInBinary9, codedLetters).reverse()


    let strokes = codedNumbers.map(el => el[1]).map(num => {
        return num + '0'
    })

    const barcode = strokes.reverse().map(stroke => {
        return stroke.split('').map((el, id) => {
            if (el === '1') {
                return <View key={id} style={styles.blackColumn}/>
            } else {
                return <View key={id} style={styles.whiteColumn}/>
            }
        })
    })

    const Info = () => {
        return (
            <View style={styles.infoTxtContainer}>
                <View style={styles.infoTxtBlock}>
                    <Text style={styles.infoTxt}>Початкова послідовність</Text>
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
                    <Text style={styles.infoTxt}>Послідовність симлоів ШК Code32</Text>
                    <Text style={styles.infoRes}>{symbolsSequence(startNumber)}</Text>
                </View>
                <View style={styles.infoTxtBlock}>
                    <Text style={styles.infoTxt}>Послідовність з контрольною цифрою</Text>
                    <Text style={styles.infoRes}>{numbersArray.reverse().join(' ')}</Text>
                </View>
            </View>
        )
    }

    return (
        <View>
            <View className="barcode">
                <View style={styles.barcodeContainer}>
                    <View style={styles.barCode}>
                        {barcode}
                    </View>
                    <Text style={styles.barcodeTxt}>A{startNumber + keyNumber(startNumber).toString()}</Text>
                </View>
            </View>
            <Overlay
                isVisible={modalVisible}
                onBackdropPress={toggleModalOverlay}
                overlayStyle={{backgroundColor: colors.beige, borderRadius: 15}}
            >
                <Info />
                <View style={styles.submitBtnContainer}>
                    <Button
                        title='Зрозуміло'
                        buttonStyle={{backgroundColor: colors.wildBlue, borderRadius: 30}}
                        containerStyle={{ width: 200, marginBottom: 5}}
                        titleStyle={{ fontWeight: 'bold', color: colors.beige}}
                        onPress={toggleModalOverlay}
                        theme={BtnTheme}
                    />
                </View>
            </Overlay>
            <View style={styles.btnContainer}>
                <View style={styles.infoBtnContainer}>
                    <Button
                        title='Повна інформація'
                        buttonStyle={{backgroundColor: colors.wildBlue, borderRadius: 10}}
                        containerStyle={{ width: 200, marginBottom: 25}}
                        titleStyle={{ fontWeight: 'bold', color: colors.beige}}
                        onPress={toggleModalOverlay}
                        theme={BtnTheme}
                    />
                </View>
                <View style={styles.addBtnContainer}>
                    <Button
                        title='Додати в колекцію'
                        buttonStyle={{backgroundColor: colors.pastelGray, borderRadius: 10}}
                        containerStyle={{ width: 200, marginBottom: 25}}
                        titleStyle={{ fontWeight: 'bold', color: colors.beige}}
                        // onPress={onSubmitForm}
                        theme={BtnTheme}
                    />
                </View>
                <View style={styles.downloadBtnContainer}>
                    <Button
                        title='Завантажити'
                        buttonStyle={{backgroundColor: colors.wildBlue, borderRadius: 10}}
                        containerStyle={{ width: 200, marginBottom: 25}}
                        titleStyle={{ fontWeight: 'bold', color: colors.beige}}
                        // onPress={onSubmitForm}
                        theme={BtnTheme}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: colors.beige,
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
        paddingBottom: 80,
    },
    submitBtnContainer: {
        marginTop: 30,
        marginBottom: 10,
        alignSelf: 'center',
    },
    // statusTouchContainer: {
    //     marginBottom: 30,
    //     alignItems: 'center',
    // },
    // statusContainer: {
    //     display: "flex",
    //     flexDirection: "row",
    //     justifyContent: 'space-between',
    //     height: 40,
    //     width: 200,
    //     backgroundColor: colors.shadowBlue,
    //     borderRadius: 30
    // },
    h1Text: {
        marginTop: 30,
        fontSize: 30,
        textAlign: 'center',
        alignSelf: 'center',
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
    whiteColumn: {
        width: 3,
        height: 80,
        backgroundColor: colors.beige
    },
    blackColumn: {
        width: 3,
        height: 80,
        backgroundColor: '#000'
    },
    barcodeContainer: {
        alignSelf: 'center',
    },
    barCode: {
        height: 80,
        flexDirection: 'row'
    },
    barcodeTxt: {
        textAlign: 'center',
        fontSize: 20,
        marginTop: 3,
    },
    btnContainer: {
        // flexDirection: "row",
        marginTop: 20,
    },
    addBtnContainer: {
        marginTop: 5,
        marginBottom: 5,
        alignSelf: 'center',
    },
    infoBtnContainer: {
        marginTop: 5,
        marginBottom: 5,
        alignSelf: 'center',
    },
    downloadBtnContainer: {
        marginTop: 5,
        marginBottom: 5,
        alignSelf: 'center',
    }
})
export default Painter