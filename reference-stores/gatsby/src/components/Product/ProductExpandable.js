import React, { useState } from 'react';
import minusIcon from 'assets/svgs/minus';
import plusIcon from 'assets/svgs/plus';

const ProductExpandable = ({ features }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    features?.length && (
      <div>
        <h3>
          <button
            type="button"
            className="group relative w-full py-6 flex justify-between items-center text-left"
            aria-controls="disclosure-1"
            aria-expanded={isExpanded}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span
              className={`${
                isExpanded ? 'text-indigo-600' : 'text-gray-900'
              } text-sm font-medium`}
            >
              Features
            </span>
            <span
              className={`ml-6 h-6 w-6 flex items-center${
                isExpanded
                  ? ' text-indigo-400 group-hover:text-indigo-50'
                  : ' text-gray-400 group-hover:text-gray-500'
              }`}
              dangerouslySetInnerHTML={{
                __html: isExpanded ? minusIcon : plusIcon
              }}
            />
          </button>
        </h3>
        {isExpanded && (
          <div id="disclosure-1" className="pb-6 prose prose-sm">
            <ul role="list">
              {features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  );
};

export default ProductExpandable;
