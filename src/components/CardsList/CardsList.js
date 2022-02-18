import React, {Component} from "react";
import Card from "./Card";

import "./cardsList.css";

export default class CardsList extends Component {
    render() {
        return (
            <div className="cards-list">
                {this.props.options[0].map((option) => {
                    return <Card
                        speakCallback={this.props.speakCallback}
                        content={option.text}
                        handleClick={this.props.handleClick}
                    />
                })}
            </div>
        );
    }
}
