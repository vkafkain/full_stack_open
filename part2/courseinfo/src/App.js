const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};

const Content = (props) => {
  return (
    <>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </>
  );
};

const Part = (props) => {
  return (
    <>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </>
  );
};

const Course = ({course}) => (

  <div>
    <h1>{course.name}</h1>
    <div>
      {course.parts.map(
        part => (
        <p key={part.id}>{part.name} {part.exercises}</p>
        )
      )}
    </div>
</div>
)


function Total(props) {
  let cont = 0;

  props.parts.map((n) => (cont += n.exercises));

  return (
    <>
      <p>Number of exercises {cont}</p>
    </>
  );
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3,
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4,
      },
    ],
  }

  return <Course course={course} />
}

export default App
