import { React, useEffect, useState } from 'react'
import GoogleLogin from 'react-google-login'
import { gapi } from 'gapi-script'

export const Login = () => {

    const clientID = "481489586127-t28bb9ijuf6tdeet2kv93q4nb4bpvuel.apps.googleusercontent.com"
    const [user, setUser] = useState({});
    const [newUser, newSetuser] = useState({})
    const [loggeIn, setLoggetInfo] = useState(false);

    const onSuccess = (response) => {
       const userConst = {
            email: response.profileObj.email,
            name: response.profileObj.familyName,
            lastName: response.profileObj.givenName,
            image: response.profileObj.imageUrl
        }

        newSetuser(userConst)
        setUser(response.profileObj);
        document.getElementsByClassName("btn").hidden = true;
        console.log("data:", response)
        console.log("new user: ", userConst)
    }
    const onFailure = (response) => {
        console.log("Something went wrong");
    }
    const handleLogout = () => {
        setUser({});
    }

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientID,
            });
        }
        gapi.load("client:auth2", start);
    }, []);

    return (
        <div className="center">
            <h1>Login</h1>

            <input type='text' value={newUser.email}></input><br>
            </br>
            <input type='text' value={newUser.password}></input>
            <div className='btn'>

                <GoogleLogin

                    clientId={clientID}
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    buttonText="Continue  with Google"
                    cookiePolicy={"single_host_origin"}
                />

            </div>

            <div className={user ? "profile" : "hidden"}>
                <img src={user.imageUrl}  height="200" />
                <h3>{user.name}</h3>

            </div>



        </div>
    )
}
