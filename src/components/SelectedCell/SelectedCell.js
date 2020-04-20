import React, { useState } from 'react';
import './SelectedCell.scss';

const SelectedCell = () => {
  const [isEdit, setIsEdit] = useState(false);

  const handleDoubleClick = (e) => {
    setIsEdit(true);
  };

  const value = isEdit ? <input autoFocus></input> : '';

  return (
    <td className='SelectedCell' onDoubleClick={handleDoubleClick}>
      {value}
    </td>
  );
};

export default SelectedCell;
