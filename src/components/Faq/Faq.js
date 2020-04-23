import React, { useState } from 'react';
import './Faq.scss';

const faqByFormulas = {
  '=SUM(…)':
    'находит сумму ряда чисел или содержимого ряда ячеек. Пример: =SUM(A1;A2;10;20). Доступные типы - number и currency.',
  '=AVERAGE(…)':
    'вычисляет среднее арифметическое аргументов (за исключением текстовых). Пример: =AVERAGE(A1;A2;10;20). Доступные типы - number и currency.',
  '=CONCAT(…)': 'объединяет несколько значений. Пример: =CONCAT(A1;A2;10;20).',
  '=HYPERLINK(…)':
    'cоздает гиперссылку в ячейке. Пример: =HYPERLINK(https://sute.ua).',
};

const Faq = () => {
  const [showFaq, setShowFaq] = useState(false);

  const handleClick = () => {
    setShowFaq(!showFaq);
  };
  console.log(Object.entries(faqByFormulas));
  const renderFaq = showFaq ? (
    <div>
      {Object.entries(faqByFormulas).map(([formula, desc]) => {
        return (
          <div>
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
