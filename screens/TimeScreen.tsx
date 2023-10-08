import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';
import { Calendar, DateObject } from 'react-native-calendars';

export default function App() {
  const [markedDates, setMarkedDates] = useState<{ [date: string]: DateObject }>({});
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [nights, setNights] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState(false);

  const handleDayPress = (day: string) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day);
      setEndDate(null);
      setMarkedDates({ [day]: { selected: true, selectedColor: 'blue' } });
      setNights(0);
    } else if (!endDate) {
      setEndDate(day);
      const start = new Date(startDate);
      const end = new Date(day);
      const numberOfDays = Math.floor((end.getTime() - start.getTime()) / (24 * 60 * 60 * 1000));
      setNights(numberOfDays);
      const updatedMarkedDates = { ...markedDates };
      let currentDate = new Date(start);
      while (currentDate <= end) {
        updatedMarkedDates[currentDate.toISOString().split('T')[0]] = { selected: true, selectedColor: 'blue', color: '#0099ff', textColor: 'white'};
        currentDate.setDate(currentDate.getDate() + 1);
      }
      setMarkedDates(updatedMarkedDates);
    } else {
      setStartDate(day);
      setEndDate(null);
      setNights(0);
      setMarkedDates({ [day]: { selected: true, selectedColor: 'blue' } });
    }
  };

  const handleBookRoom = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => handleDayPress(day.dateString)}
        markingType={'period'}
        markedDates={markedDates}
      />
      <TouchableOpacity onPress={handleBookRoom} style={styles.bookButton}>
        <Text style={styles.buttonText}>Đặt phòng</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Đặt phòng thành công!</Text>
            <Text style={styles.modalText}>
              Số ngày: {nights + 1} ngày
              {'\n'}
              Số đêm: {nights} đêm
            </Text>
            <Button title="Xác Nhận" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  bookButton: {
    backgroundColor: '#0099ff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
});
