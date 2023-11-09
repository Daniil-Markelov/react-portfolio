import React from 'react';

const ComingSoon = ({ pageName }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>{`${pageName} is Coming Soon`}</h1>
      <span role="img" aria-label="coming-soon-emoji">
        🚀
      </span>
    </div>
  );
};

export default ComingSoon;