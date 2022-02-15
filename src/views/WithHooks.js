import React from 'react';
import {useSpeechSynthesis} from "react-speech-kit";

export const WithHooks = (Component) => {
    const {speak} = useSpeechSynthesis();

    const sayAnything = (anything) => {
        speak({text: anything});
    }

    return (props) => {
        return <Component speakCallback={sayAnything}
                          {...props}/>;
    };
};