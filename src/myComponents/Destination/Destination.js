import React, { useEffect, useState } from 'react';
import './Destination.css';
import Map from '../../images/Map.png';
import Header from '../Header/Header';
import travelData from '../../travelData/travelData';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';


const Destination = () => {
    const {serviceId} = useParams();
    console.log(serviceId);
    const [destination, setDestination] = useState([]);

    const service = travelData.filter(service => service.id === serviceId)
    console.log(service);

    useEffect(() => {
        setDestination(travelData);
        console.log(travelData);
    }, [serviceId]);

    const handleBlur = (e) => {
        console.log(e.target.value);
    }

    const handleDestination = () => {

    }

    const handleSubmit = () => {
        
    }

    const isForm = true;
    return (
        <div>
            <Header></Header>
            <div className="row">
                <div className="col-sm-5 mt-3">
                    <div className="p-4 mx-auto destination_detail">
                        <form onSubmit={handleSubmit}>
                            <h4>From</h4>
                            <p><input onBlur={handleBlur} type="text" name="start" /></p>
                            <h4>To</h4>
                            <p><input onBlur={handleBlur} type="text" name="end" /></p>
                            <p><input onClick={handleDestination} className="btn btn-success" type="submit" value="Search" /></p>
                        </form>                        
                    </div>
                    
                    <div className="destination">
                        <div className="route">
                            <h2>Start</h2>
                            <p>to</p>
                            <h2>End</h2>
                        </div>
                        <div>
                                    <div className="ride_details">
                                        <div>
                                            <img src={service.carImg} alt=""/>
                                        </div>
                                        <div className="ride_info">
                                            <h6><FontAwesomeIcon icon={faUserFriends}/> {service.seats}</h6>
                                            <h6><p>{service.fare}</p></h6>
                                        </div>
                                    </div>
                                                              
                        </div>
                    </div>
                </div>
                <div className="col-sm-7 mt-3">
                    <img className="img-fluid" src={Map} alt=""/>
                </div>
            </div>
        </div>
    );
};

export default Destination;