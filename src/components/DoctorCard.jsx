import { Link } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative w-full h-48 overflow-hidden bg-gray-100">
        <img
          src={doctor.profileImage}
          alt={doctor.name}
          className="w-full h-auto max-w-full object-contain"
          style={{ maxHeight: "300px" }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{doctor.name}</h3>
        <p className="text-blue-600 font-medium">{doctor.specialization}</p>
        <p className="text-gray-600 mt-2 line-clamp-2">{doctor.bio}</p>
        <div className="mt-4 flex justify-between items-center">
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              doctor.available
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {doctor.available ? "Available" : "Unavailable"}
          </span>
          <Link
            to={`/doctors/${doctor._id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
