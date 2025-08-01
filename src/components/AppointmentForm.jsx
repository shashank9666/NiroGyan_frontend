import  { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentForm = ({ doctorId }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    appointmentDate: '',
    timeSlot: '',
    reason: ''
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fetch doctor's available slots
    const fetchSlots = async () => {
      try {
        const response = await axios.get(`/api/doctors/${doctorId}`);
        const schedule = response.data.schedule;
        const slots = Object.values(schedule).filter(Boolean);
        setAvailableSlots(slots);
      } catch (error) {
        console.error('Error fetching slots:', error);
      }
    };
    fetchSlots();
  }, [doctorId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post('/api/appointments', {
        ...formData,
        doctorId
      });
      alert('Appointment booked successfully!');
      setFormData({
        patientName: '',
        appointmentDate: '',
        timeSlot: '',
        reason: ''
      });
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Failed to book appointment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700">Full Name</label>
        <input
          type="text"
          name="patientName"
          value={formData.patientName}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-700">Date</label>
        <input
          type="date"
          name="appointmentDate"
          value={formData.appointmentDate}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          min={new Date().toISOString().split('T')[0]}
        />
      </div>
      <div>
        <label className="block text-gray-700">Time Slot</label>
        <select
          name="timeSlot"
          value={formData.timeSlot}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a time slot</option>
          {availableSlots.map((slot, index) => (
            <option key={index} value={slot}>{slot}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-gray-700">Reason for Visit</label>
        <textarea
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          required
          rows="3"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition ${
          isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting ? 'Booking...' : 'Book Appointment'}
      </button>
    </form>
  );
};

export default AppointmentForm;