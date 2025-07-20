import { InputBox } from "./Inputbox";
import { Heading } from "./Heading";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

export const SignupAuth = () => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState({
        email: "",
        name: "",
        password: ""
    });
    const [notification, setNotification] = useState({
        message: "",
        type: "" // "success" or "error"
    });

    async function sendRequest() {
        try {
            await axios.post('http://localhost:3000/api/v1/user/signup', postInputs, {
                withCredentials: true,
            });
            setNotification({
                message: "Account created successfully!",
                type: "success"
            });
            setTimeout(() => {
                navigate('/signin');
            }, 2000);
        } catch (e) {
            setNotification({
                message: "Error while signing up",
                type: "error"
            });
            setTimeout(() => {
                setNotification({
                    message: "",
                    type: ""
                });
            }, 3000);
        }
    }

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <Heading header="Create an Account" subheader="Already have an account?" to="Login" To="/signin" />
                    <InputBox
                        type="email"
                        label="Email"
                        placeholder="johndoe@abc.com"
                        onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                email: e.target.value
                            });
                        }}
                    />
                    <InputBox
                        type="text"
                        label="First Name"
                        placeholder="John Doe"
                        onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                name: e.target.value
                            });
                        }}
                    />
                    <InputBox
                        type="password"
                        label="Password"
                        placeholder="***********"
                        onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                password: e.target.value
                            });
                        }}
                    />
                    <button
                        onClick={sendRequest}
                        type="button"
                        className="mt-8 w-full text-white bg-orange-500 hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:hover:bg-orange-600 dark:ring-gray-700 dark:border-gray-700"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
            {notification.message && (
                <div
                    className={`fixed bottom-4 right-4 p-4 rounded-lg text-white ${
                        notification.type === "success"
                            ? "bg-green-500"
                            : "bg-red-500"
                    }`}
                >
                    {notification.message}
                </div>
            )}
        </div>
    );
}
