import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-transparent">
                <div class="container-fluid">
                    <Link className="navbar-brand text-success" to="/home">Travel Hanger</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav text-right">
                        <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
                        <Link className="nav-link" to="/destination">Destination</Link>
                        <Link className="nav-link" to="/home">Blog</Link>
                        <Link className="nav-link" to="/contact">Contact</Link>
                        <Link to="/login"><button className="btn btn-success">Login</button></Link>
                    </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;