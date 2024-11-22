import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { datasource } from './Data'; // Assuming your Data.js exports the datasource

const Edit = ({ navigation, route }) => {
    const { index, company, name: initialName, image: initialImage, description: initialDescription } = route.params;

    // Create state for editable fields
    const [name, setName] = useState(initialName);
    const [image, setImage] = useState(initialImage);
    const [description, setDescription] = useState(initialDescription);

    const handleSave = () => {
        // Find the section based on the company
        const sectionIndex = datasource.findIndex((section) => section.company === company);
        if (sectionIndex !== -1) {
            // Update the VTuber's information in the datasource
            datasource[sectionIndex].data[index] = { name, image, description };
        }

        // Navigate back to the Home screen
        navigation.navigate('Home');
    };

    const handleDelete = () => {
        // Find the section based on the company
        const sectionIndex = datasource.findIndex((section) => section.company === company);
        if (sectionIndex !== -1) {
            // Remove the VTuber from the datasource
            Alert.alert('Are you sure?', 'This will delete the VTuber.', [
                {
                    text: 'Yes',
                    onPress: () => {
                        datasource[sectionIndex].data.splice(index, 1);
                        navigation.navigate('Home');
                    },
                },
                { text: 'No' },
            ]);
        }
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

            <View style={styles.buttonContainer}>
                <Button title="Save" onPress={handleSave} />
                <Button title="Delete" onPress={handleDelete} color="red" />
            </View>
        </View>
    );
};

// Add styling for the input and buttons
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        width: '90%',
        paddingHorizontal: 10,
        fontSize: 16,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        marginTop: 20,
    },
});

export default Edit;
