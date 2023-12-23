import React from 'react';

const MyComponent = ({ h3Text, h1Text, regularText }) => {
  const bannerStyle = {
    background: 'radial-gradient(circle, #182F31, #0C1011)',
    color: '#fff', // Text color on the banner
    padding: '20px',
    height: '200px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    borderRadius: '15px',
  };

  return (
    <div style={bannerStyle}>
      <h3>{h3Text}</h3>
      <h1>{h1Text}</h1>
      <p>{regularText}</p>
    </div>
  );
};

export default MyComponent;