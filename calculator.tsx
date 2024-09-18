"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"

type CalculatorProps = {
  // You can add props here if needed
}

export default function Calculator(props: CalculatorProps = {}) {
  const [display, setDisplay] = useState('0')
  const [firstOperand, setFirstOperand] = useState<number | null>(null)
  const [operator, setOperator] = useState<string | null>(null)
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false)

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit)
      setWaitingForSecondOperand(false)
    } else {
      setDisplay(display === '0' ? digit : display + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.')
      setWaitingForSecondOperand(false)
      return
    }

    if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  const clear = () => {
    setDisplay('0')
    setFirstOperand(null)
    setOperator(null)
    setWaitingForSecondOperand(false)
  }

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display)

    if (firstOperand === null) {
      setFirstOperand(inputValue)
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator)
      setDisplay(String(result))
      setFirstOperand(result)
    }

    setWaitingForSecondOperand(true)
    setOperator(nextOperator)
  }

  const calculate = (firstOperand: number, secondOperand: number, operator: string): number => {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand
      case '-':
        return firstOperand - secondOperand
      case '*':
        return firstOperand * secondOperand
      case '/':
        return firstOperand / secondOperand
      default:
        return secondOperand
    }
  }

  return (
    <div className="max-w-xs mx-auto mt-10 p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="bg-white p-4 rounded mb-4 text-right text-2xl font-bold">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-2">
        <Button onClick={() => clear()} className="col-span-3">Clear</Button>
        <Button onClick={() => performOperation('/')}>/</Button>
        {[7, 8, 9].map((num) => (
          <Button key={num} onClick={() => inputDigit(num.toString())}>{num}</Button>
        ))}
        <Button onClick={() => performOperation('*')}>*</Button>
        {[4, 5, 6].map((num) => (
          <Button key={num} onClick={() => inputDigit(num.toString())}>{num}</Button>
        ))}
        <Button onClick={() => performOperation('-')}>-</Button>
        {[1, 2, 3].map((num) => (
          <Button key={num} onClick={() => inputDigit(num.toString())}>{num}</Button>
        ))}
        <Button onClick={() => performOperation('+')}>+</Button>
        <Button onClick={() => inputDigit('0')} className="col-span-2">0</Button>
        <Button onClick={() => inputDecimal()}>.</Button>
        <Button onClick={() => performOperation('=')}>=</Button>
      </div>
    </div>
  )
}
