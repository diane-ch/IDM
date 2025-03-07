import { useState } from "react";
import axios from "axios"; // Import axios

function StudentInfo() {
  const [email, setEmail] = useState(""); // State for input
  const [studentData, setStudentData] = useState(null); // State to store fetched data
  const [error, setError] = useState(null); // Error state

  // Function to fetch student data
  const fetchStudent = async () => {
    try {
      const response = await axios.get(`http://localhost:3040/testmysqlreact/${email}`);
      setStudentData(response.data);
      setError(null);
    } catch (err) {
      setError("Student not found or server error.");
      setStudentData(null);
    }
  };

  return (
    <div>
      <h2>Fetch Student Info</h2>
      <input
        type="text"
        placeholder="Enter student email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={fetchStudent}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {studentData && (
        <div>
          <h3>Student Details:</h3>
          <p><strong>ID:</strong> {studentData[0].id}</p>
          <p><strong>Name:</strong> {studentData[0].name}</p>
          <p><strong>Email:</strong> {studentData[0].email}</p>
        </div>
      )}
    </div>
  );
}

export default StudentInfo;
