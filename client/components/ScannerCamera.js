import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Alert} from 'react-native';
import React, { useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';

const ScannerCamera = ({navigation}) => {
    const [hasPermission, setHasPermission] = React.useState(false);
    const [scanData, setScanData] = React.useState();

    useEffect(() => {
        (async() => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    if (!hasPermission) {
        return (
            <View style={styles.container}>
                <Text>Please grant camera permissions to app</Text>
            </View>
        );
    }

    const handleBarCodeScanned = ({type, data}) => {
        try {
            if (!type || !data) {
                navigation.navigate('Scanner');
                return Alert.alert('Відскановано не правильно, спробуйте ще')
            }
            setScanData(data);
            console.log(`Data: ${data}`);
            console.log(`Type: ${type}`);
            navigation.navigate('ScannerResult', {
                type: type,
                scanData: data
            });
        } catch (e) {
            console.log('Error from handleBarCodeScanned:', e)
        }
    };

    return (
        <View style={styles.container}>
            <BarCodeScanner
                style={StyleSheet.absoluteFillObject}
                onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
            />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ScannerCamera
