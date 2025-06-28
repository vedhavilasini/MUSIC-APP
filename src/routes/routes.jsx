import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Auth/Home";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import ResetPassword from "../Auth/ResetPassword";
import ProfileContainer from "../Components/UserProfile/ProfileContainer";
import AddProfile from "../Components/UserProfile/AddProfile";
import ChangePassword from "../Components/UserProfile/ChangePassword";
import UploadProfilePhoto from "../Components/UserProfile/UploadProfilePhoto";
import DeleteAccount from "../Components/UserProfile/DeleteAccount";
import MyAccount from "../Components/UserProfile/MyAccount";
import AdminContainer from"../admin/AdminContainer";
import CreateAlbum from "../admin/album/CreateAlbum";
import AlbumLandlingContainer from "../albumlandling/AlbumLandlingContainer";
import PopularAlbums from "../albumlandling/PopularAlbums";
import AlbumDetails from "../albumlandling/AlbumDetails";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";



let myRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path:"/",
                element: <AlbumLandlingContainer />,
                children:[
                    {
                        index:true,
                        element:<PopularAlbums/>
                    },
                    {
                        path:"album-details/:title",
                        element:<AlbumDetails/>
                    }
                ]
            },
            {
                path: "/auth/login",
                element:(
                <PublicRoutes>
                    <Login/>
                </PublicRoutes>
                )
            },
            {
                path: "/auth/register",
                element:(
                <PublicRoutes>
                    <Register />
                </PublicRoutes>
                )
            },
            {
                path: "auth/reset-password",
                element:(
                <PublicRoutes> 
                    <ResetPassword />
                </PublicRoutes> 
                    )
            },
            {
                path:"/admin",
                element:<AdminContainer/>,
                children:[
                    {
                        path:"create-album",
                        element:<CreateAlbum/>
                    }
                ]
            },
            {
                path: "/user/profile",
                element:(
                <PrivateRoutes>
                    <ProfileContainer />
                </PrivateRoutes>
                    ),
                children: [
                    {
                        index:true,
                        element: <MyAccount/>
                    },
                    {
                        path: "add-profile",
                        element: <AddProfile />
                    },
                    {
                        path: "upload-profile-photo",
                        element: <UploadProfilePhoto />
                    },
                    {
                        path: "change-password",
                        element: <ChangePassword />
                    },
                    {
                        path: "delete-account",
                        element: <DeleteAccount />
                    },

                ]
            },
            {
                path: "*",
                element: <h1>error:404 page not found</h1>
            }
        ]

    },

]);
export default myRoutes
