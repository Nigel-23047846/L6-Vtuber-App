import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select'; // Make sure you install this package
import { datasource } from './Data.js';

const Add = ({ navigation }) => {
    // State for the new VTuber fields
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [company, setCompany] = useState(datasource[0].company); // Default to the first company

    const handleSubmit = () => {
        // Create the new VTuber object
        const newVTuber = {
            name,
            image,
            description,
        };

        // Find the company section and add the new VTuber
        const companyIndex = datasource.findIndex((section) => section.company === company);
        if (companyIndex !== -1) {
            datasource[companyIndex].data.push(newVTuber);
        }

        // Navigate back to the Home screen
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>VTuber Name:</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={(text) => setName(text)}
                placeholder="Enter VTuber name"
            />

            <Text style={styles.label}>Image URL:</Text>
            <TextInput
                style={styles.input}
                value={image}
                onChangeText={(text) => setImage(text)}
                placeholder="Enter image URL"
            />

            <Text style={styles.label}>Description:</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={(text) => setDescription(text)}
                placeholder="Enter description"
                multiline
                numberOfLines={4}
            />

            <Text style={styles.label}>Select Company:</Text>
            <RNPickerSelect
                onValueChange={(value) => setCompany(value)}
                items={datasource.map((section) => ({
                    label: section.company,
                    value: section.company,
                }))}
                value={company}
            />

            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        justifyContent: 'center',
    },
    label: {
        fontSize: 16,
        marginVertical: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        fontSize: 16,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
});

export default Add;
