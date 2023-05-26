import React from 'react'
import { useState } from 'react'
import { ModelUser } from '../../models/User'
import logo from '../../statics/img/slogan2.png'
import { Link, useNavigate } from 'react-router-dom'
import { toastSucces, toastError, toastWarning } from '../utils/ToastNotify'
import { saveUser,createUser } from '../../services/UserService'
import './style/create.css'

export const CreateUser = () => {

    const [user, setUser] = useState(ModelUser())
    const email_expresion = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const password_expresion = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/;
    const [confirmPassword, setConfirmPassword] = useState({ confirmPassword: "" })
    const navigate = useNavigate()

    const handleChange = (e) => {
        const value = e.target.value
        const name = e.target.name
        setUser({ ...user, [name]: value })
        setConfirmPassword({ ...confirmPassword, [name]: value })
    }
    console.log(confirmPassword)

    const onSubmit = async () => {

        if (user.email === '' || user.password === '' || user.firstName === '' || user.lastName === '') {
            toastWarning('Todos los campos son obligatorios')
            return
        }
        if (!email_expresion.test(user.email)) {
            toastError('El email no es válido')
            return
        }
        if (!password_expresion.test(user.password)) {
            toastWarning('La contraseña debe tener al menos 8 caracteres y al menos 1 dígito, 1 letra minúscula y 1 letra mayúscula')
            return
        }
        if (confirmPassword.confirmPassword !== user.password) {
            toastWarning('La contraseña no coincide')
            return
        }

        const userFinal = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            rol: user.rol,
            userName: user.userName
        }
        saveUser(userFinal).then((data) => {
            if(data.msg==="Usuario guardado con éxito"){
                toastSucces(data.msg)
                navigate("/")
            }else if (data.response.status === 400) {
                console.log("entre al error 400")
                toastError(data.response.data.msg)
            }
        })
        //con el interceptor
       /*await createUser(userFinal).then((data) => {
            console.log(data.data)
            toastSucces(data.data.msg)
            navigate("/")
        }).catch((error) => {
            console.log(error)
        })*/
    }

    return (
        <div className="grapper">
            <section className="vh-100" style={{ backgroundColor: '#ffceee' }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card" style={{ borderRadius: '1rem' }}>
                                <div className="row g-0">
                                    <div className="col-md-6 col-lg-5 d-none d-md-block" id="fondo-create">
                                        <img src="https://preview.colorlib.com/theme/bootstrap/login-form-08/images/undraw_file_sync_ot38.svg" alt="login form" className="img-fluid" style={{ borderRadius: '1rem 0 0 1rem', marginTop: '40%' }} />
                                    </div>
                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black">
                                            <div className="text-center">
                                                <img className="logo" src={logo} alt="logo" />
                                            </div>

                                            <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px', fontFamily: 'sans-serif'}}>
                                                Create account
                                            </h5>
                                            <div className="form-container">

                                                <div className="form-floating mb-4">
                                                    <input type="text" name="firstName" onChange={handleChange} className="form-control" id="floatingInput" minLength="3" required />
                                                    <label htmlFor="floatingInput">First Name</label>
                                                </div>

                                                <div className="form-floating mb-4">
                                                    <input type="text" name="lastName" onChange={handleChange} className="form-control" id="floatingInput" minLength="3" required />
                                                    <label htmlFor="floatingInput">Last Name</label>
                                                </div>

                                                <div className="form-floating mb-4">
                                                    <input type="text" name="userName" onChange={handleChange} className="form-control" id="floatingInput" minLength="3" required />
                                                    <label htmlFor="floatingInput">Username</label>
                                                </div>

                                                <div className="form-floating mb-4">
                                                    <input type="email" name="email" onChange={handleChange} className="form-control" id="floatingInput" minLength="3" required />
                                                    <label htmlFor="floatingInput">Email</label>
                                                </div>

                                                <div className="form-floating mb-4">
                                                    <input type="password" name="password" onChange={handleChange} className="form-control" id="floatingPassword" minLength="5" required />
                                                    <label htmlFor="floatingPassword">Password</label>
                                                </div>

                                                <div className="form-floating mb-4">
                                                    <input type="password" name="confirmPassword" onChange={handleChange} className="form-control" id="floatingPassword" minLength="3" required />
                                                    <label htmlFor="floatingPassword">Confirm Password</label>
                                                </div>

                                            </div>
                                            <div className="d-grid gap-2 mt-3">
                                                <button type="button" className="btn btn-secondary btn-lg mt-lg-2" onClick={onSubmit}>
                                                    To register
                                                </button>
                                            </div>
                                            <br />
                                            <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                                                <Link to={'/'} style={{ color: '#f64343', fontSize: 'large' }}>
                                                    Back
                                                </Link>
                                            </p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
