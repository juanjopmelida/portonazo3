import {Platform} from "react-native"
import {REACT_APP_MOCK_SERVER_ANDROID, REACT_APP_MOCK_SERVER_IOS} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import {getPermissionsByUser} from "./permission"

export const getVehiclesByUser = async () => {
    const localhostServer = Platform.OS === "ios" ? REACT_APP_MOCK_SERVER_IOS : REACT_APP_MOCK_SERVER_ANDROID
    const vehicles = [];
    const userId = Math.floor(Math.random()*100)

    getPermissionsByUser(userId).then(res=>{
        if (res.data !== undefined) {
            console.log("PREMISSIONS: ",res.data[0])
            return res.data[0]
        } 
    }).catch(err=>{
        throw new Error(err)
    });



    // getCustomTagByUser(idUser).then(res => {
    //     return axios.get(uri, )
    // }).catch(err=> {
    //     throw new Error(err) 
    // })
    
}

export const getCustomTagByUser = async (idUser) => {
    const localhostServer = Platform.OS === "ios" ? REACT_APP_MOCK_SERVER_IOS : REACT_APP_MOCK_SERVER_ANDROID
    const uri = localhostServer + "customTag?UserId=" + idUser
    const token = await AsyncStorage.getItem('USER_TOKEN');
    console.log(uri)
    return axios.get(uri, {
        Headers: {"Authorization" : `Bearer ${token}`}
    })
}