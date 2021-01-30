import React, { useState, useEffect } from "react";
import axios from "axios";
import UniComponent from "./UniComponent";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Styles.css";
import Pagination from "./Pagination"

export default function Universities(props) {
  console.log(props);

  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [universitiesPerPage] = useState(2);

  const [province, setProvince] = useState([]);
  const [selectedProvince, setSeledtedProvince] = useState("");

  const [cities, setCities] = useState([]);
  const [selectedCity, setSeledtedCity] = useState("");

  const [show, setShow] = useState(false);
  const save = (e) => {
    e.preventDefault();
    fetchUniversities(selectedCity, selectedProvince);
    handleClose();
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const fetchProvinces = async () => {
    setLoading(true);
    const res = await axios.get("CityProvince/GetAllProvinces");
    setProvince(res.data.result.provinces);
    setLoading(false);
  };
  const fetchCities = async (province) => {
    setLoading(true);
    const res = await axios.get("CityProvince/GetAllCities", {
      params: {
        ProvinceName: province,
      },
    });
    setCities(res.data.result.cities);
    setLoading(false);
  };

  const fetchUniversities = async (city, province) => {
    console.log("City : " + city, "Province : " + province);
    setLoading(true);
    const res = await axios.get("UniversityManagement/GetAllUniversity", {
      params: {
        Province: province,
        City: city,
        PageSize: 10,
        CurrentPage: 1,
      },
    });
    setUniversities(res.data.universities.items);
    setLoading(false);
  };

  useEffect(() => {
    fetchProvinces();
    fetchUniversities(selectedCity, selectedProvince);
  }, []);

  useEffect(() => {
    fetchCities(selectedProvince);
  }, [selectedProvince]);

  const handleChangeSelectLocation = (event) => {
    event.preventDefault();
    setSeledtedProvince(event.target.value);
  };

  const handleChangeSelectCity = (event) => {
    event.preventDefault();
    setSeledtedCity(event.target.value);
  };

  //Get current Universities
  const indexOfLastUniversity = currentPage * universitiesPerPage;
  const indexOfFirstUniversity = indexOfLastUniversity - universitiesPerPage;
  const currentUniversities = universities.slice(
    indexOfFirstUniversity,
    indexOfLastUniversity
  );

  //Change Page
  const paginate =(pageNumber) => setCurrentPage(pageNumber);
  //   console.log(universities);
  //   console.log(province);
  console.log(cities);

  return (
    <div className="container mt-5">
      <div>
        <h1 className="text-primary mb-3">Universities </h1>
        <Button variant="primary" onClick={handleShow}>
          Change Location
        </Button>
      </div>
      <UniComponent universities={currentUniversities} loading={loading}  />
      <Pagination 
        universitiesPerPage={universitiesPerPage} 
        totalUniversities={universities.length} 
        paginate={paginate} 
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Location</Modal.Title>
        </Modal.Header>
        <Form onSubmit={save}>
          <Modal.Body>
            <select onChange={handleChangeSelectLocation} className="selectme">
              <option value="">Select Province</option>
              {province?.map((item) => (
                <option key={item.provinceId} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>

            <select
              disabled={selectedProvince === ""}
              onChange={handleChangeSelectCity}
              className="selectme"
            >
              <option>Select City</option>
              {cities.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" className="submit2">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}