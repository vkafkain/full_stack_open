
const Country = ({country}) => (
    <p>{country.name.common}</p>
)

const Countries = ({countries}) =>
    (
    <>
    {countries.map((country) => (
        <Country country={country} key={country.name.common} />
    ))}
    </>
)


export default Countries