import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Button, FlatList } from "react-native";
import { Task } from "../services/interfaces/task";
import {listTaskApi} from "../services/task";

const HomeScreen = ({ navigation }) => {
    const [ tasks, setTasks ] = useState<Task[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const getTaskData = async () => {
        setIsLoading(true)
        try {
            const listTaskResponse = await listTaskApi()
            const { data } = listTaskResponse
            console.log(data)
            setTasks(data)
        } catch (err) {
            const errorMessage = err.response
            alert(errorMessage)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getTaskData()}
        , [])

    const renderTask = ({ item }: {item : Task}) => {
        return(
            <TouchableOpacity style={styles.listItem} onPress={() => {
                navigation.navigate("DetailTaskScreen", {taskId: item.id})
                console.log(item)
            }}>
                <Text style={styles.taskTitle}>{item.title}</Text>
                <Text style={styles.taskContent}>{item.content}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <Text style={styles.screenTitle}>Danh sách công việc</Text>
            <Button onPress={() => {
                navigation.navigate('AddTaskScreen')
            }
            } title={'Thêm công việc'}></Button>
            <FlatList 
                onRefresh={getTaskData} 
                refreshing={isLoading}
                style={styles.listTask} 
                data={tasks} 
                renderItem={(item) => renderTask(item)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    screenTitle: {
        fontSize: 22,
        padding: 10
    },
    listTask: {
        flex: 1,
    },
    listItem: {
        height: 100,
        width: "100%",
        marginBottom: 1,
        backgroundColor: "#fff",
        padding: 10,
        justifyContent: "center"
    },
    taskTitle: {
        fontWeight: "600",
        fontSize: 18,
        marginBottom: 5
    },
    taskContent: {
        flex: 1, 
    }
})

export default HomeScreen