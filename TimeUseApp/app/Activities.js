
import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  Keyboard
} from 'react-native';

import {getCurrentActivity, setCurrentActivity} from './Storage'

var _this;
 class Activities extends Component {
    constructor() {
      super();
      _this=this;
      this.state = {
        activities:{Food: ["Cooking", "Eating", "Grocery Shopping", "Purchasing Food"], Personal_Care: ["Showering", "General Grooming", "Beauty Stuff"],
         Entertainment:["Video Games", "TV", "Reddit", "Facebook"],Dog_Care: ["Walking", "General Care"], Other:["Cleaning","Sleeping", "Driving", "At Work[On Task]", "At Work[Distracted]", "At Work[Skype Call]", "Exercise", "Socializing"]}, 
        currentActivity:'none',
        debugMsg:'no message'};
  }

  componentWillMount(){
    getCurrentActivity().then((activity) => {
      this.setState({
        currentActivity: activity
      })
    })
  }
  addActivityToDb(activity){

      var data=`activity=${activity}`
      var request = new XMLHttpRequest();

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
    Keyboard.dismiss();

    if(this.state.currentActivity != selectedActivity){
      _this.setState({
        currentActivity:selectedActivity,
        text:''
      })
      _this.addActivityToDb(selectedActivity)
      setCurrentActivity(selectedActivity);
    }
  }
  render() {
    let column_length = this.state.activities.length
    function buildSubHeadings(heading, index){
        return (
       _this.state.activities[heading].map((activity, index)=>{
              return(
                      <View>
                      {index === 0 ? <Text style={{fontSize:16}}>{heading}</Text> : null}
                      <TouchableHighlight 
                      style={[styles.touchableButton, _this.state.currentActivity === activity ? {backgroundColor:'#99d9f4'}:{ backgroundColor:'#fccc92'}]}
                      underlayColor='#99d9f4'
                      onPress={() => _this.checkChange(activity)}
                      ><Text style={{textAlign:'center'}}>{activity}</Text>
                      </TouchableHighlight>
                      </View>
                  )
           })
        )
    }
    return (
      <View style={styles.container}>
        <Text style={{fontSize:20, paddingBottom:15}}>
          Select an Activity
        </Text>
        <View style={{flexDirection: "row", justifyContent:"space-around", flex:6}}>
        <View style={{flexDirection: "column",  alignItems:'center',justifyContent:"space-around", flex:1}}>
        {this.state.activities &&
          Object.keys(this.state.activities).map((heading, index)=>{
            if(index < 3){
             return buildSubHeadings(heading, index)
            }
          })
        }
        </View>
        <View style={{flexDirection: "column",  alignItems:'center',justifyContent:"space-around", flex:1}}>
        {this.state.activities &&
          Object.keys(this.state.activities).map((heading, index)=>{
            if(index >=3){
              return buildSubHeadings(heading, index)
            }
          })
        }
        <View style={{flexDirection:"row"}}>
        <TextInput
          style={{height: 30,paddingBottom:0, width:95, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          underlineColorAndroid='rgba(0,0,0,0)'
        />
        <TouchableHighlight 
              style={{height:30, paddingTop:5, marginLeft:10, width:35, backgroundColor:'#fccc92'}}
              onPress={() => _this.checkChange(this.state.text)}
        >
        <Text style={{textAlign:'center'}}>Add</Text>
        </TouchableHighlight>

        </View>
        </View>

        </View>

      <Text style={{flex:1.5, marginTop:20, fontSize:18}}>Currently Selected Activity: {this.state.currentActivity}</Text>
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
    width: 140,
    height:30,
    paddingTop:5,
    paddingBottom:10,
    backgroundColor:'#fccc92'
  }

});
export default Activities;