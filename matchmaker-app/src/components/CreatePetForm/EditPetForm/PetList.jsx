import PetInfo from "./PetInfo";

function PetList({ petList = [], className }) {
  const petsRender = petList.map((pet) => (
    <li key={pet._id}>
      <PetInfo pet={pet} />
    </li>
  ));

  return (
    <div className={`flex flex-col items-start ${className}`}>
      <ul className="flex flex-wrap gap-20 justify-start">{petsRender}</ul>
    </div>
  );
}

export default PetList;
