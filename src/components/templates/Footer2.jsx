import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import './style.css';

export const Footer2 = () => {

    const getToken = async () => {
        const result = localStorage.getItem("email")
        return result
    }

    const token = getToken()
    console.log("footer: ", token)
    return (
        <div className="" id="footer-2">
            <footer className="" id="">
                <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                    <li className="nav-item"><Link className="nav-link px-2 text-muted">Home</Link></li>
                    <li className="nav-item"><Link className="nav-link px-2 text-muted">Features</Link></li>
                    <li className="nav-item"><Link className="nav-link px-2 text-muted">Pricing</Link></li>
                    <li className="nav-item"><Link className="nav-link px-2 text-muted">FAQs</Link></li>
                    <li className="nav-item"><Link className="nav-link px-2 text-muted">About</Link></li>
                </ul>
                <p class="text-center text-muted">&copy; 2022 Company, Inc</p>
            </footer>
        </div>
    )
}
