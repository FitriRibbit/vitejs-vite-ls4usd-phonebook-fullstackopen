const Filter = ({searchNumber, handleSearchChange}) => {
  return (
    <p>filter shown with <input searchNumber = {searchNumber} onChange = {handleSearchChange} /> 
    </p>
  );
};

export default Filter;