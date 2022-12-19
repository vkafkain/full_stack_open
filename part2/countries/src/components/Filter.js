const Filter = ({filterName, setFilterName}) => {
    const handleFilterChange = event => setFilterName(event.target.value)

    return (
        <div>
            find countries
            <input value={filterName} onChange={handleFilterChange} />
        </div>
    )
}

export default Filter