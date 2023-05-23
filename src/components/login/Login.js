import { React, useEffect, useState } from 'react'
import GoogleLogin from 'react-google-login'
import { gapi } from 'gapi-script'
import { LoginModel } from '../../models/Login'
import costa from '../../statics/img/costa-rica.jpg'
import logo from '../../statics/img/slogan1.png'
import { newLogin, loginGoogle } from '../../services/LoginService'
import { saveUser } from '../../services/UserService'

export const Login = () => {

    const clientID = "481489586127-t28bb9ijuf6tdeet2kv93q4nb4bpvuel.apps.googleusercontent.com"
    const [user, setUser] = useState({});
    const [newUserLogin, newSetuserLogin] = useState({})
    const [login, setLogin] = useState(LoginModel())

    const onSuccess = async (response) => {
        let result = false
        const userConst = {
            email: await response.profileObj.email,
            firstName: await response.profileObj.familyName,
            lastName: await response.profileObj.givenName,
            rol: "usuario",
            userName: await response.profileObj.name,
            password: "chocolate"
        }

        newSetuserLogin(userConst)
        const dato = await response.profileObj
        setUser(dato);
        document.getElementsByClassName("btn").hidden = true;
        console.log("data:", user? user.name: "nada")
        console.log("new user: ", newUserLogin)


        await saveUser(userConst).then((data) => {
            const res = data
            console.log("data de crear usuario: ", res)
            //si ya existe el usuario creado
            if(res.msg==="Usuario guardado con éxito"){
                console.log("usuario creado succes")
                localStorage.setItem("email", userConst.email)
            }else if(res.response.status===400){
                result = true
                console.log("ya existe el usuario: ", result)
            
            }else{
                console.log("usuario creado")
                //localStorage.setItem("email", userConst.email)
            }

        })
        if(result){
            const google = {
                email: await response.profileObj.email,
                password: userConst.password
            }
            await loginGoogle(google).then((data)=>{
                localStorage.setItem("token", data.token)
                localStorage.setItem("email", google.email)
            })
        }
        
    }

    const onFailure = (response) => {
        console.log("Something went wrong");
    }
 
    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientID,
            });
        }
        gapi.load("client:auth2", start);
    }, []);

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setLogin({ ...login, [name]: value })
    }

    const handleLogin = () => {
        newLogin(login).then((data) =>{
            console.log("desde login",data.token)
        })
    }

    return (
        <div className="center">
            <div className="grapper">
                <section className="vh-100" style={{ backgroundColor: '#b8f184' }}>
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col col-xl-10">
                                <div className="card" style={{ borderRadius: '1rem' }}>
                                    <div className="row g-0">
                                        <div className="col-md-6 col-lg-5 d-none d-md-block">
                                            <img
                                                id="fondo"
                                                src={costa}
                                                alt="login form"
                                                className="img-fluid"
                                                style={{ borderRadius: '1rem 0 0 1rem', marginTop: '40%' }}
                                            />
                                        </div>
                                        <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                            <div className="card-body p-4 p-lg-5 text-black">
                                                <div className="text-center">
                                                    <img className="logo" src={logo} alt="logo" />
                                                </div>

                                                <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                                                    Inicia sesión en tu cuenta
                                                </h5>

                                                <div className="form-floating mb-4">
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        onChange={handleChange}
                                                        className="form-control mt-3"
                                                        id="floatingInput"
                                                        placeholder="Ingrese usuario"
                                                    />
                                                    <label htmlFor="floatingInput">Correo</label>
                                                </div>

                                                <div className="form-floating mb-4">
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        onChange={handleChange}
                                                        className="form-control"
                                                        id="floatingPassword"
                                                        placeholder="Ingrese contraseña"
                                                    />
                                                    <label htmlFor="floatingPassword">Contraseña</label>
                                                </div>

                                                <div className="d-grid gap-2 mt-3">
                                                    <button type="button" className="btn btn-secondary btn-lg mt-lg-2" onClick={handleLogin}>
                                                        Iniciar sesión
                                                    </button>
                                                </div>

                                                <a className="small text-muted" href="#!">
                                                    ¿Olvidaste tu contraseña?
                                                </a>
                                                <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                                                    ¿No tienes cuenta? <a href="/signIn" style={{ color: '#f64343' }}>Registrarse</a>
                                                </p>
                                                <div className='d-flex justify-content-center align-items-center'>
                                                    <GoogleLogin

                                                        clientId={clientID}
                                                        onSuccess={onSuccess}
                                                        onFailure={onFailure}
                                                        buttonText="Continue  with Google"
                                                        cookiePolicy={"single_host_origin"}
                                                    />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <div className={user ? "profile" : "hidden"}>
                <img className='nada' src={user.imageUrl} height="200" />
                <h3>{user.name}</h3><br/>
                <h3>{user.email}</h3>
            </div>



        </div>
    )
}
