import React from 'react'

const UniComponent = (universities, loading) => {
    if (loading) {
        return <h2>Loading...</h2>;
    }
    
    return (
    <ul className="list-group mb-4">q
        {universities.map(university => (
            <li key={university.id} className="list-group-item"> <div> 
                <img src={university.image} alt="" /> 
                <div> 
                    <h2>{university.name}</h2>
                    <p>{university.about}</p>
                </div> 
            </div>
            </li>
        ))}
    </ul>
    )
}

export default UniComponent;