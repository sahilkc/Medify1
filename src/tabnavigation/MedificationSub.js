import React from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';
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
        this.ref= firebase.firestore().collection('Medication').where('emailAddress','==',emailadd)
    }
    add = () => {
        this.props.navigation.navigate('Medication');
    }
    renderSeparator = () => {  
        return (  
            <View  
                style={{  
                    height: 1,  
                    width: "100%",  
                    backgroundColor: "#000",  
                }}  
            />  
        );  
    }; 
    
    //handles the on press of the flatlist
    //shows the details of the medication name pressed
    getListViewItem = (item) => {
        this.ref= firebase.firestore().collection('Medication').where('medicationName','==',item.medicationName);
        this.ref.onSnapshot((querySnapshot)=>{
            querySnapshot.forEach((doc) => {
                this.setState({medicationName:doc.data().medicationName,
                                medicationDosage: doc.data().dosage,
                                medicationType: doc.data().medicineType,
                                medicationNotes: doc.data().medicinenotes,
                                medicationQuantity: doc.data().quantity},)
                });
            });
         Alert.alert('The medicine name is: '+JSON.stringify(this.state.medicationName)
                    +'\nThe medicine type is: '+JSON.stringify(this.state.medicationType)
                    +'\nThe medicine dosage is: '+JSON.stringify(this.state.medicationDosage)
                    +'\nThe medicine quanity is: '+JSON.stringify(this.state.medicationQuantity)
                    +'\nAdditional medicine notes: '+JSON.stringify(this.state.medicationNotes));
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
                <ScrollView>
                    <View style={styles.container}>
                        <Text>flat list goes here</Text>
                    </View>
                    <FlatList  
                    data={this.state.marker}
                    renderItem={({item}) =>  
                        <Text style={styles.item}  
                              onPress={this.getListViewItem.bind(this, item)}>{item.medicationName}</Text>}  
                    ItemSeparatorComponent={this.renderSeparator}  
                /> 
                {!!this.state.error && (
                <Text>
                Error message: {this.state.error}
                </Text>
                )}
                 <TouchableOpacity style={styles.button}
                        onPress={this.add} >
                        <Text style={styles.buttonText} >Add Medification</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center', justifyContent: 'center',
        alignItems: 'center',
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
    item: {  
        padding: 10,  
        fontSize: 18,  
        height: 44,  
        backgroundColor:'#00806b',
        color:   '#ffffff',
    },  
});