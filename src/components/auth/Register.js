import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import useLocalStorageState from "use-local-storage-state"

export const Register = (props) => {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: ""
    })
    let navigate = useNavigate()

    const [celestialUser, setCelestialUser] = useLocalStorageState("celestial_user")

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    setCelestialUser({
                        id: createdUser.id,
                        userId: createdUser.id,
                    })

                    navigate("/Home")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${user.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateUser = (evt) => {
        const copy = { ...user }
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    return (

        <div className="container--register">
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="register-title">Please Register for Celestial Sphere</h1>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input onChange={updateUser}
                        type="text" id="firstName" className="form-control"
                        placeholder="Enter your first name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input onChange={updateUser}
                        type="text" id="lastName" className="form-control"
                        placeholder="Enter your last name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateUser}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <button type="submit" className="btn btn-primary"> Register →</button>
                </fieldset>
            </form>
        </div>

    )
}

