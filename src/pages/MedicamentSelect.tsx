import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { MedicamentTypeButton } from '../components/MedicamentTypeButton';
import { MedicamentCardPrimary } from '../components/MedicamentCardPrimary';
import { Header } from '../components/Header';
import { Load } from '../components/Load'; 
import { MedicamentProps } from '../libs/storage';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import api from '../services/api';


export interface MedicamentTypeProps {
    key: string;
    title: string;
}

export function MedicamentSelect() {
    const [medicamentsType, setMedicamentTypes] = useState<MedicamentTypeProps[]>([]);
    const [medicaments, setMedicaments] = useState<MedicamentProps[]>([]);
    const [filteredMedicaments, setFilteredMedicaments] = useState<MedicamentProps[]>([]);
    const [medicamentTypeSelected, setMedicamentTypeSelected] = useState('all');
    const [loading, setLoading] = useState(true);

    const [ page, setPage ] = useState(1);
    const [ loadingMore, setLoadingMore ] = useState(false);

    const navigation = useNavigation();

    function handleMedicamentTypeSelected(medicamentType: string){
        setMedicamentTypeSelected(medicamentType);

        if(medicamentType == 'all')
            return setFilteredMedicaments(medicaments);

        const filtered = medicaments.filter(medicament => 
            medicament.medicamentsType.includes(medicamentType)    
        );

        setFilteredMedicaments(filtered);
    }

    async function fetchMedicaments(){
        const { data } = await api.get(`medicaments?_sort=name&_order=acs&_page=${page}&_limit=8`);

        if(!data)
            return setLoading(true);
        
        if(page > 1){
            setMedicaments(oldValue => [ ... oldValue, ... data])
            setFilteredMedicaments(oldValue => [ ... oldValue, ... data])
        } else {
            setMedicaments(data);
            setFilteredMedicaments(data);
        }
        setLoading(false);
        setLoadingMore(false);
    }



    function handleFetchMore(distance: number) {
        if(distance < 1)
            return;
        
        setLoadingMore(true);
        setPage(oldValue => oldValue + 1);
        fetchMedicaments();
    }

    function handleMedicamentSelect(medicament: MedicamentProps) {
        navigation.navigate('MedicamentSave', { medicament });
    }

    useEffect(() => {
    },[])


    useEffect(() => {
        async function fetchMedicamentType(){
            const { data } = await api
            .get('medicaments_medicamentTypes?_sort=title&_order=asc');
            setMedicamentTypes([
                {
                    key: 'all',
                    title: 'Todos',
                },
                ... data
            ]);
        }

        fetchMedicamentType();

    },[])

    useEffect(() => {


        fetchMedicaments();

    },[])

    if(loading){
        return <Load />
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header />
                <Text style={styles.title}>
                    Selecione o tipo de seu medicamento
                </Text>
                <Text style={styles.subtitle}>
                     ou realize uma pesquisa
                </Text>
            </View>

            <View>
                <FlatList
                    data={[medicamentsType]}
                    keyExtractor={(item) => String(item.key)}
                    renderItem={({ item }) => (
                        <MedicamentTypeButton
                            title={item.title}
                            active={ item.key == medicamentTypeSelected}
                            onPress={() => handleMedicamentTypeSelected(item.key)}
                        />
                    )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.medicamentTypeList}
                />
            </View>

            <View style={styles.medicaments}>
                <FlatList 
                    data={filteredMedicaments}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <MedicamentCardPrimary
                            data={item}
                            onPress={() => handleMedicamentSelect(item)}
                    />
                    )}
                    showsHorizontalScrollIndicator={false}
                    numColumns={2}
                    onEndReachedThreshold={0.1}
                    onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)
                    }
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },

    header: {
        paddingHorizontal: 30
    },

    title:{
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15
    },

    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading
    },

    medicamentTypeList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32
    },

    medicaments: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    }

});