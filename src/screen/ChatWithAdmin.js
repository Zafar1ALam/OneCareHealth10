import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
    Bubble, GiftedChat, InputToolbar,
    Send
} from 'react-native-gifted-chat'
import {
    Text, View, TouchableOpacity, TextInput, ScrollView,
    StyleSheet, SafeAreaView, Dimensions, Image
} from 'react-native'
import COLORS from '../utilities/colors/Color';
import { SvgXml } from 'react-native-svg';
import Svgs from '../utilities/svgs/Svgs';
import STYLES from '../STYLES';
import { TouchableRipple } from 'react-native-paper';
import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';
const ChatWithAdmin = ({ navigation }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: null

                },
            },
        ])
    }, [])
    console.log(messages)
    const onSend = useCallback((messages = []) => {
        console.log(messages)
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])
    return (
        <SafeAreaView style={{
            flex: 1,

            backgroundColor: COLORS.whiteFFFFFF,
        }}>


            <View style={{
                flexDirection: 'row',
                backgroundColor: COLORS.lightPinkAD8DB4,
                height: 64, alignItems: 'center',
                paddingHorizontal: '10%',
                //justifyContent: 'center'
            }}>

                <TouchableRipple onPress={() => {


                    navigation.goBack()

                }} style={{ paddingHorizontal: '2%', paddingVertical: '2%' }}>
                    <SvgXml xml={Svgs.leftArrow} />
                </TouchableRipple>
                <View style={{
                    flex: 1,

                }}>
                    <Text style={[STYLES.fontSize21_whiteFFFFFF_Arial_SemiBold,
                    { textAlign: 'center' }]}>CHAT WITH ADMIN</Text>

                </View>
            </View>

            {/* <View> */}

            <GiftedChat
                messages={messages}
                // placeholder="Type Something"

                // alwaysShowSend
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
                }}


                renderBubble={(props) => {
                    return (

                        <Bubble
                            {...props}
                            wrapperStyle={{

                                right: {
                                    borderTopRightRadius: 9,
                                    borderTopLeftRadius: 9,
                                    borderBottomLeftRadius: 9,
                                    borderBottomRightRadius: 0,
                                    backgroundColor: COLORS.lightPinkAD8DB4,
                                    marginBottom: "8%",
                                    marginRight: '3%',

                                },
                                left: {
                                    borderTopRightRadius: 9,
                                    borderTopLeftRadius: 9,
                                    borderBottomLeftRadius: 9,
                                    borderBottomRightRadius: 0,
                                    backgroundColor: COLORS.lightBlueEAECF2,
                                    marginBottom: "8%",
                                    marginLeft: '3%'

                                }
                            }}
                            containerToPreviousStyle={{
                                right: {
                                    borderTopRightRadius: 9,
                                    borderTopLeftRadius: 9,
                                    borderBottomLeftRadius: 9,
                                    borderBottomRightRadius: 0,
                                },
                                left: {
                                    borderTopRightRadius: 9,
                                    borderTopLeftRadius: 9,
                                    borderBottomLeftRadius: 0,
                                    borderBottomRightRadius: 9,
                                },
                            }}
                            containerToNextStyle={{
                                right: {
                                    borderTopRightRadius: 9,
                                    borderTopLeftRadius: 9,
                                    borderBottomLeftRadius: 9,
                                    borderBottomRightRadius: 0,
                                },
                                left: {
                                    borderTopRightRadius: 9,
                                    borderTopLeftRadius: 9,
                                    borderBottomLeftRadius: 0,
                                    borderBottomRightRadius: 9,
                                },
                            }}
                            containerStyle={{
                                right: {
                                    borderTopRightRadius: 9,
                                    borderTopLeftRadius: 9,
                                    borderBottomLeftRadius: 9,
                                    borderBottomRightRadius: 0,
                                },
                                left: {
                                    borderTopRightRadius: 9,
                                    borderTopLeftRadius: 9,
                                    borderBottomLeftRadius: 0,
                                    borderBottomRightRadius: 9,
                                },
                            }}
                            textStyle={{
                                right: {
                                    color: COLORS.whiteFFFFFF,
                                    fontSize: 12,
                                    fontFamily: "Arial"
                                },
                                left: {
                                    color: COLORS.grey63697B,
                                    fontSize: 12,
                                    fontFamily: "Arial"
                                }
                            }}



                        />


                    )
                }}

                scrollToBottom={true}
                renderSend={(props) => {
                    return (
                        <Send
                            {...props}
                        >

                            {/* <Image style={{ height: 20, width: 30 }}
                                source={require('../utilities/images/Send.png')} /> */}
                            <View style={{

                                alignSelf: 'center',
                                marginBottom: "35%",
                                marginRight: "5%"
                            }}>
                                <SvgXml xml={Svgs.giftedChatSendMessageIcon} />
                            </View>
                        </Send>
                    )
                }}


                renderInputToolbar={(props) => {

                    return (
                        <InputToolbar
                            textInputStyle={STYLES.fontSize11_grey63697B_Arial_SemiBold}
                            placeholderTextColor={COLORS.grey63697B}
                            {...props}
                            placeholder="Type Something"

                            alwaysShowSend
                            // containerStyle={{
                            //     backgroundColor: COLORS.green074B08,
                            //     width: "100%",
                            // }}
                            containerStyle={{
                                borderTopWidth: 0,

                            }
                            }
                            primaryStyle={{
                                //backgroundColor: COLORS.red,
                                width: "85%",
                                paddingVertical: '1%',
                                borderRadius: 17,
                                borderWidth: 1,
                                marginTop: '2%',
                                alignSelf: 'center',
                                marginBottom: "2%",
                                borderColor: COLORS.grey979797,


                            }}
                        // accessoryStyle={{ backgroundColor: 'green' }}


                        />
                    );
                }}


            />

            {/* </View> */}
        </SafeAreaView>
    );
};

ChatWithAdmin.propTypes = {

};

export default ChatWithAdmin;



