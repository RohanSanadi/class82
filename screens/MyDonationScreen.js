import React from 'react';
import { StyleSheet, Text, View ,Image, Alert, Touchable, TouchableOpacity, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements'
import  firebase from 'firebase'
import db from "../config"

export default class MyDonationScreen extends React.Component {
    constructor(){
      super();
      this.state = {
          userId:firebase.auth().currentUser.email,
    allDonations:[]
      }
      this.requestRef=null;
    }
    getAllDonations=()=>{
        this.requestRef=db.collection('all_donations').where('donor_id','==',this.state.userId)
        .onSnapshot((snapshot)=>{
            var allDonations=snapshot.docs.map(document=>document.data())
            this.setState({
                allDonations:allDonations
            })
        })
    } 
    componentDidMount(){
        this.getAllDonations()
    }
    componentWillUnmount(){
        this.requestRef()
    }
    keyExtractor=(item,index)=>index.toString()
    renderItem=({item,i})=>{
        return(
            <ListItem 
            key={i} 
            title ={item.book_name}
            subtitle={item.requested_by+'status: '+item.reques_status}
            titleStyle={{color:'black',fontWeight:'bold'}}
    rightElment={
<TouchableOpacity style={styles.button} onPress={()=>{
    
}}>
    <Text style={{color:'#ffff'}}>Send book</Text>
</TouchableOpacity>
    }
    bottomDivider
                />
        )
    }
    render(){
        return(
            <View>
                <View style={{flex:1}}>{
                    this.state.allDonations.length===0
                    ?(

                        <View style={styles.subtitle}>
                            <Text style={{fontSize:20}}>
                                List of all book donation 
                            </Text>
                        </View>
                    )
                    :(
                        <FlatList
                        keyExtractor={this.keyExtractor}
                        data={this.state.allDonations}
                        renderItem={this.renderItem}

                        />
                    )
                }

                </View>
            </View>
        )
    }

}
const styles = StyleSheet.create({ button:{ width:100, height:30, justifyContent:'center', 
alignItems:'center', backgroundColor:"#ff5722", shadowColor: "#000",
 shadowOffset: { width: 0, height: 8 }, elevation : 16 }, 
 subtitle :{ flex:1, fontSize: 20, justifyContent:'center', alignItems:'center'
 } })