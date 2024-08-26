import React from 'react';

const DisplayPost = ({ postContent }) => {
  // Convert newline characters to <br> tags
  const formattedContent = postContent.split('\n').map((item, index) => (
    <React.Fragment key={index}>
      {item}
      <br />
    </React.Fragment>
  ));

  return (
    <div>
      {formattedContent}
    </div>
  );
};

export default DisplayPost;
