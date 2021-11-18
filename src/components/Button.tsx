   import React from "react";

   import {
       TouchableOpacity,
       TouchableOpacityProps,
       Text,
       StyleSheet 
    } from "react-native";

    import colors from "../styles/colors";
    import fonts from "../styles/fonts";

    interface ButtonProps extends TouchableOpacityProps {
        title: string;
    }

    export function Button({title, ...rest} : ButtonProps){
        return(
            <TouchableOpacity style={styles.container} activeOpacity={0.7} {...rest} >
                <Text style={styles.text}>
                    {title}
                </Text>
            </TouchableOpacity>
    );
}

   const styles = StyleSheet.create({
   container: {
    backgroundColor: colors.blue,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center'
},

text: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.heading
}
   });