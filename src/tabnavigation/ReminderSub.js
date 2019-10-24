import React from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';
import IconFontAwesome from 'react-native-vector-icons/Ionicons';

import { StyleSheet, Text,FlatList,Alert,View, ScrollView, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
var emailadd=''
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        emailadd=user.email;
        
    } else {
      emailadd='';
    }
  });
export default class MedificationSub extends React.Component {

    static navigationOptions = {
        header: null,

    };
    constructor(props) {
        super(props);
        this.state={
                    marker:[],
                    arrayOnTouch:[],
                    loading:false,
                    medicationName:'',
                    medicationType:'',
                    medicationDosage:'',
                    medicationQuantity:'',
                    medicationNotes:'',
                }
        this.ref= firebase.firestore().collection('Reminder').where('emailAddress','==',emailadd)
    }

    add = () => {
        this.props.navigation.navigate('Reminder');
    }
    renderSeparator = () => {  
        return (  
            <View  
                style={{  
                    height: 4,  
                    width: "100%",  
                    backgroundColor: "white",  
                }}  
            />  
        );  
    }; 
    
    //handles the on press of the flatlist
    //shows the details of the medication name pressed
    getListViewItem = (item) => {
        // this.ref= firebase.firestore().collection('Medication').where('medicationName','==',item.medicationName);
        // this.ref.onSnapshot((querySnapshot)=>{
        //     querySnapshot.forEach((doc) => {
        //         this.setState({medicationName:doc.data().medicationName,
        //                         medicationDosage: doc.data().dosage,
        //                         medicationType: doc.data().medicineType,
        //                         medicationNotes: doc.data().medicinenotes,
        //                         medicationQuantity: doc.data().quantity},)
        //         });
        //     });
        //  Alert.alert('The medicine name is: '+JSON.stringify(this.state.medicationName)
        //             +'\nThe medicine type is: '+JSON.stringify(this.state.medicationType)
        //             +'\nThe medicine dosage is: '+JSON.stringify(this.state.medicationDosage)
        //             +'\nThe medicine quanity is: '+JSON.stringify(this.state.medicationQuantity)
        //             +'\nAdditional medicine notes: '+JSON.stringify(this.state.medicationNotes));
        Alert.alert('This flatllist element has been touched.')
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
                    marker: markers.sort((a, b) => {
                        return (a.medicationName < b.medicationName);
                    }),
                    loading: false,
                });
            });
    }
    render() {
        return (
           <SafeAreaView>
             
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.button}  onPress={this.add}
                       >
                           <IconFontAwesome style={[{ color:'#00806b' }]} size={22} name={'md-add-circle-outline'}/>
                        <Text style={styles.buttonText} > Add Reminder</Text>
                    </TouchableOpacity>
                    </View>
                      <ScrollView>
                    <FlatList  
                    data={this.state.marker}
                    renderItem={({item}) =>  
                    <TouchableOpacity   onPress={this.getListViewItem.bind(this, item)}>
                        <View style={styles.flatlist} >
                              <IconFontAwesome style={[{ color:'#00806b' }]} size={22} name={'md-alarm'} />
                        <Text  style={styles.flatlisttext}
                            >  {item.medicationName}</Text>
                              </View>
                              </TouchableOpacity>}  
                    ItemSeparatorComponent={this.renderSeparator}  
                /> 
                {!!this.state.error && (
                <Text>
                Error message: {this.state.error}
                </Text>
                )}
                
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
         paddingTop:30,
        paddingBottom:25
    },
    buttonText: {
        fontSize: 22,
        fontWeight: '500',
        color: '#00806b',
        textAlign: 'center', justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        flex: 1, flexDirection: 'row',
        width: 300,
        backgroundColor: 'white',
        borderRadius: 15,
        marginVertical: 14,
        paddingVertical: 13,
        alignItems: 'center',
        justifyContent: 'center',
       
    },
    flatlist: {  
        flexDirection:'row',
        padding: 10,  
        fontSize: 18,  
        height: 44,  
        backgroundColor:'#e8eaf6',
        color:   '#00806b',
    },  
    flatlisttext:{
         fontSize: 18,  
        height: 44,  
        color:   '#00806b',

    }
});
