import React from 'react';
import { StyleSheet, Text, View ,Image, Alert, Touchable, TouchableOpacity, FlatList} from 'react-native';
import {ListItem ,Header,Icon} from 'react-native-elements'
import  firebase from 'firebase'
import db from "../config"
const MyHeader=props=>{
    return(
        <Header bars={<Icon name='arrow-left' type='font-awsome' colour='#696969' onPress={()=>props.navigation.toggleDrawer()}/>}
        centerComponent={{text:props.title , style:{color:'#90A5A9',fontSize:20,fontWeight:'bold'}}
    } 
    backgroundColor='#EAF8FE'/>
    )
}