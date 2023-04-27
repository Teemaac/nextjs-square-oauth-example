import React from 'react';

const SquareButton = () => {
  const handleSignIn = () => {
    window.location.href = '/api/square/oauth';
  };

  return (
    <button onClick={handleSignIn}>
      <span>Sign in with Square</span>
    </button>
  );
};

export default SquareButton;
