import React, { useState } from "react";

const Button = ({ handleClick, text }) => (
  <>
    <button onClick={handleClick}>{text}</button>
  </>
);

const Anecdote = ({ numberOfVotes, anecdote }) => (
  <>
    <div>{anecdote}</div>
    <div>Has {numberOfVotes} votes</div>
  </>
);

const Anecdotes = ({ anecdote, numberOfVotes, voteAnecdota, nextAnecdote }) => (
  <>
    <h1>Anecdote of the day</h1>
    <Anecdote anecdote={anecdote} numberOfVotes={numberOfVotes} />
    <Button handleClick={nextAnecdote} text="next anecdote" />
    <Button handleClick={voteAnecdota} text="vote" />
  </>
);

const MostVoted = ({ anecdote, numberOfVotes }) => (
  <>
    <h1>Anecdote with most votes</h1>
    <Anecdote anecdote={anecdote} numberOfVotes={numberOfVotes} />
  </>
);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];
  const random = () => Math.floor(Math.random() * anecdotes.length);
  const [selected, setSelected] = useState(random());
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const nextAnecdote = () => setSelected(random());
  const voteAnecdota = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };
  
  const indexMostVotedAnecdote = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <Anecdotes
        anecdote={anecdotes[selected]}
        numberOfVotes={votes[selected]}
        nextAnecdote={nextAnecdote}
        voteAnecdota={voteAnecdota}
      />
      <MostVoted
        anecdote={anecdotes[indexMostVotedAnecdote]}
        numberOfVotes={votes[indexMostVotedAnecdote]}
      />
    </div>
  );
};

export default App;
