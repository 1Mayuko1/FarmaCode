import {$host, $authHost} from "./index";
import jwtDecode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration',
        {email, password, role: 'USER'})
    try {
        await AsyncStorage.setItem('token', data.token)
    } catch (e) {
        console.log('Error: userApi -> registration', e)
    }
    return jwtDecode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login',
        {email, password})
    try {
        await AsyncStorage.setItem('token', data.token)
    } catch (e) {
        console.log('Error: userApi -> login', e)
    }
    return jwtDecode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.post('api/user/auth')
    try {
        await AsyncStorage.setItem('token', data.token)
    } catch (e) {
        console.log('Error: userApi -> check', e)
    }
    return jwtDecode(data.token)
}
