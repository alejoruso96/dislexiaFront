import React, {useState} from "react";
import axios from "axios";
import {useHistory, useParams} from "react-router-dom";
import Swal from "sweetalert2";

export default function RecoverPassword() {
    const history = useHistory();
    const params = useParams();

    const [password, setPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState('');
    const [formClass] = useState({
        title: "Recuperar contraseña",
        footerClass: "flex items-center justify-between",
        button: "Cambiar contraseña",
    });

    const handleButton = () => {
        if (password !== confirmationPassword) {
            setErrorMessage("Las contraseñas no coinciden");
            return;
        }

        axios({
            method: "PUT",
            headers: {
                "reset-token": params.token
            },
            data: {
                newPassword: password,
            },
            withCredentials: true,
            url: "http://localhost:4000/api/user/supervisor/new-password",
        })
            .then((res) => {
                console.log(res);
                Swal.fire(
                    "Proceso exitoso",
                    "Se ha cambiado la contrasena",
                    "success"
                ).then(() => history.push("/"));
            })
            .catch((error) => setErrorMessage(error.message));
    };
    return (
        <div>
            <div className="min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                            alt="Workflow"
                        />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            {formClass.title}
                        </h2>
                    </div>
                    <div className="mt-8 space-y-6">
                        <input type="hidden" name="remember" value="true"/>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Contraseña"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="confirmationPassword"
                                    name="confirmationPassword"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Confirmar contraseña"
                                    onChange={(e) => setConfirmationPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="text-red-900 text-sm">
                            <label>
                                {errorMessage && (
                                    <p className="error"> {errorMessage} </p>
                                )}
                            </label>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={handleButton}
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                  <svg
                                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                      aria-hidden="true"
                                  >
                                    <path
                                        fillRule="evenodd"
                                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                        clipRule="evenodd"
                                    />
                                  </svg>
                                </span>
                                {formClass.button}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

