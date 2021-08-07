

import React, { Component } from 'react';
import { Alert, SnapshotViewIOS, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import firebase from 'firebase'
import db from '../config'

export default class SettingScreen extends Component{
    constructor(){
        super()
            this.state={
                emailId:'',
                firstName:'',
                lastName:"",
                address:"",
                contact:'',
                docId:'' 


            }
        

    }
    getUserDeatils=()=>{
        var email=firebase.auth().currentUser.email
        db.collection('users').where('email_id','==',email).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                var data=doc.data()
                this.setState({
                    emailId:data.email_id,
                    firstName:data.first_name,
                    lastName:data.last_name,
                    address:data.address,
                    contact:data.contact,
                    docId:doc.id
                })
            })
        })
    }
    updateUserDeatils=()=>{
        db.collection('users').docs(this.state.docId)
        .update({
            first_name:this.state.firstName,
            last_name:this.state.lastName,
            contact:this.state.contact,
            address:this.state.address,
        })
        Alert.alert('Profile Updated Successfully')
    }
    componentDidMount(){
        this.getUserDeatils()
    }

   render(){
    return(
        <View style={styles.container}>
                 <Text style={{textAlign:'center'}}>Setting</Text>

                 <View style={styles.formContainer}>
        <TextInput
          style={styles.formTextInput}
          placeholder={'First Name'}
         maxLength={8}
          onChangeText={(text) => {this.setState({firstName:text})}}
          value={this.state.firstName}
        />

        <TextInput
          style={styles.formTextInput}
          placeholder={'Last Name'}
         maxLength={8}
          onChangeText={(text) => {this.setState({lastName:text})}}
          value={this.state.lastName}
        />

        <TextInput
          style={styles.formTextInput}
          placeholder={'contact'}
          keyboardType={'numeric'}
             maxLength={10}
          onChangeText={(text) => {this.setState({contact:text})}}
          value={this.state.contact}
        />

        <TextInput
          style={styles.formTextInput}
          placeholder={'address'}
          multiline={true}
         onChangeText={(text) => {this.setState({address:text})}}
         value={this.state.address}
        />      
       <View>
        <TouchableOpacity 
        style={styles.button}
        onPress={()=>{
            this.updateUserDeatils()
            
        }}>
            <Text style={styles.buttonText}>
                Save
            </Text>
        </TouchableOpacity>
        </View>
        </View>
        </View>
    
    )
    }
}
  

const styles = StyleSheet.create({ container : { flex:1, alignItems: 'center', justifyContent: 'center' }, formContainer:{ flex:1, width:'100%', alignItems: 'center' }, formTextInput:{ width:"75%", height:35, alignSelf:'center', borderColor:'#ffab91', borderRadius:10, borderWidth:1, marginTop:20, padding:10, }, button:{ width:"75%", height:50, justifyContent:'center', alignItems:'center', borderRadius:10, backgroundColor:"#ff5722", shadowColor: "#000", shadowOffset: { width: 0, height: 8, }, shadowOpacity: 0.44, shadowRadius: 10.32, elevation: 16, marginTop:20 }, buttonText:{ fontSize:25, fontWeight:"bold", color:"#fff" } })