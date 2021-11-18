import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import colors from '../styles/colors';
import { MedicamentSelect } from '../pages/MedicamentSelect';
import { MaterialIcons } from '@expo/vector-icons';
import { MyMedicaments } from '../pages/MyMedicaments';

const AppTab = createBottomTabNavigator();

const AuthRoutes = () => {
    return(
        <AppTab.Navigator
            tabBarOptions={{
                activeTintColor: colors.green,
                inactiveTintColor: colors.heading,
                labelPosition: 'beside-icon',
                style: {
                    paddingVertical: 20,
                    height: 88
                },
            }}>
                <AppTab.Screen
                    name="Novo Medicamento"
                    component={MedicamentSelect}
                    options={{
                        tabBarIcon: (({size, color}) => (
                            <MaterialIcons
                                name="add-circle-outline"
                                size={size}
                                color={color}
                            />
                        ))
                    }}
                />

                <AppTab.Screen
                    name="Meus Medicamentos"
                    component={MyMedicaments}
                    options={{
                        tabBarIcon: (({size, color}) => (
                            <MaterialIcons
                                name="format-list-bulleted"
                                size={size}
                                color={color}
                            />
                        ))
                    }}
                />

                
            </AppTab.Navigator>
    )
}

export default AuthRoutes;