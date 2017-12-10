
import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import {getCurrentActivity, setCurrentActivity} from './Storage'

var _this;
 class Activities extends Component {
    constructor() {
      super();
      _this=this;
      this.state = {
        activities: ["Cooking", "Eating", "Hygiene", "Beauty Stuff", "Sleeping", "Video Games", "Social Media", "TV", "Driving", "At Work", 
        "Dog Care", "Working Out", "In Bed Trying to Sleep", "Shopping"],
        currentActivity:'none',
        debugMsg:'no message'};
  }

  componentWillMount(){
    getCurrentActivity().then((activity) => {
      this.setState({
        currentActivity: activity
      })
    })

    let activities=this.state.activities;
    activities.sort((a, b)=>{
      return a-b
    })

    this.setState({
      activities:activities
    })
  }
  addActivityToDb(activity){

      var data=`activity=${activity}`
      var request = new XMLHttpRequest();

      console.log(data)
      request.open("POST", "http://sarahzsohar.com/postData");
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      request.send(data);
      request.onload = function() {
          if (!request.status=="200") {
            this.setState({
              errorMessage:"Something Went Wrong"
            })
          }
      }
      
  }
  checkChange(selectedActivity){
    if(this.state.currentActivity != selectedActivity){
      _this.setState({
        currentActivity:selectedActivity
      })
      _this.addActivityToDb(selectedActivity)
      setCurrentActivity(selectedActivity);
    }
  }
  render() {
    let column_length = this.state.activities.length
    return (
      <View style={styles.container}>
        <Text style={{fontSize:20, paddingBottom:15}}>
          Select an Activity
        </Text>
        <View style={{flexDirection: "row", justifyContent:"space-around", flex:6}}>
        <View style={{flexDirection: "column",  alignItems:'center',justifyContent:"space-around", flex:1}}>
        {this.state.activities &&
          this.state.activities.map((activity, index)=>{
            if(index < 7){
               return(
                  <TouchableHighlight 
                  style={styles.touchableButton}
                  underlayColor='#99d9f4'
                  onPress={() => this.checkChange(activity)}
                  ><Text style={{textAlign:'center'}}>{activity}</Text>
                  </TouchableHighlight>
               )
            }
          })
        }
        </View>
        <View style={{flexDirection: "column", alignItems:'center',justifyContent:"space-around", flex:1}}>
        {this.state.activities &&
          this.state.activities.map((activity, index)=>{
         
            if(index >= 7){
                 return(
             <TouchableHighlight 
             underlayColor='#99d9f4'
             style={styles.touchableButton}
             onPress={() => this.checkChange(activity)}
             ><Text style={{textAlign:'center'}}>{activity}</Text>
            </TouchableHighlight>
                 )
            }
          })
        }
        </View>
        </View>

      <Text style={{flex:1.5, fontSize:14}}>Currently Selected Activity: {this.state.currentActivity}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:25,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  touchableButton:{
    width: 180,
    height:50,
    paddingTop:5,
    paddingBottom:10,
    backgroundColor:'#fccc92'
  }

});
export default Activities;