import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => 
<button onClick={props.handleClick}>{props.text}</button>

const Statistics = (props) => {
    return (
        <div>
        <p>{props.text} {props.value}</p>
        </div>
    )
}

const App = () => {
    const [rate, setRate] = useState({
        good: 0, neutral: 0, bad:0
    })
    const [statistics, setStatistics] = useState({
        total: 0, sum: 0, pos: 0
    })

    const [avg, setAvg] = useState(0.0)
    if (statistics.total === 0) {
        return (
        <div>
            <h2>anna palautetta</h2>
            <Button handleClick={() => {
               setRate({ ...rate, good: rate.good +1})
               const newStat = {
                   total: statistics.total +1,
                   sum: statistics.sum +1,
                   pos: (rate.good +1) / (statistics.total +1) * 100
               }
               setStatistics(newStat)
               const newAvg = (statistics.sum +1) / (statistics.total +1)
               setAvg(newAvg)
            }
                } text='hyvä' />
            <Button handleClick={() => {
                setRate({ ...rate, neutral: rate.neutral +1})
                const newStat = {
                    total: statistics.total +1,
                    sum: statistics.sum + 0,
                    pos: rate.good / (statistics.total +1) * 100
                }
                setStatistics(newStat)
                const newAvg = statistics.sum / (statistics.total +1)
               setAvg(newAvg)
            }
            } text='neutraali' />
            <Button handleClick={() => {
                setRate({ ...rate, bad: rate.bad +1})
                const newStat = {
                    total: statistics.total +1,
                    sum: statistics.sum - 1,
                    pos: rate.good / (statistics.total +1) * 100
                }
                setStatistics(newStat)
                const newAvg = (statistics.sum - 1) / (statistics.total +1)
               setAvg(newAvg)
            }
            } text='huono' />
            <h2>statistiikka</h2>
            <p>Ei yhtään palautetta annettu</p>
            </div>
        )
    } else {
        return (
            <div>
                <h2>anna palautetta</h2>
                <Button handleClick={() => {
                   setRate({ ...rate, good: rate.good +1})
                   const newStat = {
                       total: statistics.total +1,
                       sum: statistics.sum +1,
                       pos: (rate.good +1) / (statistics.total +1) * 100
                   }
                   setStatistics(newStat)
                   const newAvg = (statistics.sum +1) / (statistics.total +1)
                   setAvg(newAvg)
                }
                    } text='hyvä' />
                <Button handleClick={() => {
                    setRate({ ...rate, neutral: rate.neutral +1})
                    const newStat = {
                        total: statistics.total +1,
                        sum: statistics.sum + 0,
                        pos: rate.good / (statistics.total +1) * 100
                    }
                    setStatistics(newStat)
                    const newAvg = statistics.sum / (statistics.total +1)
                   setAvg(newAvg)
                }
                } text='neutraali' />
                <Button handleClick={() => {
                    setRate({ ...rate, bad: rate.bad +1})
                    const newStat = {
                        total: statistics.total +1,
                        sum: statistics.sum - 1,
                        pos: rate.good / (statistics.total +1) * 100
                    }
                    setStatistics(newStat)
                    const newAvg = (statistics.sum - 1) / (statistics.total +1)
                   setAvg(newAvg)
                }
                } text='huono' />

                <Statistics text= 'hyvä' value = {rate.good} />
                <Statistics text= 'neutraali' value = {rate.neutral} />
                <Statistics text= 'huono' value = {rate.bad} />
                <Statistics text= 'yhteensä' value = {statistics.total} />
                <Statistics text= 'keskiarvo' value = {avg} />
                <Statistics text= 'positiivisia' value = {statistics.pos} />
                
                
            </div>
        )
    }
    
}

ReactDOM.render(<App />, document.getElementById('root'));


