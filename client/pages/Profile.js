import React, {useContext, useEffect, useState} from "react";
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native'
import {Button} from "react-native-elements";
import {colors, useScreenDimensions} from "../constants/helpers";
import Login from './Login'
import {Context} from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

const Profile = ({navigation}) => {

    const {user} = useContext(Context)
    const [modalVisible, setModalVisible] = useState(false)

    const [userAuth, setUserAuth] = useState()
    const [token, setToken] = useState('')

    const clearStorageToken = async () => {
        try {
            await AsyncStorage.clear()
        } catch (e) {
            console.log('err clearStorageToken', e)
        }
    }

    const checkToken = async () => {
        try {
            const value = await AsyncStorage.getItem('token')
            if (value !== null || undefined) {
                setUserAuth(true)
                setToken(jwtDecode(value))
            } else {
                setUserAuth(false)
            }
        } catch (e) {
            console.log('err checkToken', e)
        }
    }

    useEffect(() => {
        navigation.addListener('focus', () => {
            checkToken().then()
        })
    }, [navigation])

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        setUserAuth(false)
        setToken('')
    }

    const toggleModalOverlay = () => {
        setModalVisible(!modalVisible)
    }

    const goTo = () => {
        navigation.navigate('Barcode');
    }

    const goToForm = () => {
        navigation.navigate('Login');
    }

    const screenData = useScreenDimensions();

    return (
        <View style={styles.mainContainer}>
            <View style={{backgroundColor: colors.beige, marginTop: 50}}>
                <View style={styles.headerContent}>
                    <Image style={styles.avatar}
                           source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>

                    <Text style={{fontSize:22, fontWeight:'600'}}>
                        Вітаю :)
                    </Text>
                    {
                        userAuth ?
                            <>
                            </>
                            :
                            <Text style={{fontSize:16, fontWeight:'600'}}>
                                Увійдіть, щоб побачити інформацію
                            </Text>
                    }
                </View>
            </View>
            <View style={{
                flex: 0,
                flexDirection: 'row',
                flexWrap: 'wrap',
                width: screenData.isLandscape ? '95%' : '90%',
                alignSelf: 'center',
                justifyContent: 'space-evenly',
                marginBottom: screenData.isLandscape ? 0 : '5%',
            }}>
                <View style={{
                    textAlign: 'center',
                    alignSelf: 'center',
                    marginTop: 100,
                    fontSize: screenData.isLandscape ? 18 : 20,
                    width: screenData.isLandscape ?
                        Dimensions.get('screen').width / 2 :
                        '54%'
                }}>
                    { userAuth ?
                        <>
                            <Button
                                title='LogOut'
                                buttonStyle={styles.authBtn}
                                containerStyle={{ width: 200, marginBottom: 25}}
                                titleStyle={{ fontWeight: 'bold' }}
                                onPress={ () => {
                                    logOut()
                                    clearStorageToken().then()
                                }}
                            />
                        </>
                        :
                        <Button
                            title='LogIn'
                            buttonStyle={styles.authBtn}
                            containerStyle={{ width: 200, marginBottom: 25}}
                            titleStyle={{ fontWeight: 'bold' }}
                            onPress={goToForm}
                        />
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: colors.beige,
        height: Dimensions.get('screen').height,
    },
    headerContent:{
        alignItems: 'center',
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
    },
    infoContent:{
        flex:1,
        alignItems:'flex-start',
        paddingLeft:5
    },
    iconContent:{
        flex:1,
        alignItems:'flex-end',
        paddingRight:5,
    },
    icon:{
        width:30,
        height:30,
        marginTop:20,
    },
    info:{
        fontSize:18,
        marginTop:20,
        color: "#FFFFFF",
    },
    statusTouchContainer: {
        marginBottom: 30,
        alignItems: 'center',
    },
    statusContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
        height: 40,
        width: 200,
        backgroundColor: colors.shadowBlue,
        borderRadius: 30
    },
    statusText: {
        fontSize: 18,
        color: colors.beige,
        marginLeft: 45,
        fontWeight: 'bold',
        alignSelf: 'center',
        display: "flex",
        flexDirection: "column",
    },
    statusIcon: {
        fontSize: 25,
        marginRight: 40,
        alignSelf: 'center',
        display: "flex",
        flexDirection: "column",
    },
    // modal
    modalContainer: {
        width: '90%',
        backgroundColor: colors.beige,
    },
    headerContainer: {
        display: "flex", flexDirection: "row",
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 10,
    },
    modalH1Text: {
        display: "flex", flexDirection: 'column',
        marginLeft: 20,
        fontSize: 25,
    },
    modalIcon: {
        display: "flex", flexDirection: 'column',
        marginRight: 20,
        alignSelf: 'center',
        color: colors.shadowBlue,
    },
    dietsListContainer: {
        marginTop: 15,
        marginBottom: 20,
        display: "flex", flexDirection: "row",
        flexWrap: "wrap",
        alignSelf: 'flex-start',
    },
    listContainer: {
        alignSelf: 'center',
        borderRadius: 10,
        margin: 10,
        padding: 12,
        display: 'flex', flexDirection: 'column',
        backgroundColor: colors.shadowBrown
    },
    txtListContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    txtList: {
        color: colors.text,
        display: 'flex',
        flexDirection: 'column',
        fontSize: 16,
        marginRight: 10
    },
    authBtn: {
        backgroundColor: colors.pastelGray,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 10,
    },
    savedPageBtn: {
        backgroundColor: colors.wildBlue,
        borderRadius: 10,
    },
    pageBtn: {
        backgroundColor: colors.pastelGray,
        borderRadius: 10,
    },
});

export default Profile
