import React, { Component} from "react";
import Carousel from 'react-bootstrap/Carousel';
import "./Styles.css";

class Slider extends Component {
    state = {
        Items: [
            {id: 1, url: 'https://cdn.pixabay.com/photo/2020/03/19/21/35/covid-4948866_960_720.jpg', title: 'Currency Exchange', subtitle: 'Exchange currency from one local currency to another'},
            {id: 2, url: 'https://cdn.pixabay.com/photo/2020/03/24/16/17/mask-4964590_960_720.png', title: 'Stay Safe', subtitle: ''},
            {id: 3, url: 'https://cdn.pixabay.com/photo/2020/03/26/22/57/hand-sanitizer-4972049_960_720.png', title: 'Wash Your Hands', subtitle: ''},
            {id: 4, url: 'https://cdn.pixabay.com/photo/2020/03/25/05/51/covid-19-4966155_960_720.jpg', title: 'Covid is Real', subtitle: ''}
        ]
    }

    render() {

    const {Items} =this.state;
        return (
            <>
                <div className="super-app">
                    <Carousel >
                    {Items.map((item) => 
                        <Carousel.Item key={item.id}>
                            <img
                            className=""
                            src= {item.url}
                            alt=""
                            />
                            <Carousel.Caption>
                            <h3>{item.title}</h3>
                            <p>{item.subtitle}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    )}
                    </Carousel>
                </div>
            </>
        );
    }
}

export default Slider;