const DeleteButton = ({deletePerson}) => {
  return (
    <>
      <button onClick={deletePerson}> Delete </button>
    </>
  )
}

const Person = ({ name, number, deletePerson}) => {
  return (
    <div>
      <p> {name} {number} <DeleteButton deletePerson={deletePerson} name={name} />
      </p>
    </div>
  )
}

const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person 
          key={person.id}
          name={person.name}
          number={person.number}
          deletePerson={() =>
          deletePerson(person.id, person.name)} />
      ))}
    </div>
  )
}

export default Persons;
