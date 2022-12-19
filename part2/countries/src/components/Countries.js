
const Country = ({country}) => (
    <p>{country.name.official}</p>
)

const Countries = ({countries}) => {
    
    
    return(
    <>
    {countries.map((country) => (
        <Country country={country} key={country.name.official} />
    ))}
    </>
)
}

export default Countries