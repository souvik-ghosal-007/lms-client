import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../../auth/authSlice";
import axios from "axios";
import Loader from "../../components/Loader";

const LoginPage = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const dispatch = useDispatch();
    const { isLoggedIn, user } = useSelector((state) => state.auth);

    const navigate = useNavigate();

    const onButtonClick = () => {
        setEmailError("");
        setPasswordError("");

        if ("" === email) {
            setEmailError("Please enter your email");
            return;
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email");
            return;
        }

        if ("" === password) {
            setPasswordError("Please enter a password");
            return;
        }

        if (password.length < 5) {
            setPasswordError("The password must be 6 characters or longer");
            return;
        }

        handleLogin();
    };

    const handleLogin = async () => {
        // Immediately show the loader when login starts
        handleOpen();

        let res = {};
        try {
            // Your login logic...
            res = await axios.get(
                `https://lms-server-tktv.onrender.com/search?email=${email}`
            );
            const user = res.data[0];

            if (user) {
                if (user.user_password === password) {
                    // Simulate login process (e.g., setting user session, redirecting)
                    setTimeout(() => {
                        // Close the loader after 3 seconds
                        handleClose();
                        // Dispatch login action
                        dispatch(login(user));
                        // Redirect user
                        const redirectUrl =
                            sessionStorage.getItem("redirectAfterLogin") || "/";
                        sessionStorage.removeItem("redirectAfterLogin");
                        navigate(redirectUrl, { replace: true });
                    }, 3000); // Keep the loader visible for 3 seconds
                } else {
                    setTimeout(() => {
                        // If password is incorrect, still close the loader after 3 seconds
                        handleClose();
                        setPasswordError(
                            "Incorrect Password! Please Try again"
                        );
                    }, 3000);
                }
            } else {
                setTimeout(() => {
                    // If user not found, close the loader after 3 seconds
                    handleClose();
                    setEmailError(
                        "Email not found! Please Enter Correct Email"
                    );
                }, 3000);
            }
        } catch (err) {
            console.log(err);
            setTimeout(() => {
                // In case of an error, close the loader after 3 seconds and show an error
                handleClose();
                setEmailError("Email not found! Please Enter Correct Email");
            }, 3000);
        }
    };

    const [openLoader, setOpenLoader] = useState(false);
    const handleClose = () => {
        setOpenLoader(false);
    };
    const handleOpen = () => {
        setOpenLoader(true);
    };

    return (
        <div className="mainContainer">
            {openLoader && <Loader open={openLoader} />}
            <div className="titleContainer">
                <div>Login</div>
            </div>
            <br />
            <div className="inputContainer">
                <input
                    value={email}
                    placeholder="Enter your email here"
                    onChange={(ev) => setEmail(ev.target.value)}
                    className={"inputBox"}
                />
                <label className="errorLabel">{emailError}</label>
            </div>
            <br />
            <div className="inputContainer">
                <input
                    value={password}
                    placeholder="Enter your password here"
                    onChange={(ev) => setPassword(ev.target.value)}
                    className="inputBox"
                />
                <label className="errorLabel">{passwordError}</label>
            </div>
            <br />
            <div className="inputContainer">
                <input
                    className="inputButton"
                    type="button"
                    onClick={onButtonClick}
                    value={"Log in"}
                />
            </div>
        </div>
    );
};

export default LoginPage;
