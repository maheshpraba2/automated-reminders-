// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReminderForm from './ReminderForm';
import ReminderList from './ReminderList';

function App() {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/reminders')
      .then((response) => {
        setReminders(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the reminders!', error);
      });
  }, []);

  const addReminder = (reminder) => {
    axios.post('http://localhost:5000/api/reminders', reminder)
      .then((response) => {
        setReminders([...reminders, response.data]);
      })
      .catch((error) => {
        console.error('There was an error creating the reminder!', error);
      });
  };

  return (
    <div>
      <h1>Automated Reminders</h1>
      <ReminderForm onSubmit={addReminder} />
      <ReminderList reminders={reminders} />
    </div>
  );
}

export default App;
