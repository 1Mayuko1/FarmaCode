import React, {useEffect, useState, useContext} from "react";
import {
    View, Text,
    StyleSheet, Dimensions, Alert, ScrollView,
} from 'react-native'
import {
    colors, BtnTheme

} from "../constants/helpers";
import {Context} from "../App";
import Painter from "../components/Painter";
import {Button, Input} from "react-native-elements";
import {fetchBarcodes} from "../http/barcodesApi";
import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Barcode = ({ navigation }) => {

    const {barcodes} = useContext(Context)
    const {userBarcodes} = useContext(Context)

    const [inputText, setInputText] = useState('')
    const [txtData, setTxtData] = useState('')
    const [showResults, setShowResults] = React.useState(false)
    const [barcodesState, setBarcodesState] = React.useState([])
    const [userAuth, setUserAuth] = useState()
    const [token, setToken] = useState('')

    const checkToken = async () => {
        try {
            const value = await AsyncStorage.getItem('token');
            if (value !== null || undefined) {
                setUserAuth(true)
                setToken(jwtDecode(value))
            } else {
                setUserAuth(false)
            }
        } catch (e) {
            console.log('error in checkToken', e)
        }
    }

    useEffect(() => {
        fetchBarcodes().then(data => {
            barcodes.setBarcode(data.rows)
            setBarcodesState(data.rows)
        })
        fetchBarcodes().then(data => {
            barcodes.setBarcode(data.rows)
            setBarcodesState(data.rows)
        })
        checkToken().then()
    },[])

    const onSubmitForm = () => {
        if (inputText.length < 8) {
            return Alert.alert('Код повинен містити 8 цифр')
        } if (+inputText) {
            setTxtData(inputText)
            setShowResults(true)
        } else {
            return Alert.alert('Код повинен містити тільки цифри')
        }
    }

    const clearState = () => {
        setInputText('')
        setTxtData('')
    }

    const onChangeForm = e => {
        setInputText(e)
    }

    return (
        <View style={styles.mainContainer}>
            <ScrollView>
                <View style={styles.contentContainer}>
                    <Text style={styles.h1Text}>FarmaCode</Text>
                    <View style={styles.numberInputContainer}>
                        <Input
                            placeholder='Input number'
                            onChangeText={e => onChangeForm(e)}
                            maxLength={8}
                            value={inputText}
                            style={styles.numberInput}
                        />
                    </View>
                    <View style={styles.submitBtnContainer}>
                        <Button
                            title='Намалювати'
                            buttonStyle={{backgroundColor: colors.pastelGray, borderRadius: 10}}
                            containerStyle={{ width: 150, marginBottom: 25}}
                            titleStyle={{ fontWeight: 'bold', color: colors.beige}}
                            onPress={onSubmitForm}
                            theme={BtnTheme}
                        />
                        <Button
                            title='Очистити'
                            buttonStyle={{backgroundColor: colors.wildBlue, borderRadius: 10}}
                            containerStyle={{ width: 150, marginBottom: 25}}
                            titleStyle={{ fontWeight: 'bold', color: colors.beige}}
                            onPress={clearState}
                            theme={BtnTheme}
                        />
                    </View>

                    <View>
                        { showResults ? <Painter showResults={showResults} startNumber={txtData}/> : null }
                    </View>
                </View>
            </ScrollView>
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
    contentContainer: {
        marginTop: '10%',
    },
    h1Text: {
        marginTop: 50,
        fontSize: 30,
        textAlign: 'center',
        alignSelf: 'center',
    },
    numberInputContainer: {
        marginTop: 20,
        width: '60%',
        alignSelf: 'center',
    },
    numberInput: {
        fontSize: 20,
        width: '60%',
        textAlign: 'center',
    },
    submitBtnContainer: {
        width: "80%",
        flexDirection: 'row',
        justifyContent: "space-around",
        marginTop: 20,
        marginBottom: 15,
        alignSelf: 'center',
    },
});

export default Barcode
