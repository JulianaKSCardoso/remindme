import React, { useEffect, useState } from "react";

import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import fonts from "../styles/fonts";
import colors from "../styles/colors";
import userImg from "../assets/maria.png"


export function Header() {
    const [ userName, setUserName ] = useState<string>();

    useEffect(() => {
        async function loadStorageUserName() {
            const user = await AsyncStorage.getItem('@remindme:user');
            setUserName(user || '');
        }

        loadStorageUserName();

    }, []);

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}> Olá,  </Text>
                <Text style={styles.userName}>{userName}</Text>
            </View>
            <Image source={userImg} style={styles.image}></Image>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: 15,
        padding: 20
    },

    image: {
        width: 70,
        height: 70,
        borderRadius: 40
    },

    greeting: {
        fontSize: 30,
        color: colors.heading,
        fontFamily: fonts.text,
    },

    userName: {
        fontSize: 30,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 35
    }
})
