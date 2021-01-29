import React, { Component } from 'react';
import axios from 'axios';
import {  Row, Col, Container } from 'reactstrap';


export default class Destinations extends Component {
    constructor() {
        super();
        this.state = {
          provinces: [],
        };
      }

    componentDidMount(){

        if (localStorage.userToken) {
            const userProfile = JSON.parse(localStorage.getItem("userProfile"));
            const user = JSON.parse(localStorage.getItem("user"));
            const auth = JSON.parse(localStorage.getItem("auth"));
            const userToken = JSON.parse(localStorage.getItem("userProfile"));
            const provinces = JSON.parse(localStorage.getItem("provinces"));
            this.setState({
              userProfile,
              user,
              auth,
              provinces,
              userToken,
            });
          }
      

        const config = {
            headers: {
              Authorization: "Bearer" + localStorage.getItem("userProfile"),
            },
          };

        axios.get("CityProvince/GetAllProvinces", config).then(
            (res) => {
              this.setState({
                provinces: res.data.result.provinces,
              });
              console.log(res);
              localStorage.setItem(
                "provinces",
                JSON.stringify(res.data.result.provinces)
              );
              console.log(res);
            },
            (err) => {
              console.log(err);
            }
          );
    }

    render() {

        console.log(this.state);

        const {provinces}= this.state;

        // since we wanna authorize by user token we say :
        return this.state.user?.authToken ? (
          <>
            <div className='profile'>
              <div className='box'>
                <h2>All Provinces</h2>
                <Container>
                    <Row xs='4'>
                {provinces.map((item) => 
                            <Col key={item.provinceId} className='card-section'>
                                <div body className='card-body'>
                                    <p className='destination-title'>{item.name}</p>
                                    <p className='destination-code'>{item.shortCode}</p>
                                </div>
                            </Col> 
                    )}
                    </Row>
                </Container>

              </div>
            </div>
          </>
        ) : (
          <h1>you're not logged in</h1>
        );
      }
}
