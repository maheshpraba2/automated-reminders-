// src/components/ReminderForm.js
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function ReminderForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/reminders', data);
      console.log('Reminder set successfully:', response.data);
    } catch (error) {
      console.error('Error setting reminder:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-80 mx-auto">
      <label className="mb-4">
        Time:
        <input
          type="time"
          {...register('time', { required: true })}
          className="p-2 border border-gray-300 rounded mt-1"
        />
        {errors.time && <span className="text-red-500">This field is required</span>}
      </label>
      <label className="mb-4">
        Channel:
        <select
          {...register('channel', { required: true })}
          className="p-2 border border-gray-300 rounded mt-1"
        >
          <option value="text">Text</option>
          <option value="email">Email</option>
          <option value="call">Call</option>
        </select>
        {errors.channel && <span className="text-red-500">This field is required</span>}
      </label>
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Set Reminder
      </button>
    </form>
  );
}
