const Filter = ({filterName, setFilterName}) => {
    const handleFilterChange = (event) => setFilterName(event.target.value)

    return (
      <div>
        filter show with 
        <input value={filterName} onChange={handleFilterChange} />
      </div>
    )

}

export default Filter