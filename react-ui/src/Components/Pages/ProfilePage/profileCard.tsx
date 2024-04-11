import React from "react";
import profileImage from '../../../assets/Sample-Profile.svg';

const profileCard = () => {
    return (
        <div>
            <img src={profileImage} alt="" style={{ width: '170px', height: '170px' }}/>
            <span>Thai Nguyen</span>
            <h3>Contact</h3>
            <span> email</span>
            <span> phone number</span>
        </div>
    )
}

export default profileCard;