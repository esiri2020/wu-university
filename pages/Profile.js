import React, { Component } from "react";
import axios from "axios";
import "./Styles.css";

export default class Profile extends Component {

  constructor() {
    super();
    this.state = {
      userProfile: null,
      user: null,
      auth: null,
      userToken: null,
    };
  }
  
  componentDidMount() {
    // check if we have a user logged in and token is set
    if (localStorage.userToken) {
      const userProfile = JSON.parse(localStorage.getItem("userProfile"));
      const user = JSON.parse(localStorage.getItem("user"));
      const auth = JSON.parse(localStorage.getItem("auth"));
      const userToken = JSON.parse(localStorage.getItem("userProfile"));
      this.setState({
        userProfile,
        user,
        auth,
        userToken,
      });
    }

    const config = {
      headers: {
        Authorization: "Bearer" + localStorage.getItem("userProfile"),
      },
    };

    axios.get("ProfileManagement/LoginUser", config).then(
      (res) => {
        this.setState({
          user: res.data.result.userProfile,
        });
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  render() {

    console.log(this.state);
    // since we wanna authorize by user token we say :
    return this.state.user?.authToken ? (
      <>
        <div className='ja-profile'>
          <div className='ja-box'>
            <img src={this.state.userProfile.picture} alt="" />
            <h3>You are Logged in as</h3>
            <h3>First Name : {this.state.userProfile.firstname}</h3>
            <h3>Last Name : {this.state.userProfile.lastname}</h3>
          </div>
        </div>
      </>
    ) : (
      <h1>you're not logged in</h1>
    );
  }
}
