import React, {Component} from "react";
import ActionButton from "../components/ActionButton";
import LinkButton from "../components/LinkButton";
import Card from "../components/CardsList/Card";
import {Redirect} from "react-router-dom";
import Swal from "sweetalert2";
import Data from "../data/gameType2.json";
import axios from "axios";

export default class Game5 extends Component {

    constructor() {
        super();
        const options = Data[2];
        const list = [];
        const correctListIndexes = [];
        const incorrectListIndexes = [];
        let correctWord = options[Math.floor(Math.random() * (options.length))];


        while (list.length <= 8) {
            const index = Math.floor(Math.random() * (options.length));
            list.push(this.formatGame6Data(list.length, options[index]));
            (list[list.length - 1].word === correctWord) ?
                correctListIndexes.push(list.length - 1) :
                incorrectListIndexes.push(list.length - 1);
        }

        this.state = {
            optionsList: list,
            correctWord: correctWord,
            correctListIndexes: correctListIndexes,
            incorrectListIndexes: incorrectListIndexes,
            score: {correct: 1, incorrect: 0},
            redirect: null,
        };
    }

    formatGame6Data(index, word) {
        return {
            index: index,
            word: word,
            isSelected: false
        };
    }

    changeOptionState(index) {
        const actualList = this.state.optionsList.map(element => {
            if (index === element.index) {
                element.isSelected = !element.isSelected;
            }
            return element;
        });
        this.setState({
            optionsList: actualList
        });
    }

    arrayEquals(a, b) {
        return Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((val, index) => val === b[index]);
    }

    verifyResult = async () => {
        const selectedHowCorrect = this.state.optionsList
            .filter(element => element.isSelected)
            .map(element => element.index);
        const selectedHowIncorrect = this.state.optionsList
            .filter(element => !element.isSelected)
            .map(element => element.index);

        if (this.arrayEquals(selectedHowCorrect, this.state.correctListIndexes)
            && this.arrayEquals(selectedHowIncorrect, this.state.incorrectListIndexes)) {
            let unaEstrella = [
                '<br><div class="vex-custom-field-wrapper"><label for="radio1" style="color:orange; font-size: 100px">★</label><label for="radio1" style="font-size: 100px;" >★</label><label for="radio1" style="font-size: 100px;">★</label></div>',
            ];
            let dosEstrella = [
                '<br><div class="vex-custom-field-wrapper"><label for="radio1" style="color:orange; font-size: 100px">★</label><label for="radio1" style="color:orange; font-size: 100px">★</label><label for="radio1" style="font-size: 100px;">★</label></div>',
            ];
            let tresEstrella = [
                '<br><div class="vex-custom-field-wrapper"><label for="radio1" style="color:orange; font-size: 100px">★</label><label for="radio1" style="color:orange; font-size: 100px">★</label><label for="radio1" style="color:orange; font-size: 100px">★</label></div>',
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
                    nombre: "Identificacion Visual 1",
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
            });
        }
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }
        return (
            <div className="g1 bg-gray-200 pb-7">
                <div className="py-10">
                    <LinkButton
                        to="/games"
                        icon="fas fa-home"
                        color="bg-yellow-500"
                        fontSize="text-4xl mt-12"
                    />
                </div>
                <div className="flex ml-96 text-center mb-5">
                    <div className="flex-initial">
                        <Card speakCallback={this.props.speakCallback}
                              content={this.state.correctWord} changeBg="true"/>
                    </div>
                    <div className="flex-initial mt-11">
                        <ActionButton
                            icon="fas fa-check"
                            color="bg-green-500"
                            fontSize="text-4xl mt-12"
                            handleAnswer={this.verifyResult}
                        />
                    </div>
                </div>

                <div className="flex mx-60 text-center">
                    {this.state.optionsList.slice(0, 3).map(element => {
                        return (
                            <div key={element.index} className="flex-1"
                                 onClick={() => this.changeOptionState(element.index)}>
                                <Card speakCallback={this.props.speakCallback}
                                      content={element.word} changeBg="true"/>
                            </div>
                        );
                    })}
                </div>
                <div className="flex mx-60 my-3 text-center">
                    {this.state.optionsList.slice(3, 6).map(element => {
                        return (
                            <div key={element.index} className="flex-1"
                                 onClick={() => this.changeOptionState(element.index)}>
                                <Card speakCallback={this.props.speakCallback}
                                      content={element.word} changeBg="true"/>
                            </div>
                        );
                    })}
                </div>
                <div className="flex mx-60 text-center">
                    {this.state.optionsList.slice(6, 9).map(element => {
                        return (
                            <div key={element.index} className="flex-1"
                                 onClick={() => this.changeOptionState(element.index)}>
                                <Card speakCallback={this.props.speakCallback}
                                      content={element.word} changeBg="true"/>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}
