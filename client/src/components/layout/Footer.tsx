import React from 'react';

const Footer: React.FC = () => {
  return (
    <div className="bg-gray-100 py-4 px-10">
      <div className="text-left space-y-3 text-xs">
        <p className="text-gray-800">
          Originally developed by{' '}
          <span className="font-semibold">Sujay</span> for E-Cell, KIIT Bhubaneswar
        </p>
        <p className="text-gray-800 pt-6">
          Managed by{' '}
          <span className="font-semibold">
            Sujay and Ayush
          </span>{' '}
          for E-Cell, KIIT Bhubaneswar
        </p>
      </div>
    </div>
  );
};

export default Footer;
