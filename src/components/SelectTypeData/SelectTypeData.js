import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currencies } from '../../config/currencies';
import { setTypeCell, setCurrencyCell } from '../../store/actions';

import './SelectTypeData.scss';

const SelectTypeData = () => {
  const dispatch = useDispatch();
  const { selectedCell, tableData } = useSelector((store) => store);

  const { type } = tableData[selectedCell] || 'string';
  const { currency } = tableData[selectedCell] || '';
  const isCurrency =
    tableData[selectedCell] && tableData[selectedCell].type === 'currency';

  useEffect(() => {
    if (isCurrency && !currency) {
      dispatch(setCurrencyCell(currencies[0]));
    }
  }, [isCurrency]);

  const handleChange = (e) => {
    e.stopPropagation();
    const { value } = e.target;

    if (currencies.includes(value)) {
      dispatch(setCurrencyCell(value));
    } else {
      dispatch(setTypeCell(value));
    }
  };

  const renderCurrencies = (
    <select value={currency} name='type-data' onChange={handleChange}>
      {currencies.map((cur, i) => (
        <option key={`${cur}-${i}`} value={cur}>
          {cur}
        </option>
      ))}
    </select>
  );

  return (
    <div className='TypeData'>
      <select value={type} name='type-data' onChange={handleChange}>
        <option value='string'>String</option>
        <option value='number'>Number</option>
        <option value='currency'>Currency</option>
      </select>
      {isCurrency && renderCurrencies}
    </div>
  );
};

export default SelectTypeData;
