import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AppointmentForm from '../components/AppointmentForm';
import axios from 'axios';

const DoctorProfile = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`/api/doctors/${id}`);
        setDoctor(response.data);
      } catch (err) {
        setError('Failed to load doctor details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!doctor) return <div className="text-center py-8">Doctor not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <img 
            src={doctor.profileImage} 
            alt={doctor.name}
            className="w-full rounded-lg shadow-md"
          />
          <h1 className="text-2xl font-bold mt-4">{doctor.name}</h1>
          <p className="text-blue-600 font-medium">{doctor.specialization}</p>
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Availability</h2>
            <ul className="mt-2 space-y-1">
              {Object.entries(doctor.schedule).map(([day, time]) => (
                time && (
                  <li key={day} className="flex justify-between">
                    <span className="capitalize">{day}:</span>
                    <span>{time}</span>
                  </li>
                )
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <span className={`px-3 py-1 rounded-full text-sm ${
              doctor.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {doctor.available ? 'Currently Available' : 'Not Available'}
            </span>
          </div>
        </div>
        <div className="md:w-2/3">
          <h2 className="text-xl font-semibold mb-4">About Dr. {doctor.name.split(' ')[1]}</h2>
          <p className="text-gray-700 mb-6">{doctor.bio}</p>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Book an Appointment</h3>
            <AppointmentForm doctorId={doctor._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;