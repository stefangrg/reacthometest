import React, { useRef } from "react";
import Slideshow from "./Slideshow";
import { useState } from "react";
import { Input } from "./Input/Input";

export const SlideshowWrapper: React.FC = () => {

    const inputRef = useRef<HTMLInputElement>(null);
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

        if (inputRef.current) {
            const inputValidated = parseInt(inputRef.current.value);
            if (!inputValidated) {
                setValidationError('The value must be a number');
                return;
            }
            setValidationError('');
            setNumUsers(inputValidated);
        }

    }

    return (
        <div>
            <Input ref={inputRef} defaultValue={numUsers.toString()} placeholder={numUsers.toString()}></Input>
            <button onClick={handleInputChange}>Change</button>
            {validationError && <p>{validationError}</p>}
            <Slideshow numUsers={numUsers} running={running}></Slideshow>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleStop}>Stop</button>
            {running ? <span>Running</span> : <span>Paused</span>}
        </div>
    )
}