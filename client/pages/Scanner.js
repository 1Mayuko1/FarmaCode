import React from 'react';
import {Text, View, StyleSheet, Dimensions, Image} from 'react-native';
import {Button, Card, Icon} from "react-native-elements";
import {BtnTheme, colors} from "../constants/helpers";

const Scanner = ({ navigation }) => {

    const goToScannerCamera = () => {
        navigation.navigate('ScannerCamera');
    }

    return (
        <View style={styles.mainContainer}>
            <Card containerStyle={styles.containerStyle}>
                <View style={styles.cardBlock}>
                    <View>
                        <Image style={styles.img}
                               source={require('../assets/barcodeScannerImage.jpeg')}/>
                    </View>
                    <View style={styles.txtContainer}>
                        <Text style={styles.h1Text}>Barcode Scanner</Text>
                        <View>
                            <View style={{flexDirection: "row", marginTop: 15, marginLeft: 15, marginBottom: 15}}>
                                <Icon name='heartbeat' type='font-awesome' color='#5796af'
                                      style={{marginRight: 8, paddingTop: 5}}/>
                                <Text style={styles.flatListTxt}>Скануй FarmaCode</Text>
                            </View>
                            <View style={{flexDirection: "row", marginLeft: 15, marginBottom: 15}}>
                                <Icon name='heartbeat' type='font-awesome' color='#5796af'
                                      style={{marginRight: 8, paddingTop: 5}}/>
                                <Text style={styles.flatListTxt}>Декодуй результат</Text>
                            </View>
                            <View style={{flexDirection: "row", marginLeft: 15}}>
                                <Icon name='heartbeat' type='font-awesome' color='#5796af'
                                      style={{marginRight: 8, paddingTop: 5}}/>
                                <Text style={styles.flatListTxt}>Повна інформація</Text>
                            </View>
                        </View>
                    </View>
                </View>
                    <Button
                        title='Сканувати'
                        buttonStyle={{backgroundColor: colors.pastelGray, borderRadius: 10}}
                        containerStyle={{ width: '90%', marginBottom: 25, alignSelf: 'center'}}
                        titleStyle={{ fontWeight: 'bold', color: colors.beige}}
                        onPress={goToScannerCamera}
                        theme={BtnTheme}
                    />
            </Card>
            <Card containerStyle={styles.secContainerStyle}>
                <View style={styles.cardBlock}>
                    <View>
                        <Image style={styles.img}
                               source={require('../assets/docBarcode.jpeg')}/>
                    </View>
                    <View style={styles.txtContainer}>
                        <Text style={styles.h1Text}>Documents Scanner</Text>
                        <View>
                            <View style={{flexDirection: "row", marginTop: 15, marginLeft: 15, marginBottom: 15}}>
                                <Icon name='heartbeat' type='font-awesome' color='#86729b'
                                      style={{marginRight: 8, paddingTop: 5}}/>
                                <Text style={styles.flatListTxt}>Скануй документи</Text>
                            </View>
                            <View style={{flexDirection: "row", marginLeft: 15, marginBottom: 15}}>
                                <Icon name='heartbeat' type='font-awesome' color='#86729b'
                                      style={{marginRight: 8, paddingTop: 5}}/>
                                <Text style={styles.flatListTxt}>Декодуй результат</Text>
                            </View>
                            <View style={{flexDirection: "row", marginLeft: 15}}>
                                <Icon name='heartbeat' type='font-awesome' color='#86729b'
                                      style={{marginRight: 8, paddingTop: 5}}/>
                                <Text style={styles.flatListTxt}>Повна інформація</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <Button
                    title='Сканувати'
                    buttonStyle={{backgroundColor: colors.wildBlue, borderRadius: 10}}
                    containerStyle={{ width: '90%', marginBottom: 25, alignSelf: 'center'}}
                    titleStyle={{ fontWeight: 'bold', color: colors.beige}}
                    onPress={goToScannerCamera}
                    theme={BtnTheme}
                />
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: colors.beige,
        height: Dimensions.get('screen').height,
    },
    h1Text: {
        marginTop: 5,
        fontSize: 25,
        marginBottom: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
    },
    containerStyle: {
        marginTop: '20%',
        borderRadius: 20,
        backgroundColor: '#f6f6f6'
    },
    secContainerStyle: {
        marginTop: '5%',
        borderRadius: 20,
        backgroundColor: '#f6f6f6'
    },
    cardBlock: {
        marginTop: 10,
        flexDirection: 'row',
    },
    txtContainer: {
        width: '70%',
        height: 200,
        marginBottom: 10,
    },
    flatListTxt: {
        marginTop: 5,
        fontSize: 20,
    },
    scanBtnContainer: {
        marginTop: 5,
        marginBottom: 5,
        alignSelf: 'center',
    },
    img: {
        alignSelf: 'center',
        width: 120,
        height: 200,
        marginBottom: 10,
    },
});

export default Scanner
