import React from 'react';
import './loader.scss'
const Loader = () => {
    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <ul className="preloader">
                        <li>
                            <div className="loader"></div>
                            <div className="loading"></div>
                        </li>
                        <li>
                            <div className="loader"></div>
                            <div className="loading"></div>
                        </li>
                        <li>
                            <div className="loader"></div>
                            <div className="loading"></div>
                        </li>
                        <li>
                            <div className="loader"></div>
                            <div className="loading"></div>
                        </li>
                        <li>
                            <div className="loader"></div>
                            <div className="loading"></div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Loader;