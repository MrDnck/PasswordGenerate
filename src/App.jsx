import { useEffect, useState } from "react"
import "./App.scss"
import { SvgMinus, SvgPaste, SvgPlus } from "./Icons"

let allLetters = "abcdefghijklmnopqrstuvwxyz",
    allNumbers = "0123456789",
    allSymbols = "~!@#$%^&*()_+-,.,"

let random = (length, lowercase, uppercase, numbers, symbols) => {
    let ch = []
    lowercase && ch.push(allLetters)
    uppercase && ch.push(allLetters.toUpperCase())
    numbers && ch.push(allNumbers)
    symbols && ch.push(allSymbols)
    if (ch.length === 0) return "1234"
    return Array(length).fill("").map(() => {
        let currentCh = ch[Math.floor(ch.length * Math.random())]
        return currentCh[Math.floor(currentCh.length * Math.random())]
    }).join("")
}

export default function App() {
    let [password, setPassword] = useState(""),
        [copied, setCopied] = useState(false),
        [length, setLength] = useState(20),
        [lowercase, setLowercase] = useState(true),
        [uppercase, setUppercase] = useState(true),
        [numbers, setNumbers] = useState(true),
        [symbols, setSymbols] = useState(true)

    const generatePassword = () => {
        setPassword(random(length, lowercase, uppercase, numbers, symbols))
        copied && setCopied(false)
    }

    const decreaseLength = event => {
        event.preventDefault()
        length > 3 && setLength(lastLength => lastLength - 1)
    }

    const increaseLength = event => {
        event.preventDefault()
        length < 100 && setLength(lastLength => lastLength + 1)
    }

    const handleSubmit = event => {
        event.preventDefault()
        generatePassword()
    }

    const handleCopy = () => !copied && navigator.clipboard.writeText(password).then(() => setCopied(true))

    useEffect(() => {
        generatePassword()
    }, [length, lowercase, uppercase, numbers, symbols])

    let configCheckboxes = [
        ["lowercase", "Lowercase letters", lowercase, setLowercase],
        ["uppercase", "Uppercase letters", uppercase, setUppercase],
        ["numbers", "Numbers", numbers, setNumbers],
        ["symbols", "Symbols", symbols, setSymbols]
    ]

    return (
        <main className="main-container">
            <div className="app-container">
                <h1>Password Generator</h1>
                <div className="password-container">
                    <input type="text" className="password" value={password} readOnly />
                    <button className={copied ? "copied" : ""} onClick={handleCopy}><SvgPaste /></button>
                </div>
                <form action="#" className="config-container" onSubmit={handleSubmit}>
                    <div className="length-container">
                        <button className="decrease" onClick={decreaseLength} disabled={length === 3}><SvgMinus /></button>
                        <div className="length">{length}</div>
                        <button className="increase" onClick={increaseLength} disabled={length === 100}><SvgPlus /></button>
                    </div>
                    {configCheckboxes.map((checkbox, index) =>
                        <div className="input-container" key={"checkbox-" + index}>
                            <label htmlFor={checkbox[0]}>{checkbox[1]}</label>
                            <input
                                type="checkbox"
                                name={checkbox[1]}
                                id={checkbox[1]}
                                checked={checkbox[2]}
                                onChange={event => checkbox[3](event.target.checked)}
                            />
                        </div>
                    )}
                    <input type="submit" value="Generate" />
                </form>
                <a href="https://kevydev.github.io/portfolio/" target="_blank">
                    <h6>© Made and designed by KevyDev.</h6>
                </a>
            </div>
        </main>
    )
}