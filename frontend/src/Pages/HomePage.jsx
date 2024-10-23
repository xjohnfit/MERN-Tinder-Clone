import React from 'react';
import { useAuthStore } from '../Store/useAuthStore';

const HomePage = () => {

  const { logout } = useAuthStore();
    return (
        <div>
            HomePage
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default HomePage;
