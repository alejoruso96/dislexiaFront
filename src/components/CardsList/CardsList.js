import React, {Component} from "react";
import Card from "./Card";

import "./cardsList.css";

export default class CardsList extends Component {
    render() {
        return (
            <div className="cards-list">
                <Card
                    speakCallback={this.props.speakCallback}
                    content={this.props.options[0][0].text}
                    handleClick={this.props.handleClick}
                />
                <Card
                    speakCallback={this.props.speakCallback}
                    content={this.props.options[0][1].text}
                    handleClick={this.props.handleClick}
                />
                <Card
                    speakCallback={this.props.speakCallback}
                    content={this.props.options[0][2].text}
                    handleClick={this.props.handleClick}
                />
            </div>
        );
    }
}
