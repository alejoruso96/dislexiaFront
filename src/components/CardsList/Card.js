import React, {Component} from "react";

export default class Card extends Component {

    constructor() {
        super();
        this.state = {
            bg: "card bg-red-600",
        }
    }

    handleClick = () => {
        console.log(this.props);
        this.props.handleClick(this.props.content);
    };

    changeBg = () => {
        if (this.state.bg === "card bg-red-600") {
            this.setState({
                bg: "card bg-yellow-600",
            });
        }
        if (this.state.bg === "card bg-yellow-600") {
            this.setState({
                bg: "card bg-red-600",
            });
        }
    };

    render() {
        let content;

        if (this.props.handleClick !== undefined) {
            content = (
                <div className="card bg-red-600" onClick={this.handleClick}>
                    <div className="card_title title-white">
                        <p className="font-luckiest-guy">
                            {this.props.content}{" "}
                            <i
                                id="icon"
                                className="fas fa-volume-up text-2xl inline-block align-text-top"
                                onClick={() =>
                                    this.props.speakCallback(this.props.content)}
                            />
                        </p>
                    </div>
                </div>
            );
        }
        if (this.props.handleClick === undefined) {
            if (this.props.changeBg !== undefined) {
                if (this.props.changeBg === true) {
                    content = (<div className="card bg-red-600" onClick={this.changeBg}>
                        <div className="card_title title-white">
                            <p>
                                {this.props.content}{" "}
                                <i
                                    id="icon"
                                    className="fas fa-volume-up mt-5 text-2xl  inline-block align-text-top"
                                    onClick={() =>
                                        this.props.speakCallback(this.props.content)}
                                />
                            </p>
                        </div>
                    </div>);
                } else {
                    content = (
                        <div className={this.state.bg} onClick={this.changeBg}>
                            <div className="card_title title-white">
                                <p className="text-7xl">
                                    {this.props.content}{" "}
                                    <i
                                        id="icon"
                                        className="fas fa-volume-up mt-5 text-2xl  inline-block align-text-top"
                                        onClick={() =>
                                            this.props.speakCallback(this.props.content)}
                                    />
                                </p>
                            </div>
                        </div>
                    );
                }
            } else {
                if (this.props.Bg !== undefined) {
                    content = (
                        <div className="card bg-yellow-600">
                            <div className="card_title title-white">
                                <p className="text-7xl">
                                    {this.props.content}{" "}
                                    <i
                                        id="icon"
                                        className="fas fa-volume-up mt-5 text-2xl  inline-block align-text-top"
                                        onClick={() =>
                                            this.props.speakCallback(this.props.content)}
                                    />
                                </p>
                            </div>
                        </div>
                    );
                } else {
                    content = (
                        <div className="card bg-red-600">
                            <div className="card_title title-white">
                                <p className="font-luckiest-guy text-7xl">
                                    {this.props.content}{" "}
                                    <i
                                        id="icon"
                                        className="fas fa-volume-up mt-5 text-2xl  inline-block align-text-top"
                                        onClick={() =>
                                            this.props.speakCallback(this.props.content)}
                                    />
                                </p>
                            </div>
                        </div>
                    );
                }
            }
        }
        return (
            <div>
                {content}
            </div>
        );
    }
}
