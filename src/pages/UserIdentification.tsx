import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';


import { Button } from "../components/Button";

import colors from "../styles/colors";
import fonts from "../styles/fonts";


export function UserIdentification() {

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);    
    const navigation = useNavigation();
    const [name, setName] = useState<string>(); 


    async function handleSubmit(){
        if(!name)
            return Alert.alert('Ops! Como devemos te chamar? ');

        try{
            await AsyncStorage.setItem('@remindme:user', name);
            navigation.navigate('Confirmation', {
                title: 'Tudo certo!',
                subtitle: 'Vamos começar a organizar os horários de seus medicamentos!',
                buttonTitle: 'Começar',
                icon: 'wink',
                nextScreen: 'Medicament',
            });
        } catch{
            return Alert.alert('Ops! Não conseguimos salvar seu nome');
        }


    }

    function handleInputBlur(){
        setIsFocused(false);
        setIsFilled(!!name);
    }

    function handleInputFocus(){
        setIsFocused(true);
    }

    function handleInputChange(value: string){
        setIsFilled(!!value);
        setName(value);
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                            <View style={styles.form}>
                                <View style={styles.header}> 
                                    <Text style={styles.emoji}>
                                        {isFilled ? ':D' : ':)' }
                                    </Text>
                                    <Text style={styles.title}>
                                        Como podemos te chamar?
                                    </Text>
                                </View>
                                <TextInput 
                                    style={[
                                        styles.input, (isFocused || isFilled) &&
                                        {borderColor: colors.blue}
                                    ]} 
                                    placeholder="Digite seu nome" 
                                    onBlur={handleInputBlur} 
                                    onFocus={handleInputFocus}
                                    onChangeText={handleInputChange}   
                                />
                                <View style={styles.footer} >
                                    <Button title="Confirmar" onPress={handleSubmit}/>
                                </View>
                            </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
   )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },

    content: {
        flex: 1,
        width: '100%',
    },

    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center',
    },

    header: {
        alignItems: 'center'
    },

    emoji: {
        fontSize: 44
    },

    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    },

    title: {
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 20
    },

    footer: {
        width: '100%',
        marginTop: 40,
        paddingHorizontal: 20
    }
})