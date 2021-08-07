import React from 'react';
import { StyleSheet, Text, View ,Image, Alert, Touchable, TouchableOpacity} from 'react-native';
import  firebase from 'firebase'
import db from "../config"
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { Card } from 'react-native-elements/dist/card/Card';
import { Header } from 'react-native-elements';

export default class RecieverDeatailsScreen extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        userId:firebase.auth().currentUser.email,
       bookName:this.props.navigation.getParam('details')['book_name'],
       recieverId:this.props.navigation.getParam('details')['user_id'],
       requestId:this.props.navigation.getParam('details')['request_id'],
       reason_for_requesting :this.props.navigation.getParam('details')['reason_to_request'],
        recieverName:"",
        recieverContact:'',
        recieverRequestDocId:'',

      }
    }
    getRecieverDetails=()=>{
      db.collection('users').where('email_id','==',this.state.recieverId).get()
      .then(snapshot=>{
          snapshot.forEach(doc=>{
              var data=doc.data()
              this.setState({
                  recieverName:data.first_name,
                recieverAddress:data.address,
                  recieverContact:data.contact,
                 
              })
          })
      })
      db.collection('requested_books').where('request_id','==',this.state.requestId).get()
      .then(snapshot=>{
          snapshot.forEach(doc=>{
            this.setState({
              recieverRequestDocId:doc.id
            })
          })
        })
      }
      updateBookStatus=()=>{
        db.collection('all_donations').add({
            book_name:this.state.bookName,
            request_id:this.state.requestId,
            requested_by:this.state.recieverName,
            donar_id:this.state.userId,
            request_status:'Donor Intrested'
        })
        }
    componentDidMount(){
        this.getRecieverDetails()
    } 
   
    render(){
  return(   
    <View style={styles.container}>      
      <View style={{flex:0.1}}>      
    <Header leftComponent={<Icon name='arrow-left' type='feather' colour='#696969' onPress={()=>this.props.navigation.goBack()}/>}
   centerComponent={{text:'donate books' , style:{color:'#90A5A9',fontSize:20}}} />
   </View>

   <View style={{flex:0.3}}> 
   <Card title={'book information'} titleStyle={{fontSize:20}}>
     <Card>
       <Text style={{fontWeight:'bold'}}>{this.state.bookName}</Text>
     </Card>
     <Card>
       <Text style={{fontWeight:'bold'}}>{this.state.reasonToRequest}</Text>
     </Card>
      </Card>
   </View>


   <View style={{flex:0.3}}> 
   <Card title={'reciever information'} titleStyle={{fontSize:20}}>
     <Card>
       <Text style={{fontWeight:'bold'}}>{this.state.recieverName}</Text>
     </Card>
     <Card>
       <Text style={{fontWeight:'bold'}}>{this.state.recieverContact}</Text>
     </Card>
      </Card>
   </View>
 <View style={styles.buttonContainer}>
{this.state.recieverId!==this.state.userId?(
        
      <TouchableOpacity style={styles.button} onPress={()=>{
        this.updateBookStatus()
        this.props.navigation.navigate("MyDonations")
      }}>
        <Text>I want to donote</Text>
      </TouchableOpacity>
):null
    }
      </View>
      </View>

  )
    }
  }
  const styles = StyleSheet.create({ container: { flex:1, },
   buttonContainer : { flex:0.3, justifyContent:'center', alignItems:'center' },
   button:{ width:200, height:50, justifyContent:'center', alignItems : 'center', 
   borderRadius: 10, backgroundColor: 'orange', shadowColor: "#000", 
   shadowOffset: { width: 0, height: 8 },
    elevation : 16 } })