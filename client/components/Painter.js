import React, {useCallback, useEffect, useRef, useState} from 'react'
import {
    binaryDecode,
    code32Symbols,
    numberInBinary9,
} from "../constants/utils/consts";
import {Alert, Dimensions, Image, StyleSheet, Text, View} from "react-native";
import {BtnTheme, colors} from "../constants/helpers";
import {Button, Overlay} from "react-native-elements";
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from 'expo-media-library';

const Painter = ({startNumber}, {navigation}) => {

    if (startNumber.length < 5) return null

    const [imageUri, setImageUri] = useState('');
    const [savedImagePath, setSavedImagePath] = useState('');
    const [modalInfoVisible, setModalInfoVisible] = useState(false)
    const [modalDownloadVisible, setModalDownloadVisible] = useState(false)

    useEffect(() => {
        onCapture()
    }, [])

    const onCapture = useCallback(  uri => {
        setSavedImagePath(uri);
        setImageUri(uri);
        console.log("Image saved to", uri)
    }, []);

    const toggleModalInfoOverlay = () => {
        setModalInfoVisible(!modalInfoVisible)
    }

    const toggleModalDownloadOverlay = () => {
        setModalDownloadVisible(!modalDownloadVisible)
    }

    const saveToCameraRoll = async () => {
        try {
            console.log('asset', imageUri)
            await MediaLibrary.saveToLibraryAsync(imageUri)
            setModalDownloadVisible(!modalDownloadVisible)
            return Alert.alert('Зображення збережено до галереї')
        } catch (e) {
            return console.log('err download -', e)
        }
    }

    // Обчислення контрольної цифри C

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
            <ViewShot onCapture={onCapture} options={{format: 'jpg'}} captureMode="mount">
                <View style={styles.barcodeContainer}>
                    <View style={styles.barCode}>
                        {barcode}
                    </View>
                    <Text style={styles.barcodeTxt}>A{startNumber + keyNumber(startNumber).toString()}</Text>
                </View>
            </ViewShot>
            <Overlay
                isVisible={modalInfoVisible}
                onBackdropPress={toggleModalInfoOverlay}
                overlayStyle={{backgroundColor: colors.beige, borderRadius: 15}}
            >
                <Info />
                <View style={styles.submitBtnContainer}>
                    <Button
                        title='Зрозуміло'
                        buttonStyle={{backgroundColor: colors.wildBlue, borderRadius: 10}}
                        containerStyle={{ width: 200, marginBottom: 5}}
                        titleStyle={{ fontWeight: 'bold', color: colors.beige}}
                        onPress={toggleModalInfoOverlay}
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
                        onPress={toggleModalInfoOverlay}
                        theme={BtnTheme}
                    />
                </View>
                <Overlay
                    isVisible={modalDownloadVisible}
                    onBackdropPress={toggleModalDownloadOverlay}
                    overlayStyle={{backgroundColor: colors.beige, borderRadius: 15, width: 330, height: 300}}
                >
                    <Image
                        source={{uri: imageUri}}
                        style={{
                            alignSelf: 'center',
                            width: 300,
                            height: 100,
                            resizeMode: 'contain',
                            marginTop: '15%'
                        }}
                    />
                    <View style={styles.submitBtnContainer}>
                        <Button
                            title='Зберегти'
                            buttonStyle={{backgroundColor: colors.wildBlue, borderRadius: 10}}
                            containerStyle={{ width: 200, marginBottom: 5}}
                            titleStyle={{ fontWeight: 'bold', color: colors.beige}}
                            onPress={saveToCameraRoll}
                            theme={BtnTheme}
                        />
                    </View>
                </Overlay>
                <View style={styles.downloadBtnContainer}>
                    <Button
                        title='Завантажити'
                        buttonStyle={{backgroundColor: colors.pastelGray, borderRadius: 10}}
                        containerStyle={{ width: 200, marginBottom: 25}}
                        titleStyle={{ fontWeight: 'bold', color: colors.beige}}
                        onPress={toggleModalDownloadOverlay}
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
        backgroundColor: 'white'
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
        flexDirection: 'row',
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15
    },
    barcodeTxt: {
        textAlign: 'center',
        fontSize: 20,
        marginTop: 3,
        marginBottom: 8
    },
    btnContainer: {
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
