import React, {useState, useEffect} from 'react';
import axios from 'axios';
import UniComponent from './UniComponent'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import './Styles.css'
export default function Universities(props) {

    console.log(props)

    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [universitiesPerPage, setUniversitiesPerPage] = useState(10)
    const [locations, setLocation] = useState([]);
    const [pins, setPin] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [locationz, setSelectedLocation] = useState("")




    useEffect (() => {

        
        const fetchLocation = async () => {
            setLoading(true);
            const res= await axios
            .get('CityProvince/GetAllProvinces')
            setLocation(res.data.result.provinces)
            setLoading(false)
        };

        const fetchPin = async () => {
            setLoading(true);
            const res= await axios
            .get('CityProvince/GetAllCities', 
                {
                    params: {
                        ProvinceName: locationz
                    }
                }
            );
            setPin(res.data.result.cities)
            setLoading(false)
        };

        const fetchUniversities = async () => {
            setLoading(true);
            const res = await axios.get('UniversityManagement/GetAllUniversity', 
            {
                params: { 
                    Province: locations,
                    City: pins,
                    PageSize: 2,
                    CurrentPage: 1
                }
            })
            setUniversities(res.data.universities.items);
            setLoading(false);
        };

        fetchUniversities();
        fetchLocation();
        fetchPin();

    }, [])


    const handleChangeSelectLocation = (event) => {
        setLocation(event.target.value);
    };

    const handleChangeSelectCity = (event) => {
    setPin(event.target.value);
    };
    //Get current Universities
    const indexOfLastUniversity = currentPage * universitiesPerPage;
    const indexOfFirstUniversity = indexOfLastUniversity - universitiesPerPage;
    const currentUniversities = universities.slice(indexOfFirstUniversity, indexOfLastUniversity)

    console.log(universities)
    console.log(locations)
    console.log(pins)


    return (
        <div className= 'container mt-5'>
            <div>
                <h1 className = 'text-primary mb-3'>Universities </h1>
                <Button variant="primary" onClick={handleShow}>
                    Change Location
                </Button>
            </div>
            <UniComponent universities={currentUniversities} loading={loading}/>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                            <Form.Group as="select" value={locationz} onChange={handleChangeSelectLocation} className='selectme' >
                                <option >Select Province</option>
                            {locations.map((item) => 
                                <option key={item.provinceId } value={item.name} >{item.name}</option>
                            )}
                            </Form.Group>

                            <Form.Group as="select"  className='selectme' >
                                <option disabled={locationz === ""} value={pins} onChange={handleChangeSelectCity} >Select City</option>
                            {pins.map((item) => 
                                <option key={item.id} value={item.name}>{item.name}</option>
                                )}
                            </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                    <Button className="submit2" type="submit" onClick={handleClose}>
                        Submit
                    </Button>
                    </Modal.Footer>
                    </Form>
            </Modal>
        </div>
    )
}
