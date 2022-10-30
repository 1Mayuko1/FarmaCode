import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {colors} from "../constants/helpers";
import {fetchOneBarcodeByNum} from "../http/barcodesApi";

const BarcodeItemInfo = ({route, navigation}) => {

    const { barcodeNumber } = route.params
    const [barcodeInfo, setBarcodeInfo] = useState()

    useEffect(() => {
        navigation.addListener('focus', () => {
            try {
                fetchOneBarcodeByNum(barcodeNumber).then(data => {
                    console.log('dataData', data.data)
                    setBarcodeInfo(data.data)
                })
            } catch (e) {
                console.log(e)
            }
        });
    },[])

    const test = (obj) => {
        if (!obj) {
            return ''
        } else {
            return obj.SHKCode32
        }
    }

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.h1Text}>BarcodeItemInfo {test(barcodeInfo)}</Text>
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
});

export default BarcodeItemInfo
