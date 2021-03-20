import React from 'react';
import { useHistory } from 'react-router';
import './Services.css'


const Services = (props) => {
    const {serviceName, img} = props.service;

    const history = useHistory();
    const handleLogin = () => {
        history.push('/destination');
    }
    return (
        <div>
            <div onClick={handleLogin} className="services">
                <div className="col-sm-3 service">
                    <img className="img-fluid" src={img} alt=""/>
                    <h3>{serviceName}</h3>
                </div>
            </div>
        </div>
    );
};

export default Services;