import React, {useEffect, useState} from 'react';
import {Alert, Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import {colors} from "../constants/helpers"

import {fetchOneBarcodeByNum} from "../http/barcodesApi";
import {Overlay} from "react-native-elements";

const BarcodeItemInfo = ({route, navigation}) => {

    const { barcodeNumber } = route.params
    const [barcodeInfo, setBarcodeInfo] = useState([])
    const [load, setLoad] = useState(true)

    useEffect(() => {
        navigation.addListener('focus', () => {
            try {
                fetchOneBarcodeByNum(barcodeNumber).then(data => {
                    setBarcodeInfo(data.data)
                })
            } catch (e) {
                console.log(e)
            }
        })

        setTimeout(() => {
            setLoad(false)
        }, 1500)
        return () => clearTimeout()
    },[])

    let getInfoFromObjByTitle = (title, data) => {
        let result = ''

        if (!data) {
            return console.log('ERROR getInfoFromObj')
        }

        data.map(obj => {
            if(obj.title === title) {
                result = obj.description
            }
        })

        return '' + result
    }

    const LoaderComponent = () => {
        return (
            <View>
                <Overlay isVisible={load} overlayStyle={{width: '100%', height: '100%', backgroundColor: colors.beige}}>
                    <ActivityIndicator animating={load} style={styles.load} color={'#000'} />
                </Overlay>
            </View>
        )
    }

    const checkInfo = (info) => {
        if (!info) {
            return (
                <>
                    {
                        load ? <ActivityIndicator animating={load} style={styles.load} color={'#000'} /> :
                            <Text style={styles.warnTxt}>Інформації про цей товар в базі немає</Text>
                    }
                </>
            )
        } else {

            let name = getInfoFromObjByTitle('name', info)
            let appointment = getInfoFromObjByTitle('appointment', info)
            let indication = getInfoFromObjByTitle('indication', info)
            let application = getInfoFromObjByTitle('application', info)

            let indicationInformation = indication.split('. ').map(value => {return { key: value }})
            let applicationInformation = application.split('. ').map(value => {return { key: value }})

            return (
                <View style={styles.infoContainer}>
                        <LoaderComponent />
                        <Text style={styles.h1Text}>{name} -
                            Загальна інформація та інструкція застосування від виробника</Text>
                        <Image
                            source={require('../assets/medicine.jpeg')}
                            style={{
                                alignSelf: 'center',
                                width: '90%',
                                height: 250,
                                resizeMode: 'contain',
                                marginTop: 20,
                                borderRadius: 15,
                            }}
                        />
                        <Text style={styles.h4Text}>{appointment}</Text>

                        <Text style={styles.h2Text}>Застосування</Text>
                        <View style={{ padding: 20 }}>
                            <FlatList
                                data={indicationInformation}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={{ marginBottom: 10 }}>
                                            <Text style={{ fontSize: 20 }}>{item.key}</Text>
                                        </View>
                                    );
                                }}
                            />
                        </View>

                        <Text style={styles.h3Text}>Додаткова інформація</Text>
                        <View style={{ padding: 20 }}>
                            <FlatList
                                data={applicationInformation}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={{ marginBottom: 10 }}>
                                            <Text style={{ fontSize: 20 }}>{item.key}</Text>
                                        </View>
                                    );
                                }}
                            />
                        </View>

                </View>
            )
        }
    }

    return (
        <View style={styles.mainContainer}>
            <ScrollView style={{flex: 1}}>
                {checkInfo(barcodeInfo.info)}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: colors.beige,
        height: Dimensions.get('screen').height,
    },
    infoContainer: {
        marginTop: 60,
        marginBottom: 100,
    },
    warnTxt: {
        marginTop: 100,
        fontSize: 30,
        textAlign: 'center',
        alignSelf: 'center',
    },
    h1Text: {
        fontSize: 30,
        textAlign: 'center',
        alignSelf: 'center',
    },
    h2Text: {
        marginLeft: 20,
        fontWeight: 'bold',
        marginTop: 30,
        fontSize: 28,
    },
    h3Text: {
        marginLeft: 20,
        fontWeight: 'bold',
        fontSize: 28,
    },
    h4Text: {
        width: '90%',
        marginLeft: 20,
        marginTop: 20,
        fontSize: 20,
    },
    load: {
        marginTop: '100%'
    }
});

export default BarcodeItemInfo
