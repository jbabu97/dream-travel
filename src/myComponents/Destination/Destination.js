import React, { useEffect, useState } from 'react';
import './Destination.css';
import Map from '../../images/Map.png';
import Header from '../Header/Header';
import DestinationDetails from '../DestinationDetails/DestinationDetails';
import travelData from '../../travelData/travelData';
import { useParams } from 'react-router';

const Destination = () => {
    const {ride} = useParams()
    const [destination, setDestination] = useState([])

    useEffect(() => {
        setDestination(travelData);
    }, [ride])
    return (
        <div>
            <Header></Header>
            {
                destination.map(destination => <DestinationDetails destination={destination}></DestinationDetails>)
            }
            <div className="row">
                <div className="col-sm-5 mt-3">
                    <div className="p-4 mx-auto destination_detail">
                        <form action="">
                            <h4>Pick From</h4>
                            <p><input type="text" /></p>
                            <h4>Pick To</h4>
                            <p><input type="text" /></p>
                            <p><input className="btn btn-success" type="submit" value="Search" /></p>
                        </form>
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