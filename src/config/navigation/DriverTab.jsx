import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import FAIcon from "../../components/FAIcon";
import Driver from "../../screens/store/Driver";
import RequestRides from "../../screens/store/RequestRides";
import AppHelp from "../../screens/store/AppHelp";
import { StatusBar } from "react-native";


export default function DriverTab() {

    const Tab = createBottomTabNavigator();


    // #641e16
    return (
        <>
            <StatusBar translucent barStyle={'dark-content'} backgroundColor={'transparent'} />
            <Tab.Navigator initialRouteName="Rides" screenOptions={{ tabBarActiveTintColor: "#641e16", tabBarInactiveTintColor: "#bdc3c7", tabBarStyle: { height: 60, backgroundColor: "#f8f9f9", paddingTop: 5, } }}>
                <Tab.Screen name="Rides" component={RequestRides} options={{ headerBackButtonDisplayMode: true, headerTitleAlign: 'center', tabBarIcon: ({ focused }) => <FAIcon name="home" size={24} color={focused ? "#641e16" : "#bdc3c7"} /> }} />
                <Tab.Screen name="Query" component={AppHelp} options={{ headerTitleAlign: 'center', tabBarIcon: ({ focused }) => <FAIcon name="help" size={24} color={focused ? "#641e16" : "#bdc3c7"} /> }} />
                <Tab.Screen name="Person" component={Driver} options={{ headerTitleAlign: 'center', tabBarIcon: ({ focused }) => <FAIcon name="person" size={24} color={focused ? "#641e16" : "#bdc3c7"} /> }} />
            </Tab.Navigator>

        </>
    )
}