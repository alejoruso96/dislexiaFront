import React, {Component} from "react";

import LinkButton from "../components/LinkButton";
import ActionButton from "../components/ActionButton";
import CardsList from "../components/CardsList/CardsList";
import Swal from "sweetalert2";
import {Redirect} from "react-router-dom";
import defaultImage from "../assets/img/games/default.png";

import axios from "axios";

import "./game1.css";
import Data from '../data/gameType1.json';

export default class Game7 extends Component {

    constructor() {
        super();

        const dataByLevel = Data["L1"];

        const index = Math.floor(Math.random() * (dataByLevel.length));
        const object = dataByLevel[index];
        const textToRead = object.completeWord;
        const wordOptions = [
            this.formatGame7Data(object.auxiliaryWord
            )];
        const gameWords = [wordOptions[0].map(() => "")];
        const initialOptions = wordOptions[0]
            .map(obj => JSON.parse(JSON.stringify(obj)));
        import('../assets/img/games/' + object.completeWord.toLowerCase() + '.png')
            .then(image => this.setState({
                url: image.default
            }))
            .catch(() => this.setState({
                url: defaultImage
            }));

        this.state = {
            textToRead: textToRead,
            indexToComplete: 0,
            gameWords: [...gameWords],
            initialOptions: [initialOptions],
            wordOptions: [...wordOptions.slice()],
            score: {correct: 1, incorrect: 0},
            redirect: null,
            images: [
                "https://unsplash.it/400/200",
                "https://picsum.photos/seed/picsum/200/300",
                "https://picsum.photos/id/237/200/300",
            ],
        };
    }

    formatGame7Data(auxiliaryWord) {
        return auxiliaryWord.split(",")
            .map((syllable) => {
                return {
                    text: syllable,
                };
            }).sort(
                function () {
                    return Math.random() - 0.5
                }
            );
    }

    handleClick = (content) => {
        const indexOption = this.state.wordOptions[0]
            .findIndex(o => o.text === content);
        const newIndex = this.state.indexToComplete + 1;

        let updatedState = this.state.gameWords;
        updatedState[0][this.state.indexToComplete] = content;
        this.state.wordOptions[0].splice(indexOption, 1)

        console.log(this.state.initialOptions[0], this.state.wordOptions[0]);

        this.setState({
            gameWords: updatedState,
            indexToComplete: newIndex
        });

        if (this.state.wordOptions[0].length === 0) {
            this.validateAnswer().then();
        }
    };

    validateAnswer = async () => {
        const result = this.state.gameWords[0].join().replaceAll(",", "");


        if (this.state.textToRead === result) {
            let unaEstrella = [
                '<br><div className="vex-custom-field-wrapper"><label for="radio1" style="color:orange; font-size: 100px">★</label><label for="radio1" style="font-size: 100px;" >★</label><label for="radio1" style="font-size: 100px;">★</label></div>',
            ];
            let dosEstrella = [
                '<br><div className="vex-custom-field-wrapper"><label for="radio1" style="color:orange; font-size: 100px">★</label><label for="radio1" style="color:orange; font-size: 100px">★</label><label for="radio1" style="font-size: 100px;">★</label></div>',
            ];
            let tresEstrella = [
                '<br><div className="vex-custom-field-wrapper"><label for="radio1" style="color:orange; font-size: 100px">★</label><label for="radio1" style="color:orange; font-size: 100px">★</label><label for="radio1" style="color:orange; font-size: 100px">★</label></div>',
            ];
            let estrellas;
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
                html: `Correctos: <b> 1 punto</b> <br> Incorrectos: <b>${this.state.score.incorrect} puntos</b> ${estrellas}`,
            });
            axios
                .post(`http://localhost:4000/api/activities`, {
                    nombre: "Identificacion y Construccion",
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
        } else {
            const options = this.state.initialOptions[0]
                .map(obj => JSON.parse(JSON.stringify(obj)));
            const newGameWords = [this.state.initialOptions[0].map(() => "")];

            await Swal.fire({
                icon: "error",
                title: "Intentalo de nuevo",
                showConfirmButton: false,
                timer: 1500,
            });
            this.setState({
                score: {
                    correct: this.state.score.correct,
                    incorrect: this.state.score.incorrect + 1,
                },
                wordOptions: [options],
                gameWords: [...newGameWords],
                indexToComplete: 0
            });
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
                    <div className="cards-list">
                        <div>
                            <img src={this.state.url} alt="Not found" width={350}/>
                        </div>
                    </div>
                </div>
                <div className="flex-1 mt-3">
                    <CardsList
                        speakCallback={this.props.speakCallback}
                        options={this.state.wordOptions}
                        handleClick={this.handleClick}
                    />

                    <div className="text-center mt-8">
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
