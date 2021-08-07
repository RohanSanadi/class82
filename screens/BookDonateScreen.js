import React from 'react';
import { StyleSheet, Text, View ,Image, Alert, Touchable, TouchableOpacity, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements'
import  firebase from 'firebase'
import db from "../config"

export default class BookDonateScreen extends React.Component {
    constructor(){
      super();
      this.state = {
        requestedBooksList:[]
      }
      this.requestRef=null;
    }
    getRequestedBookList=()=>{
        this.requestRef=db.collection('requested_books')
        .onSnapshot((snapshot)=>{
            var requestedBooksList=snapshot.docs.map(document=>document.data())
            this.setState({
                requestedBooksList:requestedBooksList
            
            })
        })
    } 
    componentDidMount(){
        this.getRequestedBookList()
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
            subtitle={item.reson_to_request}
            titleStyle={{color:'black',fontWeight:'bold'}}
    rightElment={
<TouchableOpacity style={styles.button} onPress={()=>{
    this.props.navigation.navigate('RecieverDetails',{'details':item})
}}>
    <Text style={{color:'#ffff'}}>View</Text>
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
                    this.state.requestedBooksList.length===0
                    ?(

                        <View style={styles.subContainer}>
                            <Text style={{fontSize:20}}>
                                List of all requested books 
                            </Text>
                        </View>
                    )
                    :(
                        <FlatList
                        keyExtractor={this.keyExtractor}
                        data={this.state.requestedBooksList}
                        renderItem={this.renderItem}

                        />
                    )
                }

                </View>
            </View>
        )
    }

}
const styles = StyleSheet.create({ subContainer:{ flex:1, fontSize: 20, justifyContent:'center', alignItems:'center' }, button:{ width:100, height:30, justifyContent:'center', alignItems:'center', backgroundColor:"#ff5722", shadowColor: "#000", shadowOffset: { width: 0, height: 8 } } })