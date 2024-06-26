import React, {Component} from "react";

import LinkButton from "../components/LinkButton";
import ActionButton from "../components/ActionButton";
import CardsList from "../components/CardsList/CardsList";
import Swal from "sweetalert2";
import {Redirect} from "react-router-dom";

import axios from "axios";

import "./game1.css";
import Data from '../data/gameType1.json';

export default class Game1 extends Component {

    constructor() {
        super();
        const dataByLevel = Data["L1"];
        const wordIndex = [];
        let textToRead = "";
        const gameWords = [];
        const wordOptions = [];
        while (wordIndex.length <= 4) {
            const index = Math.floor(Math.random() * (dataByLevel.length));
            if (!wordIndex.includes(index)) {
                const object = dataByLevel[index];

                if (textToRead === "")
                    textToRead =
                        dataByLevel[index].initialState
                            .join()
                            .replaceAll(",", "");

                wordIndex.push(index);
                gameWords.push(object.initialState);
                wordOptions.push(object.options.sort(
                    function () {
                        return Math.random() - 0.5
                    }
                ));
            }
        }

        this.state = {
            textToRead: textToRead,
            indexToComplete: gameWords[0].findIndex(e => e === ""),
            gameWords: [...gameWords, ["", "", ""]],
            wordOptions: [...wordOptions, [{text: ""}, {text: ""}, {text: ""}]],
            score: {correct: 0, incorrect: 0},
            redirect: null,
            images: [
                "https://unsplash.it/400/200",
                "https://picsum.photos/seed/picsum/200/300",
                "https://picsum.photos/id/237/200/300",
            ],
        };

        console.log(this.state);
    }

    handleClick = (content) => {
        let updatedState = this.state.gameWords;
        console.log(this.state.indexToComplete);
        updatedState[0][this.state.indexToComplete] = content;

        this.setState({
            gameWords: updatedState,
            textToRead: updatedState[0].join(''),
        });
    };

    validateAnswer = async () => {
        let alert;
        const correct = this.state.wordOptions[0].find(
            (element) => element.val === true
        );
        if (this.state.gameWords[0][this.state.indexToComplete] === correct.text) {
            alert = {icon: "success", title: "Correcto"};
            const gameWords = this.state.gameWords.slice(1, this.state.gameWords.length);
            this.setState({
                indexToComplete: gameWords[0].findIndex(e => e === ""),
                gameWords: gameWords,
                wordOptions: this.state.wordOptions.slice(
                    1,
                    this.state.wordOptions.length
                ),
                score: {
                    correct: this.state.score.correct + 1,
                    incorrect: this.state.score.incorrect,
                },
            });
        } else {
            alert = {icon: "error", title: "Inténtalo de nuevo"};
            this.setState({
                score: {
                    correct: this.state.score.correct,
                    incorrect: this.state.score.incorrect + 1,
                },
            });
        }
        if (this.state.score.correct === 4) {
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
                html: `Correctos: <b>${
                    this.state.score.correct + 1
                } puntos</b> <br> Incorrectos: <b>${
                    this.state.score.incorrect
                } puntos</b> ${estrellas}`,
            });
            axios
                .post(`http://localhost:4000/api/activities`, {
                    nombre: "Discriminacion auditiva 1",
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
        } else {
            await Swal.fire({
                icon: alert.icon,
                title: alert.title,
                showConfirmButton: false,
                timer: 1500,
            });
        }

        if (this.state.score.correct === 5) {
            this.setState({redirect: "/games"});
        }
    };

    playAudio = () => {
        this.props.speakCallback(this.state.textToRead);
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
        const items = this.state.gameWords[0].map((item, index) => {
            if (item === "") {
                return (
                    <p
                        className="font-luckiest-guy border-dashed border-4 border-red-600 rounded-3xl px-20 mx-3"
                        key={index}
                    />
                );
            } else {
                const found = this.state.wordOptions[0].find(
                    (element) => element.text === item
                ); // Possibly requires a change in logic.
                if (found !== undefined) {
                    return (
                        <p
                            className="font-luckiest-guy border-dashed border-4 border-red-600 rounded-3xl text-red-600 px-5 mx-3 text-9xl"
                            key={index}
                        >
                            {item}
                        </p>
                    );
                } else {
                    return (
                        <p className="font-luckiest-guy text-white text-9xl" key={index}>
                            {item}
                        </p>
                    );
                }
            }
        });

        return (
            <div className="g1 h-screen overflow-auto">
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
                <div className="flex-1 mt-3">
                    <p className="font-luckiest-guy text-4xl sm:text-5xl text-white mb-6 text-center">
                        Puntaje: {this.state.score.correct}
                    </p>

                    <CardsList
                        speakCallback={this.props.speakCallback}
                        options={this.state.wordOptions}
                        handleClick={this.handleClick}
                    />

                    <div className="text-center mt-8">
                        <ActionButton
                            icon="fas fa-check"
                            color="bg-yellow-400"
                            fontSize="text-4xl p-4"
                            handleAnswer={this.validateAnswer}
                        />
                        <br/>
                        <div className="inline-flex mt-12">{items}</div>
                        <i
                            className="fas fa-volume-up text-2xl text-gray-900 inline-block align-top mt-16 cursor-pointer"
                            onClick={this.playAudio}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
