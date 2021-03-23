import React, { useEffect, useState } from 'react';
import './Destination.css';
import Header from '../Header/Header';
import travelData from '../../travelData/travelData';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';


const Destination = () => {
    const {serviceId} = useParams();
    const [destination, setDestination] = useState([]);

    const [rideInfo, setRideInfo] = useState(true)

    const [travelRoute, setTravelRoute] = useState({
        origin: '',
        destination: ''
    });

    const service = travelData.find(service => service.id == serviceId)
    
    useEffect(() => {
        setDestination(travelData);
    }, [serviceId]);

    const handleBlur = (e) => {
        let isTravelRoute = true;
        if (e.target.name === 'origin') {
            isTravelRoute = e.target.value;
        }
        if (e.target.name === 'destination') {
            isTravelRoute = e.target.value;
        }

        if (isTravelRoute) {
            const newTravelRoute = { ...travelRoute };
            newTravelRoute[e.target.name] = e.target.value;
            setTravelRoute(newTravelRoute);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setRideInfo(false);
    }

    return (
        <div>
            <Header></Header>
            <div className="row">
                <div className="col-sm-5 mt-3">
                    {
                        rideInfo ?
                        <div className="p-4 mx-auto destination_detail">
                            <form onSubmit={handleSubmit}>
                                <h4>Origin</h4>
                                <p><input onBlur={handleBlur} type="text" name="origin" required /></p>
                                <h4>Destination</h4>
                                <p><input onBlur={handleBlur} type="text" name="destination" required /></p>
                                <p><input className="btn btn-success" type="submit" value="Search" /></p>
                            </form>                        
                        </div> : 
                        <div className="destination">
                            <div className="route">
                                <h2>{travelRoute.start}</h2>
                                <p>to</p>
                                <h2>{travelRoute.end}</h2>
                            </div>
                        <div>
                            { service && service.rideDetails &&
                                service.rideDetails.map(serve => (
                                <div className="ride_details">
                                    <div>
                                        <img src={serve.carImg} alt=""/>
                                    </div>
                                    <div className="ride_info">
                                        <h6><FontAwesomeIcon icon={faUserFriends}/> {serve.seats}</h6>
                                        <h6><p>{serve.fare}</p></h6>
                                    </div>
                                </div>))
                            }                                             
                        </div>
                    </div>
                    }                    
                </div>
                <div className="col-sm-7 mt-3 google_map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29160.251167207203!2d90.4001570059109!3d23.994668406031334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755dafdd8aa72a1%3A0xe3a23793cb030fdb!2z4KaX4Ka-4Kac4KeA4Kaq4KeB4Kaw!5e0!3m2!1sbn!2sbd!4v1616474603021!5m2!1sbn!2sbd" style={{width: "100%", height: "400px", border: "0"}}></iframe>
                </div>
            </div>
        </div>
    );
};

export default Destination;