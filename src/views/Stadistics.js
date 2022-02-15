import React, {useState, useEffect, useCallback} from "react";
import {Line, Radar} from "react-chartjs-2";
import LinkButton from "../components/LinkButton";
import AnimatedJumbotron from "../components/AnimatedJumbotron";
import axios from "axios";

const options = {
    scales: {
        ticks: {
            min: 0,
            max: 16,
            stepSize: 2,
            showLabelBackdrop: false,
            backdropColor: "rgba(203, 197, 11, 1)"
        },
        angleLines: {
            color: "rgba(255, 255, 255, .3)",
            lineWidth: 1
        },
        gridLines: {
            color: "rgba(255, 255, 255, .3)",
            circular: true
        }
    },
};


const jumbotronProps = {
    content: ["Estadísticas"],
    style: "invisible md:visible mt-6",
    text: "flex-1 text-sm md:text-7xl lg:text-8xl",
};

export default function Stadistics() {
    const [chartData, setChartData] = useState({
        labels: ["Discriminación auditiva", "Conciencia fonológica", "Identificación visual"],
        datasets: [

        ]
    });

    const fetchData = useCallback(async () => {
        await axios({
            method: "GET",
            headers: {
                "x-access-token": localStorage.getItem("token")
            },
            url: "http://localhost:4000/api/reports/" + localStorage.getItem("childrenId"),
        })
            .then((res) => {
                const labels = [];
                const correctData = [];
                const incorrectData = [];

                res.data.forEach((item) => {
                    if (!labels.includes(item.nombre)) labels.push(item.nombre);
                    const index = labels.findIndex((label) => label === item.nombre);
                    correctData[index] = correctData[index] !== undefined
                        ? correctData[index] + item.correctas
                        : item.correctas;
                    incorrectData[index] = incorrectData[index] !== undefined
                        ? incorrectData[index] + item.incorrectas
                        : item.incorrectas;
                });

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: "Correctos",
                            backgroundColor: "rgba(34, 202, 236, .2)",
                            borderColor: "rgba(34, 202, 236, 1)",
                            pointBackgroundColor: "rgba(34, 202, 236, 1)",
                            poingBorderColor: "#fff",
                            pointHoverBackgroundColor: "#fff",
                            pointHoverBorderColor: "rgba(34, 202, 236, 1)",
                            data: correctData
                        },
                        {
                            label: "Inorrectos",
                            backgroundColor: "rgba(132, 32, 201, .2)",
                            borderColor: "rgba(132, 32, 201, 1)",
                            pointBackgroundColor: "rgba(132, 32, 201, 1)",
                            poingBorderColor: "#fff",
                            pointHoverBackgroundColor: "#fff",
                            pointHoverBorderColor: "rgba(132, 32, 201, 1)",
                            data: incorrectData
                        }
                    ],
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="inline-flex w-full">
            <div className="h-screen w-1/6 px-4 border-r bg-white">
                <div className="h-3/4 flex flex-col justify-around text-gray-500">
                    <h3 className="pl-1 cursor-pointer text-sm flex items-center py-2 mb-2 hover:bg-gray-100 hover:text-gray-700 transition duration-200 ease-in">
                        <i className="fas fa-2x fa-assistive-listening-systems text-indigo-800 mr-3"/>
                        <label className="hover:text-black transition duration-200 ease-linear cursor-pointer">
                            Discriminación Auditiva
                        </label>
                    </h3>
                    <h3 className="pl-1 cursor-pointer text-sm flex items-center py-2 mb-2 hover:bg-gray-100 hover:text-gray-700 transition duration-200 ease-in">
                        <i className="fas fa-2x fa-podcast text-indigo-800 mr-3"/>
                        <label className="hover:text-black transition duration-200 ease-linear cursor-pointer">
                            Conciencia Fonológica
                        </label>
                    </h3>
                    <h3 className="pl-1 text-sm flex items-center py-2 mb-2 hover:bg-gray-100 hover:text-gray-700 transition duration-200 ease-in">
                        <i className="fas fa-2x fa-spell-check text-indigo-800 mr-3"/>
                        <label className="hover:text-black transition duration-200 ease-linear cursor-pointer">
                            Identificación Visual
                        </label>
                    </h3>
                </div>
            </div>
            <div className="text-center ml-11">
                <div className="inline-flex space-x-16 justify-around mb-8">
                    <LinkButton
                        to="/main-page"
                        label="Atrás"
                        color="bg-blue-500"
                        fontSize="flex-1 text-3xl sm:text-4xl mt-6 p-4"
                    />
                    <AnimatedJumbotron features={jumbotronProps}/>
                </div>
                <div className="justify-center">
                    <Radar data={chartData} options={options} height={8} width={8}/>
                </div>
            </div>
        </div>
    );
}
