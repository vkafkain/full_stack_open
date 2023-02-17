
const Person = ({ person, deletePerson }) =>{
    const bannerDelete = () => {
        if(window.confirm(`Delete ${person.name}?`)){
            deletePerson(person.id)
        }
    }
   return (
        <p>{person.name} {person.number} {<button onClick={bannerDelete}>delete</button>}</p>
    )
}



const Persons = ({persons, deletePerson}) => (
    <>
    {persons.map((person) => (
        <Person person={person} deletePerson={deletePerson} key={person.id} />
    ))}
    </>
)

export default Persons
