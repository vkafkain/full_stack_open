import React, { useState } from "react";

const Header = () => {
  return (
    <div>
      <h1>give feedback</h1>
    </div>
  );
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticsLine = ({ text, value, unit }) => (
  <tr>
    <td>{text}</td>
    <td>{value} {unit}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all || 0;
  const positive = (good / all) * 100 || 0;
  const isClicked = all > 0;

  if (!isClicked) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <table>
      <tbody>
      <StatisticsLine text="good" value={good} />
      <StatisticsLine text="neutral" value={neutral} />
      <StatisticsLine text="bad" value={bad} />
      <StatisticsLine text="average" value={average.toFixed(1)} />
      <StatisticsLine text="positive" value={positive.toFixed(1)} unit = "%" />
      </tbody>
    </table>
  );
};

const App = () => {
  const [clicks, setClicks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  return (
    <div>
      <Header />
      <Button
        handleClick={() => setClicks({ ...clicks, good: clicks.good + 1 })}
        text="good"
      />
      <Button
        handleClick={() =>
          setClicks({ ...clicks, neutral: clicks.neutral + 1 })
        }
        text="neutral"
      />
      <Button
        handleClick={() => setClicks({ ...clicks, bad: clicks.bad + 1 })}
        text="bad"
      />
      <h1>statistics</h1>
      <Statistics
        good={clicks.good}
        neutral={clicks.neutral}
        bad={clicks.bad}
      />
    </div>
  );
};

export default App;
