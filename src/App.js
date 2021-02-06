import React, { useEffect } from "react";
import axios from 'axios';

function App() {
    const [students, setStudents] = useState([])
    useEffect(() => {
        try {
            axios.get(`https://api.hatchways.io/assessment/students`)
            .then(res => {
                console.log(res.data.students)
                setStudents(res.data.students)
            })
        } catch(err) {

        }
    })
    return (
    <div className="container">
        {}
    </div>
    );
}

export default App;
