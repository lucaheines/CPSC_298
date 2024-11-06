"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

const Button = ({ children, onClick, color = "bg-blue-500" }) => (
  <motion.button
    className={`${color} text-white font-bold rounded-full p-4 text-2xl shadow-lg backdrop-blur-sm bg-opacity-30`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    {children}
  </motion.button>
)

const useCalculator = () => {
  const [display, setDisplay] = useState("0")
  const [prevValue, setPrevValue] = useState(null)
  const [operator, setOperator] = useState(null)

  const clear = useCallback(() => {
    setDisplay("0")
    setPrevValue(null)
    setOperator(null)
  }, [])

  const appendNumber = useCallback((num) => {
    setDisplay((prev) => (prev === "0" ? num : prev + num))
  }, [])

  const setOperation = useCallback((op) => {
    setPrevValue(parseFloat(display))
    setDisplay("0")
    setOperator(op)
  }, [display])

  const calculate = useCallback(() => {
    if (prevValue === null || operator === null) return

    const current = parseFloat(display)
    let result

    switch (operator) {
      case "+":
        result = prevValue + current
        break
      case "-":
        result = prevValue - current
        break
      case "*":
        result = prevValue * current
        break
      case "/":
        result = prevValue / current
        break
      default:
        return
    }

    setDisplay(result.toString())
    setPrevValue(null)
    setOperator(null)
  }, [display, prevValue, operator])

  return { display, clear, appendNumber, setOperation, calculate }
}

export function FuturisticCalculator() {
  const { display, clear, appendNumber, setOperation, calculate } = useCalculator()

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-gray-700"
      >
        <div className="p-8">
          <motion.div
            layout
            className="bg-gray-700 rounded-2xl p-6 mb-6 text-right text-5xl font-light text-white overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={display}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {display}
              </motion.div>
            </AnimatePresence>
          </motion.div>
          <div className="grid grid-cols-4 gap-4">
            <Button onClick={clear} color="bg-red-500">C</Button>
            <Button onClick={() => setOperation("/")} color="bg-green-500">/</Button>
            <Button onClick={() => setOperation("*")} color="bg-green-500">*</Button>
            <Button onClick={() => setOperation("-")} color="bg-green-500">-</Button>
            {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((num) => (
              <Button key={num} onClick={() => appendNumber(num.toString())}>
                {num}
              </Button>
            ))}
            <Button onClick={() => setOperation("+")} color="bg-green-500">+</Button>
            <Button onClick={() => appendNumber("0")}>0</Button>
            <Button onClick={() => appendNumber(".")}>.</Button>
            <Button onClick={calculate} color="bg-purple-500">=</Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}