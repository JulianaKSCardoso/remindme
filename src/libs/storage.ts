import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from 'expo-notifications';
import { format } from "date-fns";

export interface MedicamentProps {
        id: string;
        name: string;
        about: string;
        tips: string;
        photo: string;
        medicamentsType: string[];
        frequency: {
          times: number;
          repeat_every: string;
        };
        hour: string;
        dateTimeNotification: Date;
}

export interface StorageMedicamentProps {
    [id: string]: {
        data: MedicamentProps;
        notificationId: string;
    };
}

export async function saveMedicament(medicament: MedicamentProps): Promise<void> {
    try{
        const nextTime = new Date(medicament.dateTimeNotification);
        const now = new Date();

        const {times, repeat_every} = medicament.frequency;
        if(repeat_every === 'week'){
            const interval = Math.trunc(7 / times);
            nextTime.setDate(now.getDate() + interval);
        }else 
            nextTime.setDate(nextTime.getDate() +1)

        const seconds = Math.abs(
            Math.ceil((now.getTime() - nextTime.getTime()) / 1000));

        const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: '💊',
                body: `Está na hora do medicamento ${medicament.name}`,
                sound: true,
                priority: Notifications.AndroidNotificationPriority.HIGH,
                data: {
                    medicament,
                },
            },
            trigger: { 
                seconds: seconds < 60 ? 60 : seconds,
                repeats: true,
            },
        })

        const data = await AsyncStorage.getItem('@remindme:medicaments');
        const olMedicaments = data ? (JSON.parse(data) as StorageMedicamentProps) : {};
        
        const newMedicament = {
            [medicament.id]: {
                data: medicament,
                notificationId,
            },
        };

        await AsyncStorage.setItem('@remindme:medicaments',
        JSON.stringify({
            ...newMedicament,
            ...olMedicaments
        }));

    } catch (error){
        throw new Error(error);
    }
}

export async function loadMedicaments(): Promise<MedicamentProps[]> {
    try{
        const data = await AsyncStorage.getItem('@remindme:medicaments');
        const medicaments = data ? (JSON.parse(data) as StorageMedicamentProps) : {};
        
        const medicamentsSorted = Object
        .keys(medicaments)
        .map((medicament) => {
            return {
                ...medicaments[medicament].data,
                hour: format(new Date(medicaments[medicament].data.dateTimeNotification), `HH:mm`),
            };
        })
        .sort((a, b) => 
            Math.floor(
                new Date(a.dateTimeNotification).getTime() / 1000 - 
                Math.floor(new Date(b.dateTimeNotification).getTime() / 1000)
            )
        );

        return medicamentsSorted;
        
    } catch (error){
        throw new Error(error);
    }
}

export async function removeMedicament(id: string): Promise<void> {
    const data = await AsyncStorage.getItem('@remindme:medicaments');
    const medicaments = data ? (JSON.parse(data) as StorageMedicamentProps) : {};

    await Notifications.cancelScheduledNotificationAsync(medicaments[id].notificationId);
    
    delete medicaments[id];

    await AsyncStorage.setItem(
        '@remindme:medicaments',
        JSON.stringify(medicaments)
   );

}