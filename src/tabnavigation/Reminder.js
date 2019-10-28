import React from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { StyleSheet,Alert, Text,PickerAndroid, View, Button, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker';
var today=new Date();
var emailadd=''
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        emailadd=user.email;
        
    } else {
      emailadd='';
    }
  });

export default class Medication extends React.Component {
    static navigationOptions = {
        header: null,
    };
    add = () => {
        this.props.navigation.goBack()
    }
    constructor(props){
        super(props)
   this.state = {
       marker:[],
        date: '',
        time: '',
        nameOfMedication: '',
        numberofdays: '',
    };
    this.ref= firebase.firestore().collection('Medication').where('emailAddress','==',emailadd)
}
componentDidMount()
{
       
        this.ref.onSnapshot((querySnapshot)=>{
            const markers = [];
            querySnapshot.forEach((doc) => {
                markers.push({
                    medicationName: doc.data().medicationName
                });
            });
            this.setState({
                marker: markers,
                loading: false,
            });
        });
}
    render(){
        return (
            <ScrollView>
                < KeyboardAvoidingView style={styles.container}>

                    {/* <Dropdown
                        label='Medicine name'
                        data={data}
                        containerStyle={{
                            paddingTop: 30,
                            width: 320,
                            width: 300,
                            marginBottom: 40,
                            fontSize: 16,
                            borderRadius: 5,
                            color: '#00806b',
                        }}
                        ref='mname'
                        onSubmitEditing={() => this.refs.date.focus()}
                        onChangeText={(nameOfMedication) => this.setState({ nameOfMedication })}
                    /> */}
                    <TextInput
                        style={{
                            flexGrow: 1,
                            height: 43, width: 320,
                            borderColor: '#00806b',
                            borderWidth: 1,
                            marginBottom: 20,
                            fontSize: 16,
                            borderRadius: 5,
                            color: '#00806b',
                            marginLeft: 10,
                            marginRight: 10,
                            marginTop: 5
                        }}
                        placeholder=" Name of medication"
                        underlineColorAndroid="transparent"
                        ref='noofdays'
                        onSubmitEditing={() => this.refs.time.focus()}
                        onChangeText={(nameOfMedication) => this.setState({ nameOfMedication })}
                    />
                    <View style={{ flexDirection: 'row', }}>
                        <Text style={{
                            fontSize: 19,
                            paddingTop: 18,
                            paddingBottom: 10,
                            paddingLeft: -20,
                            color: '#00806b'
                        }}>Date: </Text>
                        <DatePicker
                            style={{
                                width: 270,
                                paddingTop: 10,
                                paddingBottom: 20,
                                marginBottom: 15
                            }}
                            date={this.state.date}
                            mode="date"
                            placeholder="Select date"
                            format="YYYY-MM-DD"
                            minDate={today}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"

                            customStyles={{
                                placeholderText: {
                                    fontSize: 17,
                                    color: 'grey',
                                },
                                dateText: {
                                    fontSize: 17,
                                    color: '#00806b',

                                },
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    width: 300,
                                    borderColor: '#00806b',
                                    borderRadius: 5,
                                },
                                dateTouchBody: {
                                    width: 250,

                                }
                            }}
                            ref='date'
                            onSubmitEditing={() => this.refs.noofdays.focus()}
                            onDateChange={(date) => { this.setState({ date: date }) }}
                        />
                    </View>
                    <TextInput
                        style={{
                            flexGrow: 1,
                            height: 43, width: 320,
                            borderColor: '#00806b',
                            borderWidth: 1,
                            marginBottom: 20,
                            fontSize: 16,
                            borderRadius: 5,
                            color: '#00806b',
                            marginLeft: 10,
                            marginRight: 10,
                            marginTop: 5
                        }}
                        placeholder=" No of days"
                        keyboardType='numeric'
                        underlineColorAndroid="transparent"
                        ref='noofdays'
                        onSubmitEditing={() => this.refs.time.focus()}
                        onChangeText={(numberofdays) => this.setState({ numberofdays })}
                    />

                    <View style={{ flexDirection: 'row', }}>
                        <Text style={{
                            fontSize: 19,
                            paddingTop: 18,
                            paddingBottom: 10,
                            paddingLeft: -20,
                            color: '#00806b'
                        }}>Time: </Text>
                        <DatePicker
                            style={{
                                width: 270,
                                paddingTop: 10,
                                paddingBottom: 30,
                            }}
                            date={this.state.time}
                            mode="time"
                            placeholder="Select time"
                            iconSource={require('../images/t1.png')}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                placeholderText: {
                                    fontSize: 17,
                                    color: 'grey',
                                },
                                dateText: {
                                    fontSize: 17,
                                    color: '#00806b',

                                },
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    width: 300,
                                    borderColor: '#00806b',
                                    borderRadius: 5,
                                },
                                dateTouchBody: {
                                    width: 250,

                                }

                            }}
                            ref='time'

                            onDateChange={(time) => { this.setState({ time: time }) }}
                        />
                    </View>
                    <View style={styles.signupTextCont}>
                        <TouchableOpacity style={styles.button} onPress={this.add} >
                            <Text style={styles.buttonText} >ADD</Text>
                        </TouchableOpacity>
                    </View>
                </ KeyboardAvoidingView>
            </ScrollView>
        );
    }
    add=()=>
    {   
        var gottenDate=new Date(this.state.date);
        
        var gottennumberofdays=parseInt(this.state.numberofdays);
        var gottenTime=new Date('1970-01-01T'+this.state.time+'Z');
        var gottenDate1=new Date(gottenDate.getFullYear(),gottenDate.getMonth(),gottenDate.getDate(),gottenTime.getHours(),gottenTime.getMinutes(),gottenTime.getSeconds(),0) 
        let i=0;
          for(i;i<gottennumberofdays;i++)
          {
            
        }
        Alert.alert(JSON.stringify(gottenDate1));
       
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    button: {
        width: 300,
        backgroundColor: '#00806b',
        borderRadius: 15,
        marginVertical: 14,
        paddingVertical: 13,
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center', justifyContent: 'center',
        alignItems: 'center',
    }
});