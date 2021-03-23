import React from 'react';
import Header from '../Header/Header';

const Contact = () => {
    
    const contactStyle = {
            backgroundColor: 'lightGray',
            height: '100vh'
    }
    return (
        <div style={contactStyle}>
            <Header></Header>
            <div className="text-center mt-5">
                <h2>Name: Jabbar Babu</h2>
                <p>Email: jabbar.babu81@gmail.com</p>
            </div>
        </div>
    );
};

export default Contact;