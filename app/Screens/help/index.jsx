import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { router } from 'expo-router';
import emailjs from '@emailjs/react-native';

const HelpAndSupportScreen = ({ navigation }) => {
 const [expandedFAQ, setExpandedFAQ] = useState(null);
 const [supportMessage, setSupportMessage] = useState('');
 
 const handleFAQToggle = (index) => {
   setExpandedFAQ(expandedFAQ === index ? null : index);
 };

 const handleSupportMessageSubmit = () => {
   if (supportMessage.trim() === '') {
     Alert.alert('Error', 'Please enter a message before submitting.');
   } else {
     // Implement logic to submit the support message to the development team
     console.log('Support Message:', supportMessage);
     const templateParams = {
      from_name: 'User',
      message:supportMessage,
      mail: "curentlyalert@gmail.com"
      
    };
    
    emailjs
      .send('service_b10t7ds', 'template_ng26hw8', templateParams, {
        publicKey: 'GbpViC0snr4prf6Zz',
        
      })
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          
        },
        (err) => {
          console.log('FAILED...', err);
        },
      );
    
     setSupportMessage('');
     Alert.alert('Success', 'Your message has been sent successfully.');
   }
 };

 const faqs = [
   {
     question: 'How can I track my energy consumption?',
     answer: 'Our app allows you to easily track your energy consumption by connecting to your utility provider\'s account or manually entering meter readings.',
   },
   {
     question: 'Can I set energy saving goals?',
     answer: 'Yes, you can set personalized energy saving goals and track your progress within the app.',
   },
   {
     question: 'How often is the energy consumption data updated?',
     answer: 'The energy consumption data is updated daily, ensuring you have the most up-to-date information.',
   },
   {
     question: 'Can I view historical data?',
     answer: 'Absolutely! You can view your energy consumption data for previous months and years, allowing you to analyze trends and patterns.',
   },
   {
     question: 'Is my data secure?',
     answer: 'We take data security very seriously. Your information is encrypted and stored securely on our servers.',
   },
 ];

 return (
   <SafeAreaView style={styles.container}>
     <View style={styles.header}>
       <TouchableOpacity onPress={() => router.replace('/Settings')}>
         <Icon name="arrow-back" size={24} color="#2196F3" />
       </TouchableOpacity>
       <Text style={styles.headerTitle}>Help and Support</Text>
     </View>

     <View style={styles.helpSection}>
       <Text style={styles.sectionTitle}>Help</Text>
       {faqs.map((faq, index) => (
         <TouchableOpacity
           key={index}
           style={styles.faqContainer}
           onPress={() => handleFAQToggle(index)}
           activeOpacity={0.7}
         >
           <View style={styles.faqHeader}>
             <Text style={styles.faqQuestion}>{faq.question}</Text>
             <Icon
               name={expandedFAQ === index ? 'expand-less' : 'expand-more'}
               size={24}
               color="#2196F3"
             />
           </View>
           {expandedFAQ === index && (
             <Text style={styles.faqAnswer}>{faq.answer}</Text>
           )}
         </TouchableOpacity>
       ))}
     </View>

     <View style={styles.supportSection}>
       <Text style={styles.sectionTitle}>Support</Text>
       <Text style={styles.supportDescription}>
         Have an issue or concern? Share it with us below, and our team will assist you promptly.
       </Text>
       <TextInput
         style={styles.supportInput}
         multiline
         placeholder="Write your complaint or feedback here..."
         value={supportMessage}
         onChangeText={setSupportMessage}
         placeholderTextColor="#2196F3"
       />
       <TouchableOpacity
         style={styles.sendButton}
         onPress={handleSupportMessageSubmit}
       >
         <Text style={styles.sendButtonText}>Send</Text>
       </TouchableOpacity>
     </View>
   </SafeAreaView>
 );
};

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
   padding: 16,
 },
 header: {
   flexDirection: 'row',
   alignItems: 'center',
   marginBottom: 16,
   marginTop:26
 },
 headerTitle: {
   fontSize: 18,
   fontWeight: 'bold',
   marginLeft: 16,
   fontFamily: 'OpenSans-Variable',
 },
 helpSection: {
   marginBottom: 24,
 },
 supportSection: {
   flex: 1,
 },
 sectionTitle: {
   fontSize: 20,
   fontWeight: 'bold',
   color: '#2196F3',
   marginBottom: 16,
   fontFamily: 'OpenSans-Variable',
 },
 faqContainer: {
   backgroundColor: '#f5f5f5',
   padding: 16,
   borderRadius: 8,
   marginBottom: 8,
 },
 faqHeader: {
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'space-between',
 },
 faqQuestion: {
   fontSize: 16,
  
   color: '#000',
   flex: 1,
   fontFamily: 'OpenSans-Variable',
 },
 faqAnswer: {
   fontSize: 14,
   color: '#000',
   marginTop: 8,
   fontFamily: 'OpenSans-Variable',
 },
 supportDescription: {
   fontSize: 14,
   color: '#000',
   marginBottom: 8,
   fontFamily: 'OpenSans-Variable',
 },
 supportInput: {
   height: 120,
   borderWidth: 1,
   borderColor: '#2196F3',
   borderRadius: 8,
   padding: 12,
   marginBottom: 16,
   textAlignVertical: 'top',
   color: '#000',
 },
 sendButton: {
   backgroundColor: '#2196F3',
   paddingVertical: 12,
   paddingHorizontal: 24,
   borderRadius: 8,
   alignSelf: 'flex-end',
 },
 sendButtonText: {
   color: '#fff',
   fontSize: 16,
   
   fontFamily: 'OpenSans-Variable',
 },
});

export default HelpAndSupportScreen;