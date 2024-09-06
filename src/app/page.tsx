'use client'

import { useState } from 'react'
import styles from './page.module.css'

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [operation, setOperation] = useState('')
  const [prevValue, setPrevValue] = useState('')

  const handleNumberClick = (num: string) => {
    setDisplay(display === '0' ? num : display + num)
  }

  const handleOperationClick = (op: string) => {
    setOperation(op)
    setPrevValue(display)
    setDisplay('0')
  }

  const handleEqualsClick = () => {
    const current = parseFloat(display)
    const previous = parseFloat(prevValue)
    let result = 0

    switch (operation) {
      case '+':
        result = previous + current
        break
      case '-':
        result = previous - current
        break
      case '*':
        result = previous * current
        break
      case '/':
        result = previous / current
        break
    }

    setDisplay(result.toString())
    setOperation('')
    setPrevValue('')
  }

  const handleClearClick = () => {
    setDisplay('0')
    setOperation('')
    setPrevValue('')
  }

  return (
    <main className={styles.main}>
      <div className={styles.calculator}>
        <div className={styles.display}>{display}</div>
        <div className={styles.buttons}>
          {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((num) => (
            <button key={num} onClick={() => handleNumberClick(num.toString())}>
              {num}
            </button>
          ))}
          <button onClick={() => handleOperationClick('+')}>+</button>
          <button onClick={() => handleOperationClick('-')}>-</button>
          <button onClick={() => handleOperationClick('*')}>*</button>
          <button onClick={() => handleOperationClick('/')}>/</button>
          <button onClick={handleEqualsClick}>=</button>
          <button onClick={handleClearClick}>C</button>
        </div>
      </div>
    </main>
  )
}
