import {createDrawerNavigator} from 'react-navigation-drawer'
import {AppTabNavigator} from './AppTabNavigator'
import  CustomSideBarMenu from './AppTabNavigator'
import SettingScreen from '../screens/SettingScreen'
import MyDonationScreen from '../screens/MyDonationScreen'

export const AppDrawerNavigator =createDrawerNavigator({
    Home:{
        screen:AppTabNavigator
    },
   MyDonation: {
       screen:MyDonationScreen
   },
    Setting:{
        screen:SettingScreen
    }
},
{
        contentComponent:CustomSideBarMenu
    },
    {
        initialRouteName:'Home'

})