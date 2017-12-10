import { AsyncStorage } from "react-native";

export const storage= {
    ACTIVITY:'@ReactNative:activity'
}
export const setCurrentActivity = async (selectedActivity) =>{
    try {
         await AsyncStorage.setItem(storage.ACTIVITY, selectedActivity);
    } catch (error) {}
}
export const getCurrentActivity = async () => {
    try {
        const value =  await AsyncStorage.getItem(storage.ACTIVITY);
         if (value !== null){
            return value
         }else{
             return "hello"
         }
    } catch (error) { }
}