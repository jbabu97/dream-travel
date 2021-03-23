import React, { useEffect, useState } from 'react';
import './Home.css';
import travelData from '../../travelData/travelData';
import Services from '../Services/Services';
import Header from '../Header/Header';

const Home = () => {
    const [services, setServices] = useState([]);

    useEffect( () => {
        setServices(travelData)
        console.log(travelData)
    }, []);

    return (
        <div className="container home_compo">
            <Header></Header>
            <div className="home_detail">
                {
                    services.map(service => <Services service={service}></Services>)
                }
            </div>
        </div>
    );
};

export default Home;