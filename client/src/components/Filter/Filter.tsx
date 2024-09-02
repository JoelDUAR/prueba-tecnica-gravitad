import React, { useState } from 'react';

interface FiltersProps {
  onFilter: (filter: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilter }) => {
  const [selectedFilter, setSelectedFilter] = useState('');

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filter = e.target.value;
    setSelectedFilter(filter);
    onFilter(filter);
  };

  return (
    <div>
      <select value={selectedFilter} onChange={handleFilterChange}>
        <option value="">Filtrar por</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="gender">Gender</option>
      </select>
    </div>
  );
};

export default Filters;
