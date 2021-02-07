import './styles/app.css';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import Student from './components/Student';

function App() {
    const [students, setStudents] = useState([])
    const [hasError, setHasError] = useState(false)
    const [pending, setPending] = useState(true)

    useEffect(() => {
        setHasError(false)
        setPending(true)
        try {
            axios.get(`https://api.hatchways.io/assessment/students`)
            .then(res => {
                setStudents(res.data.students)
            })
            setPending(false)
        } catch(err) {
            setHasError(true)
            setPending(false)
        }

    }, [])

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 container">
            <div id="content" className="p-0 w-75 card">
                <div className="px-2">
                    <input placeholder="Search by name" type="text" className="border-bottom form-control" />
                    <input placeholder="Search by tag" type="text" className="border-bottom form-control" />
                </div>
                { hasError && (<div>Error</div>) }
                { pending && (<div>Loading...</div>) }
                { !hasError && !pending && students.length === 0 && (<div>No Students</div>) }
                { 
                    !hasError && !pending && students.length > 0 && (
                        students.map((item, index) => (
                            <Student key={index} data={item} />
                        ))
                    )
                }
            </div>
        </div>
    );
}

export default App;
