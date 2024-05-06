import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const UnAuth = () => {
    const navigate = useNavigate();
    return (
        <div>401
            <p>Unauthorized</p>
            <Link to='/login'>Back to Login / Signup page</Link>
        </div>
    )
}

export default UnAuth