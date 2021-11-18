import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../styles/colors';

import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import { Confirmation } from '../pages/Confirmation';
import { MedicamentSave } from '../pages/MedicamentSave';
import { MyMedicaments } from '../pages/MyMedicaments';

import AuthRoutes from './tab.routes';


const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => {

    return(
        <stackRoutes.Navigator
            // headerMode="none"
            screenOptions={{
                cardStyle: {
                    backgroundColor: colors.white
                },
            }}
        >
                <stackRoutes.Screen name="Welcome" component={Welcome}/>

                <stackRoutes.Screen name="UserIdentification" component={UserIdentification}/>

                <stackRoutes.Screen name="Confirmation" component={Confirmation}/>

                <stackRoutes.Screen name="MedicamentSelect" component={AuthRoutes}/>

                <stackRoutes.Screen name="MedicamentSave" component={MedicamentSave}/>

                <stackRoutes.Screen name="MyMedicaments" component={AuthRoutes}/>
            
        </stackRoutes.Navigator>
    );
};

export default AppRoutes;