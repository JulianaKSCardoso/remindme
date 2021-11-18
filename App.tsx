import React, { useEffect } from "react";
import AppLoading from "expo-app-loading";
import * as Notifications from 'expo-notifications';

import Routes from "./src/routes";

import { useFonts, Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { MedicamentProps } from "./src/libs/storage";
import { Welcome } from "./src/pages/Welcome";
import { UserIdentification } from "./src/pages/UserIdentification";


export default function App(){
  const [ fontLoaded ] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium
  });

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      async notification => {
        const data = notification.request.content.data.medicament as MedicamentProps;
        console.log(data);
    });

    return () => subscription.remove();

  }, [])

if (!fontLoaded)
  return <AppLoading/>

  return(
    <UserIdentification />
  )
}

