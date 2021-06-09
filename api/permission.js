import {Platform} from "react-native"
import {REACT_APP_MOCK_SERVER_ANDROID, REACT_APP_MOCK_SERVER_IOS} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const getPermissionsByUser = async (idUser) => {
    const localhostServer = Platform.OS === "ios" ? REACT_APP_MOCK_SERVER_IOS : REACT_APP_MOCK_SERVER_ANDROID
    const uri = localhostServer + "permission?UserId=" + idUser
    const token = await AsyncStorage.getItem('USER_TOKEN');
    console.log(uri)
    return axios.get(uri, {
        Headers: {"Authorization" : `Bearer ${token}`}
    })
}