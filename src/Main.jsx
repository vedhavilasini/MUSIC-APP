import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./global.css"
import { RouterProvider } from 'react-router-dom';
import AuthContextApi from './Context/AuthContextApi';
import myRoutes from './routes/routes';
import FetchUserContext from './Context/FetchUserContext';
import AudioPlayerContext from './Context/AudioPlayerContext';

ReactDOM.createRoot(document.getElementById("root")).render(
    <>
        <AuthContextApi>
            <FetchUserContext>
                <AudioPlayerContext>
                    <RouterProvider router={myRoutes} />
                </AudioPlayerContext>
            </FetchUserContext>
        </AuthContextApi>

    </>
);