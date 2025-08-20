import { useEffect, useState, useRef } from 'react'

const formatTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  const timer = [
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0'),
  ].join(' : ')

  return [hours === 0 ? '' : `${hours.toString().padStart(2, '0')} : `, ...timer]
}

export default function useTimer({ seconds, onFinish, triggers = [] }) {
  const [timeLeft, setTimeLeft] = useState(seconds)
  const triggeredRef = useRef({})

  useEffect(() => {
    if (timeLeft <= 0) {
      onFinish && onFinish()
      return
    }

    // Check triggers
    triggers.forEach(({ at, fn }) => {
      if (timeLeft === at && !triggeredRef.current[at]) {
        fn && fn()
        // triggeredRef.current[at] = true // si quiero preguntar solo una vez descomento esto
      }
    })

    const timerId = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)
    return () => clearTimeout(timerId)
  }, [timeLeft, onFinish, triggers])

  const timerReset = (time) => {
    setTimeLeft(time)
  }

  return {
    timerReset,
    timeLeft,
    formatTime: formatTime(timeLeft),
    timerRender:
    <div>
      {
        timeLeft > 0 &&
        <span className='text-3xl font-bold'>{formatTime(timeLeft)}</span>
      }
    </div>
  }
}
