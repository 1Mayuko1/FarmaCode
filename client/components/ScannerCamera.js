import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, Button, Dimensions, Alert} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {colors} from "../constants/helpers";

const ScannerCamera = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [scannedData, setScannedData] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions().then(r => console.log('OK'));
    }, []);

    // const handleBarCodeScanned = ({ type, scanData }) => {
    //     try {
    //         setScanned(true);
    //         setScannedData(scanData)
    //         console.log(`type ${type} - data ${scanData}`)
    //         Alert.alert(`Type: ${type} - Data: ${scanData}`);
    //         if (!scanData) {
    //             navigation.navigate('Profile');
    //         }
    //         navigation.navigate('ScannerResult', {
    //             type: type,
    //             scanData: scanData
    //         });
    //     } catch (e) {
    //         console.log('Error from handleBarCodeScanned ', e)
    //     }
    // };

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.mainContainer}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: colors.beige,
        height: Dimensions.get('screen').height,
    },
    h1Text: {
        marginTop: 30,
        fontSize: 30,
        textAlign: 'center',
        alignSelf: 'center',
    },
});

export default ScannerCamera
