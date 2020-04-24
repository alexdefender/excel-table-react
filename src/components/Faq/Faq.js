import React, { useState } from 'react';
import './Faq.scss';

const faqByFormulas = {
  '=SUM(…)': `находит сумму ряда чисел или содержимого ряда ячеек. 
    Пример: =SUM(A1;A2;10;20). Доступные типы - number и currency.
    Число к валюте прибавлять нельзя. Только числа к числам и валюта к валюте.`,
  '=AVERAGE(…)': `вычисляет среднее арифметическое аргументов (за исключением текстовых). 
    Пример: =AVERAGE(A1;A2;10;20). Доступные типы - number и currency. Условия такие же, как в =SUM(…).`,
  '=CONCAT(…)': 'объединяет несколько значений. Пример: =CONCAT(A1;A2;10;20).',
  '=HYPERLINK(…)':
    'cоздает гиперссылку в ячейке. Пример: =HYPERLINK(https://site.ua).',
};

const Faq = () => {
  const [showFaq, setShowFaq] = useState(false);

  const handleClick = () => {
    setShowFaq(!showFaq);
  };
  const renderFaq = showFaq ? (
    <div>
      {Object.entries(faqByFormulas).map(([formula, desc]) => {
        return (
          <div key={formula}>
            <span>{formula}</span> - <span>{desc}</span>
          </div>
        );
      })}
    </div>
  ) : null;

  return (
    <div className='Faq'>
      <div onClick={handleClick}>Faq</div>
      {renderFaq}
    </div>
  );
};

export default Faq;
