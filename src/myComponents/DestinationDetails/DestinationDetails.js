import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import travelData from '../../travelData/travelData';
import './DestinationDetails.css';

const DestinationDetails = () => {
    const {ride} = useParams();
    const [destinationDetail, setDestinationDetail] = useState({})
    useEffect(() => {
        setDestinationDetail(travelData);
        console.log(travelData);
    }, [ride]);
    return (
        <div className="row">
            <div className="col-sm-5 mt-3">
                <div className="p-4 mx-auto destination_detail">
                    <div className="place_name">
                        <ul>
                            <li>Pick From</li>
                            <li>Pick To</li>
                        </ul>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default DestinationDetails;