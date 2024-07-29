import React, { useCallback, useRef } from "react";
import Slideshow from "../Slideshow/Slideshow";
import { useState } from "react";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { StyleSlideshowWrapper } from "./styles";

export const SlideshowWrapper: React.FC = () => {

    const inputRef = useRef<HTMLInputElement>(null);
    const [numUsers, setNumUsers] = useState<number>(5);
    const [running, setRunning] = useState<boolean>(true);
    const [validationError, setValidationError] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleStart = () => {
        setRunning(true);
    }

    const handleStop = () => {
        setRunning(false);
    }

    const isInteger = useCallback((str: string) => {
        const num = Number(str);
        return Number.isInteger(num) && str.trim() === num.toString();
    }, [])

    const handleInputChange = (e: any) => {

        if (inputRef.current) {
            const inputValue = inputRef.current.value;
            if (isInteger(inputValue)) {
                let numberValue = Number(inputValue);
                if (numberValue < 1) {
                    setValidationError("The value must be higher than 0");
                    return;
                }
                if (numberValue > 50) {
                    setValidationError("The value must smaller or equal to 50");
                    return;
                }
                setNumUsers(parseInt(inputValue));
                setSearchTerm("");
            } else {
                setSearchTerm(inputValue);
            }
            setValidationError("");
        }

    }

    return (
        <StyleSlideshowWrapper>
            <Input ref={inputRef} defaultValue={numUsers.toString()} onChange={handleInputChange} placeholder={numUsers.toString()}></Input>
            {validationError && <p>{validationError}</p>}
            {running ? <span>Running</span> : <span>Paused</span>}
            <Slideshow numUsers={numUsers} running={running} searchTerm={searchTerm}></Slideshow>
            <Button onClick={handleStart} ariaLabel="Start" variant="primary">Start</Button>
            <Button onClick={handleStop} ariaLabel="Stop" variant="secondary">Stop</Button>
        </StyleSlideshowWrapper>
    )
}