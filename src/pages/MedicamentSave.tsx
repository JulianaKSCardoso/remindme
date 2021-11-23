import React, { useState } from 'react';

import {
    Alert,
    StyleSheet,
    Text, View,
    Image, 
    Platform,
    TouchableOpacity,
    ScrollView }
    from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/core'
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { format,isBefore } from 'date-fns';
import { SvgFromUri } from 'react-native-svg';

import { MedicamentProps, saveMedicament } from '../libs/storage';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import caps from '../assets/caps.png'

import { Button } from '../components/Button';
import { color } from 'react-native-reanimated';


interface ParamsMedicamentSave {
    medicament: MedicamentProps
}

export function MedicamentSave() {
    const route = useRoute();
    const navigation = useNavigation();
    const { medicament } = route.params as ParamsMedicamentSave;

    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios');

    function handleChangeTime(event: Event, dateTime: Date | undefined) {  
        if(Platform.OS == 'android'){
            setShowDatePicker(oldState => !oldState);
        }
        if(dateTime && isBefore(dateTime, new Date())){
            setSelectedDateTime(new Date());
            return Alert.alert('Escolha uma hora no futuro!');
        }

        if(dateTime) {
            setSelectedDateTime(dateTime);
        }
    }


    function handleOpenDateTimePickerForAndroid(){
        setShowDatePicker(oldState => !oldState); 
    }


    async function handleSave(){

        if (selectedDateTime && isBefore(selectedDateTime, new Date())) {
            setSelectedDateTime(new Date());
            return Alert.alert("Escolha uma hora no futuro! ⏰");
        }
        try{
            await saveMedicament({
                ...medicament,
                dateTimeNotification: selectedDateTime,
            });

            navigation.navigate("MyMedicaments");
        } catch{
            Alert.alert('Não foi possível salvar 😥')
        }
    }
    

    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            <View style={styles.container}>
                <View style={styles.medicamentInfo}>
                <SvgFromUri
                uri='https://www.svgrepo.com/show/5115/pills.svg'
                width={150} 
                height={150} 
                />

                <Text style={styles.medicamentName}>
                    {medicament.name}
                </Text>
                <Text style={styles.medicamentAbout}>
                    {medicament.about}
                </Text>
            </View>

                <View style={styles.controller}>
                    <View style={styles.tipContainer}>
                        <Image 
                            source={caps}
                            style={styles.tipImage}
                        />

                        <Text style={styles.tipText}>
                            {medicament.tips}
                        </Text>
                    </View>
                    <Text style={styles.alertLabel}>
                        Escolha o horário que deseja ser lembrado
                    </Text>

                    {showDatePicker && (
                    <DateTimePicker
                        value={selectedDateTime}
                        mode='time'
                        display='spinner'
                        onChange={handleChangeTime}
                    />
                    )}

                    {
                        Platform.OS == 'android' && (
                            <TouchableOpacity
                                onPress={handleOpenDateTimePickerForAndroid}
                                style={styles.dateTimePickerButton}
                            >
                                    <Text style={styles.dateTimePickerText}>
                                        {`${format(selectedDateTime, `HH:mm`)}`}
                                    </Text>
                            </TouchableOpacity>
                        )
                    }


                    <Button
                        title="Cadastrar medicamento"
                        onPress={handleSave}
                    />
                </View>
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape,
    },

    medicamentInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape
    },

    controller: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20
    },

    medicamentName: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15
    },

    medicamentAbout: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 10
    },

    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 60
    },

    tipImage: {
        width: 56,
        height: 56,
    },

    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify'
    },

    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 20
    },

   dateTimePickerButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40
    },

    dateTimePickerText: {
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text
    }
});