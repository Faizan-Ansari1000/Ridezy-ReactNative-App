import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "../../screens/client/Home";
import FAIcon from "../../components/FAIcon";
import History from "../../screens/client/History";
import Setting from "../../screens/client/Setting";
import Profile from "../../screens/client/Profile";
import LocationForm from "../../screens/client/location/LocationForm";


export default function UserTab() {

    const Tab = createBottomTabNavigator();

    // #641e16
    return (
        <>
            <Tab.Navigator initialRouteName="Main" screenOptions={{ tabBarActiveTintColor: "#641e16", tabBarInactiveTintColor: "#bdc3c7", tabBarStyle: { height: 60, backgroundColor: "#f8f9f9", paddingTop: 5, },headerStyle:{backgroundColor:'#eaeded'} }}>
                <Tab.Screen name="Main" component={Home} options={{ headerBackButtonDisplayMode: true, headerTitleAlign: 'center', tabBarIcon: ({ focused }) => <FAIcon name="home" size={24} color={focused ? "#641e16" : "#bdc3c7"} /> }} />
                <Tab.Screen name="History" component={History} options={{ headerTitleAlign: 'center', tabBarIcon: ({ focused }) => <FAIcon name="history" size={24} color={focused ? "#641e16" : "#bdc3c7"} /> }} />
                <Tab.Screen name="Ride" component={LocationForm} options={{ headerTitleAlign: 'center', tabBarIcon: ({ focused }) => <FAIcon name="electric-car" size={24} color={focused ? "#641e16" : "#bdc3c7"} /> }} />
                <Tab.Screen name="Profile" component={Profile} options={{ headerTitleAlign: 'center', tabBarIcon: ({ focused }) => <FAIcon name="person" size={24} color={focused ? "#641e16" : "#bdc3c7"} /> }} />
            </Tab.Navigator>

        </>
    )
}