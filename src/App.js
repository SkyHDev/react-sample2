import './styles/app.css';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import Student from './components/Student';
import { Scrollbars } from 'react-custom-scrollbars';

function App() {
    const [students, setStudents] = useState([])
    const [hasError, setHasError] = useState(false)
    const [pending, setPending] = useState(true)
    const [searchName, setSearchName] = useState("")
    const [searchTag, setSearchTag] = useState("")
    const [searchResults, setSearchResults] = useState([])

    const handleSearchNameChange = (event) => {
        setSearchName(event.target.value)
    }

    const handleTagNameChange = (event) => {
        setSearchTag(event.target.value)
    }

    const handleStateChange = (id, tags) => {
        let studentsList = {}
        Object.assign(studentsList, students)
        studentsList[id - 1] = { ...studentsList[id - 1], tags}
        setStudents(studentsList)
    }

    useEffect(() => {
        setHasError(false)
        setPending(true)
        try {
            axios.get(`https://api.hatchways.io/assessment/students`)
            .then(res => {
                setStudents(res.data.students.map(student => ({...student, tags: []})))
                setPending(false)
                setHasError(false)
            })
            
        } catch(err) {
            setHasError(true)
            setPending(false)
        }

    }, [])

    useEffect(() => {
        const results = Object.values(students).filter(student => {
            return (student.firstName + " " + student.lastName).toLowerCase().includes(searchName.toLowerCase()) && (searchTag === "" ? true: student.tags.includes(searchTag))
        })
        setSearchResults(results)
       
    }, [searchName, searchTag, students])

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 container">
            <div id="content" className="p-0 w-75 card">
                <Scrollbars>
                    <div className="px-2">
                        <input placeholder="Search by name" type="text" className="border-bottom form-control" onChange={handleSearchNameChange} />
                        <input placeholder="Search by tag" type="text" className="border-bottom form-control" onChange={handleTagNameChange} />
                    </div>
                    { hasError && (<div>Error</div>) }
                    { pending && (<div>Loading...</div>) }
                    { !hasError && !pending && searchResults.length === 0 && (<div>No Students</div>) }
                    { 
                        !hasError && !pending && searchResults.length > 0 && (
                            searchResults.map((item, index) => (
                                <Student key={index} data={item} handleStateChange={handleStateChange} />
                            ))
                        )
                    }
                </Scrollbars>
            </div>
        </div>
    );
}

export default App;
