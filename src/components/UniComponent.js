import React from 'react'

const UniComponent = ({universities, loading}) => {
    
    // const {universities, loading} = props;
    // console.log(props)


    if (loading) {
        return <h2>Loading...</h2>;
    }
    
    return (
    <ul className="list-group mb-4">
        {universities.map(university => (
            <li key={university.id} className="list-group-item"> 
            <div style={{display: "flex"}}> 
                <img src={university.image} className="imgsize" alt="" /> 
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