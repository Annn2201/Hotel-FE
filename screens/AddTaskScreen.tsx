import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Task } from '../services/interfaces/task';
import { addTaskApi } from '../services/task';

const AddTaskScreen = ({ navigation }) => {
    const [ task,  setTask ] = useState<Task>({ title:"", content:"" })
    const addTaskAction = async() => {
        try {
            const {data} = await addTaskApi(task)
            navigation.navigate("TaskScreen")
        } catch(err) {
            const message = err.response
            alert(message)
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.mainText}>Thêm công việc</Text>
            <View style={styles.content}>
            <Text style={styles.label}>Tiêu đề công việc</Text>
            <TextInput value={task.title}  onChangeText={(value) => {
                setTask({
                    ...task,
                    title: value
                })
            }}  style={styles.input} />
            <Text style={styles.label}>Nội dung công việc</Text>
            <TextInput value={task.content} numberOfLines={10} onChangeText={(value) => {
                setTask({
                    ...task,
                    content: value
                })
            }}  style={styles.input} />
            <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={addTaskAction}>
                <Text>Thêm công việc</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text>Nhập lại</Text>
            </TouchableOpacity>
            </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        padding: 20
    },
    mainText: {
        marginTop: 20,
        fontSize: 25,
        fontWeight: "900"
    },
    content: {
        alignItems: "flex-start",
        width: "100%"
    },
    input: {
        borderWidth: 1,
        borderColor: "#bbb",
        padding: 5,
        borderRadius: 5,
        width: "100%"
    },
    label: {
        marginVertical: 10
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 20
    },
    button: {
        borderWidth: 1,
        borderColor: "#000",
        padding: 15,
        borderRadius: 5,
        backgroundColor: "pink",
        width: "45%",
        alignItems: "center"
    }
})

export default AddTaskScreen;