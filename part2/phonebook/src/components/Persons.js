
const Person = ({ person }) => (
    <p>{person.name} {person.number}</p>
)

const Persons = ({persons}) => (
    <>
    {persons.map((person) => (
        <Person person={person} key={person.name} />
    ))}
    </>
)

export default Persons
