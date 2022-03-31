import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from 'react-native-paper';
import { Text, View, Alert } from 'react-native'
import { SvgXml } from 'react-native-svg';
import Svgs from '../utilities/svgs/Svgs';
import STYLES from '../STYLES';
import { Checkbox } from 'react-native-paper';
import COLORS from '../utilities/colors/Color';
import Button1 from '../comp/Button1';
import Geocoder from 'react-native-geocoding';
import SplashScreen from 'react-native-splash-screen'
import GetLocation from 'react-native-get-location'
import AsyncStorage from '@react-native-async-storage/async-storage';
const SignIn = ({ navigation }) => {
    SplashScreen.hide();


    var lat, long, address;
    const [checked, setChecked] = React.useState(false);
    const [stateIsValidChecked, setStateIsValidChecked] = useState(true)

    Geocoder.init("AIzaSyBI8rEv2hwtOGBcvmHyBKYgw3EsV1obr0Q");
    // Geocoder.from("33.6520462", "73.081791")
    //     .then(json => {
    //         console.log(json)
    //         //var addressComponent = json.results[0].address_components[0];
    //         //console.log(addressComponent);
    //     })
    //     .catch(error => console.warn(error));

    const multiSet = async (lat, long, address) => {

        console.log(typeof (address))
        const firstPair = ["asyncLong", long + ""]
        const secondPair = ["asyncLat", lat + ""]
        const thirdPair = ["asyncAddress", address]

        try {
            await AsyncStorage.multiSet([firstPair, secondPair, thirdPair])
        } catch (e) {
            Alert.alert(e)
        }

    }

    GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
    })
        .then(location => {
            console.log(location);
            console.log(location.latitude)
            lat = location.latitude
            long = location.lat

            console.log(location.longitude)
            Geocoder.from(location.latitude, location.longitude)
                .then(json => {
                    //  console.log(json.results[1].address_components);
                    console.log(json.results[1].formatted_address);
                    address = json.results[1].formatted_address
                    multiSet(location.latitude, location.longitude, json.results[1].formatted_address)
                    //console.log(json.results[1].geometry);
                    //console.log(json.results[1].plus_code);
                    //console.log(json.results[1].types);
                    //var addressComponent = json.results[0].address_components[0];
                    //console.log(addressComponent);
                })
                .catch(error => console.warn(error));
        })
        .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
        })

    const Continue = () => {
        if (!checked) {
            setStateIsValidChecked(false)
        }

        if (checked) {
            navigation.navigate("MobileNumber")
        }
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            paddingVertical: '2%',
            paddingHorizontal: '5%', backgroundColor: Colors.white
        }}>

            <View style={{ marginTop: "25%", alignSelf: "center" }}>
                <SvgXml xml={Svgs.logo} />
            </View>


            <View style={{
                marginTop: "50%", alignSelf: "center",

            }}>
                <Text style={STYLES.fontSize38_lightPinkAD8DB4_Arial_Bold}>Welcome</Text>
                <View style={{ alignItems: 'center' }}>
                    <Text style={STYLES.fontSize18_grey585858_Arial_Regular}>Sign in to Continue</Text>
                </View>
            </View>


            <View style={{
                flex: 1, justifyContent: 'flex-end',
                marginBottom: '10%', marginHorizontal: '10%',
            }}>

                <View style={{
                    flexDirection: 'row',


                }}>
                    <Checkbox
                        color={COLORS.lightPinkAD8DB4}
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setChecked(!checked);
                            setStateIsValidChecked(true)
                        }}
                    />

                    <View style={{ marginLeft: '5%', flex: 1 }}>
                        <Text style={STYLES.fontSize12_grey585858_Arial_Regular}>By countinuing, I confirm I have read the  Privacy Policy</Text>
                    </View>


                </View>

                {stateIsValidChecked == false ? <Text style={{ color: 'red' }}>kindly check checkbox</Text> : null}
                <View style={{ marginTop: '5%' }}>
                    <Button1 text="Signin with Mobile Number"
                        onPress={() => { Continue() }} />
                </View>

            </View>
        </SafeAreaView>
    );
};

SignIn.propTypes = {

};

export default SignIn;