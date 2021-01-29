import React, {useState, useEffect} from 'react';
import axios from 'axios';
import UniComponent from './UniComponent'

export default function Universities() {

    const [universities, setUniversities] = useState([,,,,,,,,,,]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [universitiesPerPage, setUniversitiesPerPage] = useState(10)

    useEffect (() => {
        const fetchUniversities = async () => {
            setLoading(true);
            const res = await axios.get('https://api.welkom-u.ca/WelkomU_Test/api/UniversityManagement/GetAllUniversity', 
            {
                params: { 
                    Province: "",
                    City: "",
                    PageSize: 2,
                    CurrentPage: 1
                }
            })
            setUniversities(res.data.universities.items);
            setLoading(false);
        };

        fetchUniversities();
    }, [])


    //Get current Universities
    const indexOfLastUniversity = currentPage * universitiesPerPage;
    const indexOfFirstUniversity = indexOfLastUniversity - universitiesPerPage;
    const currentUniversities = universities.slice(indexOfFirstUniversity, indexOfLastUniversity)

    console.log(universities)
    return (
        <div className= 'container mt-5'>
            <h1 className = 'text-primary mb-3'>Universities </h1>
            <UniComponent universities={currentUniversities} loading={loading}/>
        </div>
    )
}
