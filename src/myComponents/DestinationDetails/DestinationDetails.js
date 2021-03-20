import React from 'react';
import './DestinationDetails.css';

const DestinationDetails = () => {
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
            {/* <div className="col-sm-7"></div> */}
        </div>
    );
};

export default DestinationDetails;