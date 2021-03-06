import React from 'react';
import { SafeAreaView, Text, Image, StyleSheet, TouchableOpacity, Dimensions, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

import pillsImg from '../assets/pills.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';


export function Welcome(){
    
    const navigation = useNavigation();

    function handleStart(){
        navigation.navigate('UserIdentification');
    }


    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>
                REMIND ME {'\n'}
                </Text>

                <Image source={pillsImg} style={styles.image} resizeMode="contain"/>

                <Text style={styles.subtitle}>
                Não esqueça mais dos horários de seus medicamentos!
                </Text>

                <TouchableOpacity 
                    style={styles.button}
                    activeOpacity={0.8}>
                        <Feather name="chevron-right" style={styles.buttonIcon} onPress={handleStart} />
                </TouchableOpacity>
            </View>
        </ SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },

    wrapper: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal:20
    },

    title: {
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.heading,
        marginTop: 60,
        fontFamily: fonts.heading,
        lineHeight: 50
    },

    subtitle: {
        textAlign: 'center',
        fontSize: 20,
        paddingHorizontal: 20,
        color: colors.heading,
        fontFamily: fonts.text,
        lineHeight: 22
    },

    image: {
        height: Dimensions.get('window').width * 0.9
    },

    button: {
        backgroundColor: colors.blue,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginBottom: 10,
        height: 50,
        width: 50,
    },
    
    buttonIcon: {
        fontSize:28,
        color: colors.white
    }

});