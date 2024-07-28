import React from "react";
import Slideshow from "./Slideshow";
import { useState } from "react";
import { Input } from "./Input/Input";

export const SlideshowWrapper: React.FC = () => {

    const [numUsers, setNumUsers] = useState<number>(5);
    const [running, setRunning] = useState<boolean>(true);
    const [validationError, setValidationError] = useState<string>("");

    const handleStart = () => {
        setRunning(true);
    }

    const handleStop = () => {
        setRunning(false);
    }

    const handleInputChange = (e: any) => {
        const inputValue = e.target.value;
        if (!parseInt(inputValue)) {
            setValidationError('The value must be a number');
            return;
        }
        setValidationError('');
        setNumUsers(inputValue);

    }

    return (
        <div>
            <Input onChange={handleInputChange} value={numUsers}></Input>
            {validationError && <p>{validationError}</p>}
            <Slideshow numUsers={numUsers} running={running}></Slideshow>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleStop}>Stop</button>
            {running ? <span>Running</span> : <span>Paused</span>}
        </div>
    )
}