import React, {Component} from "react";
import LinkButton from "../components/LinkButton";
import ActionButton from "../components/ActionButton";
import {Redirect} from "react-router-dom";
import Card from "../components/CardsList/Card";
import "./game2.css";
import Swal from "sweetalert2";
import axios from "axios";
import Data from "../data/gameType1.json";

export default class Game2 extends Component {

    constructor() {
        super();
        const dataByLevel = Data["L1"];
        const wordIndex = [];
        const options = [];
        const correctWord = [];
        let tasks = undefined;

        while (wordIndex.length <= 4) {
            const index = Math.floor(Math.random() * (dataByLevel.length));
            if (!wordIndex.includes(index)) {
                const object = dataByLevel[index];
                const formattedObject = this.formatGame2Data(object.auxiliaryWord);

                (wordIndex.length === 0) ?
                    tasks = formattedObject : options.push(formattedObject);

                wordIndex.push(index);
                correctWord.push(object.auxiliaryWord);
            }
        }

        this.state = {
            tasks: tasks,
            options: [
                ...options,
                [
                    {
                        taskName: "",
                        type: "inProgress",
                    },
                ],
            ],
            correctWord: correctWord,
            completedWord: [],
            score: {correct: 0, incorrect: 0},
            redirect: null,
        }
    }

    formatGame2Data(auxiliaryWord) {
        return auxiliaryWord.split(",")
            .map((syllable) => {
                return {
                    taskName: syllable,
                    type: "inProgress"
                };
            }).sort(
                function () {
                    return Math.random() - 0.5
                }
            );
    }

    onDragStart = (event, taskName) => {
        event.dataTransfer.setData("taskName", taskName);
    };
    onDragOver = (event) => {
        event.preventDefault();
    };

    onDrop = (event, cat) => {
        let taskName = event.dataTransfer.getData("taskName");
        this.setState({
            completedWord: this.state.completedWord.push(taskName),
        });
        console.log(this.state.completedWord);

        let tasks = this.state.tasks.filter((task) => {
            if (task.taskName === taskName) {
                task.type = cat;
            }
            return task;
        });

        this.setState({
            ...this.state,
            tasks,
        });
        this.verifyWord();
    };

    verifyWord = async () => {
        let completed = this.state.tasks.find((task) => task.type === "inProgress");
        if (completed === undefined) {
            if (this.state.completedWord.toString() === this.state.correctWord[0]) {
                await Swal.fire({
                    icon: "success",
                    title: "Bien hecho",
                    showConfirmButton: false,
                    timer: 1500,
                });
                this.setState({
                    tasks: this.state.options[0],
                    options: this.state.options.slice(1, this.state.options.length),
                    correctWord: this.state.correctWord.slice(
                        1,
                        this.state.correctWord.length
                        ,
                    ),
                    completedWord: [],
                    score: {
                        correct: this.state.score.correct + 1,
                        incorrect: this.state.score.incorrect,
                    },
                });
            } else {
                await Swal.fire({
                    icon: "error",
                    title: "Intentalo de nuevo",
                    showConfirmButton: false,
                    timer: 1500,
                });
                let reload = this.state.tasks.map((item) => {
                    item.type = "inProgress";
                    return item;
                });
                this.setState({
                    tasks: reload,
                    completedWord: [],
                    score: {
                        correct: this.state.score.correct,
                        incorrect: this.state.score.incorrect + 1,
                    },
                });
            }
            if (this.state.score.correct === 5) {
                var unaEstrella = [
                    '<br><div className="vex-custom-field-wrapper"><label for="radio1" style="color:orange; font-size: 100px">★</label><label for="radio1" style="font-size: 100px;" >★</label><label for="radio1" style="font-size: 100px;">★</label></div>',
                ];
                var dosEstrella = [
                    '<br><div className="vex-custom-field-wrapper"><label for="radio1" style="color:orange; font-size: 100px">★</label><label for="radio1" style="color:orange; font-size: 100px">★</label><label for="radio1" style="font-size: 100px;">★</label></div>',
                ];
                var tresEstrella = [
                    '<br><div className="vex-custom-field-wrapper"><label for="radio1" style="color:orange; font-size: 100px">★</label><label for="radio1" style="color:orange; font-size: 100px">★</label><label for="radio1" style="color:orange; font-size: 100px">★</label></div>',
                ];
                var estrellas;
                if (this.state.score.incorrect > 2) {
                    estrellas = unaEstrella;
                } else {
                    if (this.state.score.incorrect === 0) {
                        estrellas = tresEstrella;
                    } else {
                        estrellas = dosEstrella;
                    }
                }

                await Swal.fire({
                    title: "GANASTE!",
                    timer: 4000,
                    imageUrl:
                        "https://i.pinimg.com/originals/7a/55/bd/7a55bd283db2443f1761ebabff200bc6.gif",
                    showConfirmButton: false,
                    html: `Correctos: <b>${this.state.score.correct} puntos</b> <br> Incorrectos: <b>${this.state.score.incorrect} puntos</b> ${estrellas}`,
                });
                axios
                    .post(`http://localhost:4000/api/activities`, {
                        nombre: "Conciencia Fonologica 1",
                        correctas: this.state.score.correct,
                        incorrectas: this.state.score.incorrect,
                        idNino: localStorage.getItem("childrenId"),
                    }, {
                        headers: {
                            "x-access-token": localStorage.getItem("token")
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                    });
                this.setState({redirect: "/games"});
            }
        }
    };

    playAudio = () => {
        const word = this.state.correctWord[0].replaceAll(",", "");
        console.log(this.state.correctWord[0], word);
        this.props.speakCallback(word);
    };

    showInstructions = () => {
        Swal.fire({
            title: "Instrucción 1",
            text: "Descripción",
            imageUrl: "https://unsplash.it/400/200",
            imageWidth: 500,
            imageHeight: 250,
            confirmButtonColor: "#3085d6",
            confirmButtonText: '<i class="fas fa-2x fa-arrow-circle-right"></i>',
        }).then(() => {
            Swal.fire({
                title: "Instrucción 2",
                text: "Descripción",
                imageUrl: "https://unsplash.it/400/200",
                imageWidth: 500,
                imageHeight: 250,
                confirmButtonColor: "#3085d6",
                confirmButtonText:
                    '<i class="fas fa-2x fa-arrow-circle-right"></i>',
            }).then(() => {
                Swal.fire({
                    title: "Instrucción 3",
                    text: "Descripción",
                    imageUrl: "https://unsplash.it/400/200",
                    imageWidth: 500,
                    imageHeight: 250,
                    confirmButtonColor: "#3085d6",
                    confirmButtonText:
                        '<i class="fas fa-2x fa-arrow-circle-right"></i>',
                });
            });
        });
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }
        const tasks = {
            inProgress: [],
            Done: [],
        };

        this.state.tasks.forEach((task, index) => {
            tasks[task.type].push(
                <div
                    key={index}
                    onDragStart={(event) => this.onDragStart(event, task.taskName)}
                    draggable
                    className="draggable card2"
                >
                    <Card speakCallback={this.props.speakCallback}
                          content={task.taskName}/>
                </div>
            );
        });
        return (
            <div className="g1 h-screen mb-12">
                <div className="inline-flex mt-6">
                    <LinkButton
                        to="/games"
                        icon="fas fa-home"
                        color="bg-yellow-500"
                        fontSize="flex-1 text-4xl p-4 mx-2"
                    />
                    <ActionButton
                        icon="fas fa-address-book"
                        color="bg-blue-500"
                        fontSize="flex-1 text-4xl p-4"
                        handleAnswer={this.showInstructions}
                    />
                </div>
                <p className="font-luckiest-guy text-5xl text-gray-200 mb-6 text-center">
                    Puntaje: {this.state.score.correct}
                </p>
                <div className="drag-container">
                    <div
                        className="inProgress"
                        onDragOver={(event) => this.onDragOver(event)}
                        onDrop={(event) => {
                            this.onDrop(event, "inProgress");
                        }}
                    >
                        {tasks.inProgress}
                    </div>

                    <div
                        className="droppable text-center "
                        onDragOver={(event) => this.onDragOver(event)}
                        onDrop={(event) => this.onDrop(event, "Done")}
                    >
            <span className="group-header font-luckiest-guy text-gray-200 text-4xl">
              Aquí
            </span>
                        {tasks.Done}
                    </div>
                    <i
                        className="fas fa-volume-up text-9xl text-gray-900 inline-block align-top mt-16 cursor-pointer"
                        onClick={this.playAudio}
                    />
                    <p className="font-luckiest-guy px-20 mx-3 text-9xl text-gray-200">
                        {this.state.completedWord}
                    </p>
                </div>
            </div>
        );
    }
}
