import { useState, useEffect } from "react";
import Display from './Display';
import "../App.css"
let Keys = () => {
    const [name, setName] = useState("");

    useEffect(() => {
        const handleKeyPress = (event) => {
            const key = event.key;

            // Check if the pressed key is a number, operator, or special key
            if (/[0-9+\-*/.%]/.test(key)) {
                setName((preName) => preName + key);
            } else if (key === 'Enter') {
                // Evaluate expression on Enter key
                handleEvaluate();
            } else if (key === 'Backspace') {
                // Delete the last character on Backspace key
                handleDelete();
            }
        };

        // Add event listener for key presses
        document.addEventListener('keydown', handleKeyPress);

        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [name]);

    function handleClick(e) {
        setName((preName) => preName + e.target.value);
    }

    function handleAllClear() {
        setName("");
    }

    function handleDelete() {
        setName((preName) => preName.slice(0, -1));
    }

    function handleEvaluate() {
        try {
            setName(eval(name).toString());
        } catch (error) {
            // Handle invalid expressions
            setName("Error");
        }
    }

    return (
        <>
            <div className="Display"><Display name={name} /></div>
            <div className="Keypad">
                <div className="a">
                    <button className="AC-btn" onClick={handleAllClear}>AC</button>
                    <button onClick={handleDelete}>DEL</button>
                    <button onClick={handleEvaluate}> = </button>
                </div>

                <div className="b">
                    <button onClick={handleClick} value="7">7</button>
                    <button onClick={handleClick} value="8">8</button>
                    <button onClick={handleClick} value="9">9</button>
                    <button onClick={handleClick} value="/">/</button>
                </div>
                <div className="c">
                    <button onClick={handleClick} value="4">4</button>
                    <button onClick={handleClick} value="5">5</button>
                    <button onClick={handleClick} value="6">6</button>
                    <button onClick={handleClick} value="*">*</button>
                </div>
                <div className="d">
                    <button onClick={handleClick} value="1">1</button>
                    <button onClick={handleClick} value="2">2</button>
                    <button onClick={handleClick} value="3">3</button>
                    <button onClick={handleClick} value="-">-</button>
                </div>

                <div className="e">
                    <button onClick={handleClick} value="0">0</button>
                    <button onClick={handleClick} value=".">.</button>
                    <button onClick={handleClick} value="+">+</button>
                    <button onClick={handleClick} value="%">%</button>
                </div>
            </div>
        </>
    );
};

export default Keys;
