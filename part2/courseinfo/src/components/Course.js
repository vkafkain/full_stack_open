
const Header = ({ course }) => (
    <>
      <h1>{course}</h1>
    </>
  );
  
  const Content = ({ parts }) => (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </>
  );
  
  const Part = ({ part }) => (
    <>
      <p>
        {part.name} {part.exercises}
      </p>
    </>
  );
  
  const Total = ({ parts }) => {
    const total = parts.reduce((sum, li) => sum + li.exercises, 0);
    return (
      <>
        <h3>Number of exercises {total}</h3>
      </>
    );
  };
  
  const Course = ({ course }) => (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );

  export default Course