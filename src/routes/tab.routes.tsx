import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';


import colors from '../styles/colors';

import { MaterialIcons } from '@expo/vector-icons';

import { MedicamentSelect } from '../pages/MedicamentSelect';
import { MyMedicaments } from '../pages/MyMedicaments';

const AppTab = createBottomTabNavigator();

const AuthRoutes = () => {
    return(
        <AppTab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.blue,
                tabBarInactiveTintColor: colors.heading,
                tabBarLabelPosition: 'beside-icon',
                tabBarStyle: {
                    borderTopWidth: 0,
                    borderTopStartRadius: 60,
                    borderTopEndRadius: 60,
                    height: 88,
                    paddingVertical: Platform.OS === "ios" ? 20 : 0,
                },
            }}
        >
                <AppTab.Screen
                    name="Novo Medicamento"
                    component={MedicamentSelect}
                    options={{
                        tabBarIcon: ({size, color}) => (
                            <MaterialIcons
                                name="add-circle-outline"
                                size={size}
                                color={color}
                            />
                        ),
                    }}
                />

                <AppTab.Screen
                    name="Meus Medicamentos"
                    component={MyMedicaments}
                    options={{
                        tabBarIcon: ({size, color}) => (
                            <MaterialIcons
                                name="format-list-bulleted"
                                size={size}
                                color={color}
                            />
                        ),
                    }}
                />
            </AppTab.Navigator>
    );
}

export default AuthRoutes;