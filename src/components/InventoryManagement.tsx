import React, { useState } from 'react';

interface Diamond {
  id: number;
  name: string;
  carat: number;
  color: string;
  clarity: string;
  price: number;
}

const InventoryManagement: React.FC = () => {
  const [diamonds, setDiamonds] = useState<Diamond[]>([]);
  const [newDiamond, setNewDiamond] = useState<Diamond>({
    id: 0,
    name: '',
    carat: 0,
    color: '',
    clarity: '',
    price: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDiamond({ ...newDiamond, [name]: value });
  };

  const addDiamond = () => {
    setDiamonds([...diamonds, { ...newDiamond, id: diamonds.length + 1 }]);
    setNewDiamond({
      id: 0,
      name: '',
      carat: 0,
      color: '',
      clarity: '',
      price: 0,
    });
  };

  const editDiamond = (id: number) => {
    const diamondToEdit = diamonds.find((diamond) => diamond.id === id);
    if (diamondToEdit) {
      setNewDiamond(diamondToEdit);
    }
  };

  const updateDiamond = () => {
    setDiamonds(
      diamonds.map((diamond) =>
        diamond.id === newDiamond.id ? newDiamond : diamond
      )
    );
    setNewDiamond({
      id: 0,
      name: '',
      carat: 0,
      color: '',
      clarity: '',
      price: 0,
    });
  };

  const deleteDiamond = (id: number) => {
    setDiamonds(diamonds.filter((diamond) => diamond.id !== id));
  };

  return (
    <div>
      <h2>Inventory Management</h2>
      <div>
        <input
          type="text"
          name="name"
          value={newDiamond.name}
          onChange={handleInputChange}
          placeholder="Name"
        />
        <input
          type="number"
          name="carat"
          value={newDiamond.carat}
          onChange={handleInputChange}
          placeholder="Carat"
        />
        <input
          type="text"
          name="color"
          value={newDiamond.color}
          onChange={handleInputChange}
          placeholder="Color"
        />
        <input
          type="text"
          name="clarity"
          value={newDiamond.clarity}
          onChange={handleInputChange}
          placeholder="Clarity"
        />
        <input
          type="number"
          name="price"
          value={newDiamond.price}
          onChange={handleInputChange}
          placeholder="Price"
        />
        <button onClick={newDiamond.id ? updateDiamond : addDiamond}>
          {newDiamond.id ? 'Update Diamond' : 'Add Diamond'}
        </button>
      </div>
      <ul>
        {diamonds.map((diamond) => (
          <li key={diamond.id}>
            {diamond.name} - {diamond.carat} carat - {diamond.color} -{' '}
            {diamond.clarity} - ${diamond.price}
            <button onClick={() => editDiamond(diamond.id)}>Edit</button>
            <button onClick={() => deleteDiamond(diamond.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryManagement;
