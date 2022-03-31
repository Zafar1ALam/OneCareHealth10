// import PropTypes from 'prop-types';

// import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import { ActivityIndicator, StyleSheet, Text, View, useColorScheme } from "react-native";

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import React, { useState, useEffect } from 'react';
// import COLORS from '../utilities/colors/Color';
// import {
//     NavigationContainer
// } from '@react-navigation/native';


// const FirstScreen = ({ navigation }) => {
//     const [stateIsActiveActivityIndicator, setStateActivityIndicator] = useState(true)
//     const [stateAsyncHaveData, setStateAsyncHaveData] = useState('a')
//     const [stateName, setStateName] = useState();


//     useEffect(() => {
//         getMyObject()

//     }, [])
//     const getMyObject = async () => {
//         try {
//             const keys = await AsyncStorage.getAllKeys();
//             //  console.log(keys)
//             if (keys != null) {
//                 return (
//                     console.log(keys),

//                     setStateAsyncHaveData('b'),

//                     setStateActivityIndicator(false)
//                 )
//             }
//             else {
//                 return (


//                     setStateAsyncHaveData('c'),
//                     setStateActivityIndicator(false)
//                 )
//             }
//         } catch (e) {
//             alert(e)
//         }
//     }
//     return (
//         < View style={{ flex: 1, backgroundColor: COLORS.whiteFFFFFF, justifyContent: 'center' }}>
//             {/* {stateIsActiveActivityIndicator == true ?
//                 <ActivityIndicator animating={true} color={COLORS.lightPinkAD8DB4} /> :

//                 stateAsyncHaveData == "b" ?
//                     navigation.navigate("Welcome") :
//                     navigation.navigate("Signin")




//             } */}
//             <Text>ppppppppppppppppppp</Text>
//         </View>

//     );
// };

// FirstScreen.propTypes = {

// };

// export default FirstScreen;