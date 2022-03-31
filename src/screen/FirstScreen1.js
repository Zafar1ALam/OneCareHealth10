import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, } from "react-native";
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import COLORS from '../utilities/colors/Color';



const FirstScreen1 = ({ navigation }) => {
    const [stateActivityIndicator, setStateActivityIndicator] = useState(true);
    const [stateAsyncHaveData, setStateAsyncHaveData] = useState('a');



    useEffect(() => {
        getMyObject()

    }, [])
    const getMyObject = async () => {
        try {
            const keys = await AsyncStorage.getItem("asyncAddress");
            //  console.log(keys)
            if (keys != null) {
                return (
                    console.log(keys),
                    console.log('ii'),
                    setStateAsyncHaveData('b'),

                    setStateActivityIndicator(false)
                )
            }
            else {
                return (
                    console.log('ko'),
                    setStateAsyncHaveData('c'),
                    setStateActivityIndicator(false)
                )
            }
        } catch (e) {
            alert(e)
        }
    }

    SplashScreen.hide()
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.whiteFFFFFF, justifyContent: 'center' }}>


            {stateActivityIndicator == true ?
                <ActivityIndicator animating={stateActivityIndicator} color={COLORS.lightPinkAD8DB4} />
                :

                stateAsyncHaveData === "b" ?
                    navigation.navigate("Welcome")

                    :
                    navigation.navigate("SignIn")

            }


        </View>
    );
};

FirstScreen1.propTypes = {

};

export default FirstScreen1;