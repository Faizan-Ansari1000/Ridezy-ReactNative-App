import { Text, View } from "react-native";
import AppNavigation from "./src/config/navigation/AppNavigation";
import { useEffect } from "react";
import { notificationListener, requestUserPermission } from "./android/app/src/fcmHelper";

export default function App() {

  useEffect(() => {
    requestUserPermission();
    notificationListener();
  }, []);

  return (
    <>
      <AppNavigation />
    </>
  )
}