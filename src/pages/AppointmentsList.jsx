import { useEffect, useState } from 'react';
import axios from 'axios';

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/api/appointments');
        setAppointments(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setError('Failed to load appointments. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Appointments</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : appointments.length === 0 ? (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-6 rounded text-center">
          <p>No appointments booked yet</p>
          <a href="/doctors" className="text-blue-600 hover:underline mt-2 inline-block">
            Book your first appointment
          </a>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {appointments.map(appointment => (
            <div key={appointment._id} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {appointment.patientName}
                  </h3>
                  <p className="text-sm text-gray-500">Patient</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs ${
                  appointment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  appointment.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {appointment.status}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Doctor</p>
                  <p className="font-medium">
                    {appointment.doctorId?.name || 'Unknown Doctor'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p>{new Date(appointment.appointmentDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p>{appointment.timeSlot}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Reason</p>
                  <p className="font-medium">{appointment.reason}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentsList;