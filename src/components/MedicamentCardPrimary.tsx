import React from "react";

import { StyleSheet, Text, Image } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { SvgFromUri } from "react-native-svg";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface MedicamentProps extends RectButtonProps {
    data: {
        name: string;
        photo: string;
    };
}

export function MedicamentCardPrimary({ data, ...rest} : MedicamentProps) {
    
    return(
        <RectButton
            style={styles.container} {...rest}>
            <SvgFromUri
            uri='https://www.svgrepo.com/show/5115/pills.svg'
            width={70} 
            height={70} 
            />
            <Text style={styles.text}>{data.name}</Text>
        </RectButton>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxWidth: '45%',
        backgroundColor: colors.shape,
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: 'center',
        margin: 10
    },
    
    text: {
        color: colors.heading,
        fontFamily: fonts.heading,
        marginVertical: 16
    }
});
