import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { deleteTaskApi, getTaskByIdApi } from '../services/task';
import { Task } from '../services/interfaces/task';

const DetailTaskScreen = ({navitagtion}) => {
    const taskId = navitagtion.getParam("taskId")
    const [ task, setTask ] = useState<Task>()

    const deleteTask = async(id: string) => {
        try {
            const { data } = await deleteTaskApi(id)
            alert("Da xoa task: " + task?.title)
            navitagtion.navigate("TaskScreen")
        }catch (err){
            console.log(err.response)
            alert(err.response)
        }
    }
    const getTaskById = async(id: string) => {
        try {
            const { data } = await getTaskByIdApi(id)
            setTask(data)
        }catch (err){
            alert(err.response)
        }
    }
    useEffect(() => {
        getTaskById(taskId)
    },[taskId])

    return (
        <View>
            <Text>{task?.title}</Text>
            <Text>{task?.content}</Text>
            <Button onPress={() => {
                navigation.navigate("UpdateTaskScreen", { taskData: task})
            }} title='Cập nhật' />
            <Button onPress={() => {
                deleteTask(task?.id)
            }} title='Xóa' />

        </View>
    );
};

export default DetailTaskScreen;
