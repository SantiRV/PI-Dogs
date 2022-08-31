import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';
import { GiDogHouse } from 'react-icons/gi';

export default function LandingPage(){
    return(
        <div className='lPDiv'>
            <h1 className='titulo'>Welcome to my dogs page!</h1>
            <Link to='/home'>
                <button className='button'>
                    <h3>
                        <span>Home <GiDogHouse/></span>
                    </h3>
                </button>
            </Link>
        </div>
    )
};