import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, TouchableRipple, ActivityIndicator } from 'react-native-paper';
import {
    Text, View, TouchableOpacity, TextInput, ScrollView,
    StyleSheet, SafeAreaView, Alert
} from 'react-native'
import { SvgXml } from 'react-native-svg';
import Svgs from '../utilities/svgs/Svgs';
import STYLES from '../STYLES';
import COLORS from '../utilities/colors/Color';
import TextInput1 from '../comp/TextInput1';
import Button1 from '../comp/Button1';
import BaseUrl from '../route/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CompleteProfile = ({ route, navigation }) => {
    const { routeCombinePhoneNo } = route.params;
    const [stateActivityIndicator, setStateActivityIndicator] = useState(false)
    const [stateData, setStateData] = useState(
        {
            fullName: '',
            email: '',
            gender: '',
        }
    )

    const [stateAsyncLong, setStateAsyncLong] = useState();

    const [stateAsyncLat, setStateAsyncLat] = useState();

    const [stateAsyncAddress, setStateAsyncAddress] = useState();
    const [stateIsValidFullName, setStateIsValidFullName] = useState(true);
    const [stateIsValidEmail, setStateIsValidEmail] = useState(true);
    const [stateIsValidGender, setStateIsValidGender] = useState(true);


    useEffect(() => {
        getMultiple()
    }, [])

    const getMultiple = async () => {

        let values
        try {
            values = await AsyncStorage.multiGet(['asyncLong', 'asyncLat',
                'asyncAddress'])
        } catch (e) {
            // read error
            console.error(e)
        }
        console.log(values[0][1])
        console.log(values[1][1])
        console.log(values[2][1])
        setStateAsyncLong(values[0][1])
        setStateAsyncLat(values[2][1])
        setStateAsyncAddress(values[1][1])


    }


    const handleValidEmail = (val) => {
        let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w\w+)+$/;
        if (reg.test(val)) {
            console.log('true')
            return true;

        }
        else {
            console.log('false')
            return false;
        }
    }

    const setObject = async (obj) => {
        console.log(obj)
        AsyncStorage.setItem("obj", JSON.stringify(obj), (err) => {
            if (err) {
                console.log("an error");
                throw err;
            }
            console.log("success");
        }).catch((err) => {
            console.log("error is: " + err);
        });

    }

    const Continue = () => {
        if (!handleValidEmail(stateData.email)) {
            setStateIsValidEmail(false)
        }


        if (stateData.email == '') {
            //   console.log(stateData.email + 'emailaddress')
            setStateIsValidEmail(false)



        }
        if (stateData.fullName == '') {
            //   console.log(stateData.email + 'emailaddress')
            setStateIsValidFullName(false)

        }

        if (stateData.gender == '') {
            //  console.log(stateData.password + 'password')
            setStateIsValidGender(false)
        }


        if (stateData.emailAddress != '' && stateData.fullName != ''
            && stateData.gender != ''
            && handleValidEmail(stateData.email)) {

            console.log(BaseUrl + `customer/updateProfile.php
                "phoneno": ${routeCombinePhoneNo},
                "email": ${stateData.email}
                "gender": ${stateData.gender},
                "name": ${stateData.fullName}
              ', `)
            setStateActivityIndicator(true)
            fetch(BaseUrl + 'customer/updateProfile.php', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    phoneno: routeCombinePhoneNo,
                    email: stateData.email,
                    gender: stateData.gender,
                    name: stateData.fullName,

                })
            })
                .then((response) => response.json())
                .then((json) => {
                    //setStateShowAlert(false)
                    console.log(json)
                    setObject(json[0])
                    navigation.navigate("Welcome",
                        { routeName: json[0].name })

                    setStateActivityIndicator(false)


                })
                .catch((error) => {

                    console.error(error);
                });
            console.log('all valid record')

        }


    }
    return (
        <SafeAreaView

            style={{
                flex: 1,
                paddingVertical: '2%',
                paddingHorizontal: '5%', backgroundColor: COLORS.whiteFFFFFF
            }}>
            <ScrollView
                showsVerticalScrollIndicator={false}>
                <View style={{
                    marginTop: '7%',// backgroundColor: 'red',
                    width: '50%', alignItems: 'center', alignSelf: 'center'
                }}>
                    <Text style={[STYLES.fontSize34_lightPinkAD8DB4_Arial_Bold, {
                        textAlign: "center"
                    }]}>Complete Profile</Text>
                </View>


                <View style={{ marginTop: '15%' }}>
                    <TextInput1 text="Full Name"
                        onChangeText={(text) => {
                            setStateIsValidFullName(true)
                            setStateData({
                                ...stateData, fullName: text
                            })
                        }} />
                    {stateIsValidFullName == false ? <Text style={{ color: 'red' }}>Enter Valid Full Name</Text> : null}
                </View>

                <View style={{ marginTop: '10%' }}>
                    <TextInput1 text="Email"
                        onChangeText={(text) => {
                            setStateIsValidEmail(true)
                            setStateData({
                                ...stateData, email: text
                            })
                        }} />
                    {stateIsValidEmail == false ? <Text style={{ color: 'red' }}>Enter Valid Email</Text> : null}
                </View>

                <View style={{ marginTop: '10%' }}>
                    <TextInput1 text="Gender"
                        onChangeText={(text) => {
                            setStateIsValidGender(true)
                            setStateData({
                                ...stateData, gender: text
                            })
                        }} />
                    {stateIsValidGender == false ? <Text style={{ color: 'red' }}>Enter Valid Gender</Text> : null}
                </View>
                <View style={{
                    marginTop: '80%',// backgroundColor: 'red',
                    //justifyContent: 'flex-end'
                }}>


                    {stateActivityIndicator ?
                        <ActivityIndicator animating={stateActivityIndicator} color={COLORS.lightPinkAD8DB4} /> :
                        <Button1 text="Continue"
                            onPress={() => { Continue() }}
                        />
                    }
                    {/* </View> */}

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

CompleteProfile.propTypes = {

};

export default CompleteProfile;