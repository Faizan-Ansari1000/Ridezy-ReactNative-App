import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoarding1 from '../../screens/OnBoarding/OnBoarding1';
import { StatusBar } from 'react-native';
import Splash from '../../screens/OnBoarding/Splash';
import OnBoarding2 from '../../screens/OnBoarding/OnBoarding2';
import OnBoarding3 from '../../screens/OnBoarding/OnBoarding3';
import SignUp from '../../auth/SignUp';
import Toast from 'react-native-toast-message';
import Welcome from '../../screens/OnBoarding/Welcome';
import Login from '../../auth/Login';
import Account from '../../auth/Account';
import ForgetPassword from '../../auth/ForgetPassword';
import UserTab from './UserTab';
import Success from '../../screens/client/Success';
import Approvel from '../../screens/client/Approvel';
import DriverTab from './DriverTab';
import TopTabNavigation from './TopTab';
import DriverCompleteDetail from '../../screens/store/DriverCompleteDetail';
import DriverDetail from '../../screens/store/DriverDetail';
import EditDetail from '../../screens/store/EditDetail';
import SpecificDriverDetail from '../../screens/client/SpecificDriverDetail';
import AdminTab from './AdminTab';
import UserDetail from '../../screens/admin/UserDetail';
import DetailDriver from '../../screens/admin/DetailDriver';
import AdminProfile from '../../screens/admin/AdminProfile';
import ProfileEdit from '../../screens/client/ProfileEdit';
import Setting from '../../screens/client/Setting';
import About from '../../screens/client/About';



export default function AppNavigation() {

    const Stack = createNativeStackNavigator()

    return (
        <>
            <StatusBar translucent barStyle={'dark-content'} backgroundColor={'transparent'} />
            <NavigationContainer>

                {/* OnBoardings */}
                <Stack.Navigator initialRouteName='Splash' screenOptions={{ headerTitleAlign: 'center' }}>
                    <Stack.Screen options={{ headerShown: false }} name='Splash' component={Splash} />
                    <Stack.Screen options={{ headerShown: false }} name='OnBoarding1' component={OnBoarding1} />
                    <Stack.Screen options={{ headerShown: false }} name='OnBoarding2' component={OnBoarding2} />
                    <Stack.Screen options={{ headerShown: false }} name='OnBoarding3' component={OnBoarding3} />
                    <Stack.Screen options={{ headerShown: false }} name='Welcome' component={Welcome} />
                    <Stack.Screen options={{ headerShown: false }} name='Setting' component={Setting} />
                    {/* Success */}
                    <Stack.Screen options={{ headerShown: false }} name='Success' component={Success} />

                    {/* Auth */}
                    <Stack.Screen options={{ headerShown: false }} name='SignUp' component={SignUp} />
                    <Stack.Screen options={{ headerShown: false }} name='Login' component={Login} />
                    <Stack.Screen options={{ headerShown: false }} name='Account' component={Account} />
                    <Stack.Screen options={{ headerShown: false }} name='ForgetPassword' component={ForgetPassword} />

                    {/* Client */}
                    <Stack.Screen options={{ headerTitleAlign: 'center' }} name='Approvel' component={Approvel} />
                    <Stack.Screen name='ProfileEdit' component={ProfileEdit} />
                    <Stack.Screen name='About' component={About} />

                    {/* UserTab Navigation  */}
                    <Stack.Screen options={{ headerShown: false }} name='Home' component={UserTab} />

                    {/* Top Tab */}
                    <Stack.Screen options={{ headerShown: false }} name='TopTab' component={TopTabNavigation} />

                    {/* Driver */}
                    <Stack.Screen options={{ headerShown: false, headerTitleAlign: 'center' }} name='RequestRides' component={DriverTab} />
                    <Stack.Screen options={{ headerShown: false }} name='DriverCompleteDetail' component={DriverCompleteDetail} />
                    <Stack.Screen name='DriverDetail' component={DriverDetail} />
                    <Stack.Screen name='EditDetail' component={EditDetail} />
                    <Stack.Screen name='SpecificDriverDetail' component={SpecificDriverDetail} />

                    {/* Admin  */}
                    <Stack.Screen options={{ headerShown: false }} name='Admin' component={AdminTab} />
                    <Stack.Screen name='UserDetail' component={UserDetail} />
                    <Stack.Screen name='DetailDriver' component={DetailDriver} />
                    <Stack.Screen name='AdminProfile' component={AdminProfile} />

                </Stack.Navigator>
                <Toast />
            </NavigationContainer>
        </>
    )
}