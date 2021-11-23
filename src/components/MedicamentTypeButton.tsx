import React from 'react';

import { Text, StyleSheet } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface MedicamentTypeButtonProps extends RectButtonProps {
    title: string;
    active?: boolean;
}

export function MedicamentTypeButton({
    title,
    active = false,
    ...rest
} : MedicamentTypeButtonProps) {
    return(
        <RectButton
            style={[
                styles.container,
                active && styles.containerActive
            ]}
                {...rest}
        >
            <Text style={[
                styles.text,
                active && styles.textActive
                ]}>
                { title }
            </Text>
        </RectButton>
    );
}

const styles = StyleSheet.create( {
    container: {
        backgroundColor: colors.shape,
        width: 85,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginHorizontal: 5      
    },

    containerActive: {
        backgroundColor: colors.blue_light
    },
    
    text: {
        color: colors.heading, 
        fontFamily: fonts.text
    },

    textActive: {
        fontFamily: fonts.heading,
        color: colors.blue,
    }
})

