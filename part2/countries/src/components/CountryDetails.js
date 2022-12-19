const Details = ({ country }) => (
  <div>
    <h1>{country.name.common}</h1>
    <p>capital {country.capital}</p>
    <p>population {country.population}</p>
    <h3>languages</h3>
    <ul>
        {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
        ))}
    </ul>
    <img src={country.flags.png} alt={`${country.name.common} flag`} />
  </div>
)

const CountryDetails = ({ countries }) => (
    <>
    {countries.map((country) => (
        <Details country={country} key={country.name.common} />
    ))}
    </>
)

export default CountryDetails