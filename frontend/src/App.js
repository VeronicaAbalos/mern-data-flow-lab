import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [students, setStudents] = useState([]);

  const addStudent = async () => {
    await axios.post("http://localhost:5000/students", {
      name,
      course,
    });

    setName("");
    setCourse("");
    loadStudents();
  };

  const loadStudents = async () => {
    const res = await axios.get("http://localhost:5000/students");
    setStudents(res.data);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>MERN Data Flow</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />

      <input
        placeholder="Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      />
      <br />

      <button onClick={addStudent}>Submit</button>

      <h3>Students</h3>

      {students.map((s, i) => (
        <p key={i}>
          {s.name} - {s.course}
        </p>
      ))}
    </div>
  );
}

export default App;