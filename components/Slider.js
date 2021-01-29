import React, { Component} from "react";
import Carousel from "react-elastic-carousel";
import "./Styles.css";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

class Slider extends Component {
    state = {
        Items: [
            {id: 1, url: 'https://cdn.pixabay.com/photo/2017/09/06/17/18/asian-2722295_960_720.jpg', title: 'Exhange Currency', subtitle: 'exchange money from your local currency to another'},
            {id: 2, url: 'https://cdn.pixabay.com/photo/2013/10/29/02/15/houses-202151_960_720.jpg', title: 'Get An Accomodation', subtitle: 'Get the best accomodation at an affordable price'},
            {id: 3, url: 'https://cdn.pixabay.com/photo/2020/05/31/22/11/home-school-holliday-5244456_960_720.jpg', title: 'Explore Your Destination',  subtitle: 'Get relevant information about any country or community'},
            {id: 4, url: 'https://cdn.pixabay.com/photo/2020/03/25/05/51/covid-19-4966155_960_720.jpg', title: 'Covid is Real', subtitle: 'Stay Safe'}
        ]
    }

    render() {

    const {Items} =this.state;
        return (
            <>
                <div className="App">
                    <Carousel breakPoints={breakPoints}>
                    {Items.map((item) => 
                    <div key={item.id}  >
                        <div className="carouselimg" style={{  backgroundImage:  "url(" +  `${item.url}`  + ")"}}>
                            <p className="carouseltext">{item.title}</p>
                            <p className="carouseltext2">{item.subtitle}</p>

                        </div>
                    </div> )}
                    </Carousel>
                </div>
            </>
        );
    }
}

export default Slider;