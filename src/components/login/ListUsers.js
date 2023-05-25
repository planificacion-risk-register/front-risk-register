import React, { useEffect, useState } from 'react'
import { getUsers } from '../../services/pruebaToken'

export const ListUsers = () => {
    const [users, setUsers] = useState({})

    const fectchList = async () =>{
        const {data} = await getUsers()
        setUsers(data)
    }
    useEffect(() =>{
        try {
            fectchList()
        } catch (error) {
            console.log(error)
        }
    }, [])
    return(
        <div>
            <li>
                <h2>Lista de usuarios</h2>
                {JSON.stringify(users)}
            </li>
        </div>
    )
}
