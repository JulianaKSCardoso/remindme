import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, FlatList, Alert } from 'react-native';

import { Header } from "../components/Header";
import { MedicamentCardSecondary } from "../components/MedicamentCardSecondary";
import { Load } from "../components/Load";

import colors from "../styles/colors";
import caps from '../assets/caps.png'
import { MedicamentProps, loadMedicament, removeMedicament } from "../libs/storage";
import { formatDistance } from "date-fns";
import { pt } from "date-fns/locale";
import fonts from "../styles/fonts";


export function MyMedicaments() {
    const [myMedicaments, setMyMedicaments] = useState<MedicamentProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextMedicament, setNextMedicament] = useState<string>();

    function handleRemove(medicament: MedicamentProps) {
        Alert.alert('Remover', `Deseja remover ${medicament.name}?`, [
            {
                text: 'Não',
                style: 'cancel'
            },
            {
                text: 'Sim',
                onPress: async () => {
                    try {
                        await removeMedicament(medicament.id);
                        setMyMedicaments((oldData) => 
                            oldData.filter((item) => item.id !== medicament.id)
                         );
                    } catch (error) {
                        Alert.alert('Não foi possível remover!');
                    }
                }
            }

        ])
    }

    useEffect(() => {
        async function loadStorageData() {
            const medicamentsStoraged = await loadMedicament();

            const nextTime = formatDistance(
                new Date(medicamentsStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                { locale: pt}
            );

            setNextMedicament(
                `Não esqueça de regar a ${medicamentsStoraged[0].name} à ${nextTime} horas.`
            );

            setMyMedicaments(medicamentsStoraged);
            setLoading(false);
        }

        loadStorageData();
    },[])

    if(loading){
        return <Load />
    }

    return(
        <View style={styles.container}>
            <Header/>

            <View style={styles.spotlight}>
                <Image
                    source={caps}
                    style={styles.spotlightImage}
                />
                <Text style={styles.spotlighText}>
                    {nextMedicament}
                </Text>
            </View>

            <View style={styles.medicaments}>
                <Text style={styles.medicamentsTitle}>
                    Próximos medicamentos
                </Text>

                <FlatList
                    data={myMedicaments}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <MedicamentCardSecondary
                          data={item}
                          handleRemove={() => {handleRemove(item)}}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flex: 1 }}
                />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background
    },

    spotlight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    spotlightImage: {
        width: 60,
        height: 60
    },

    spotlighText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
    },

    medicaments: {
        flex: 1,
        width: '100%'
    },

    medicamentsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20
    }
});