import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import './Services.css'


const Services = (props) => {
    const {serviceName, img, id} = props.service;

    return (
            <Link to={`/destination/${id}`} className="col-sm-3 services">
                <div className="service">
                    <img className="img-fluid" src={img} alt=""/>
                    <h3>{serviceName} Booking</h3>
                </div>
            </Link>
    );
};

export default Services;