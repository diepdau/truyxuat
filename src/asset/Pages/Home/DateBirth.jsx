import React from 'react';

const AgeResult = ({ birthDate }) => {
  const calculateAge = (birthDate) => {
    const currentDate = new Date();
    const birthDateObj = new Date(birthDate);

    let months = (currentDate.getFullYear() - birthDateObj.getFullYear()) * 12;
    months -= birthDateObj.getMonth();
    months += currentDate.getMonth();

    return months <= 0 ? 0 : months; 
  };
  const months = calculateAge(birthDate);
  return <div>{months}</div>;
};

export default AgeResult;
