import React, { useState } from 'react';

type ReadMoreProps = {
  more?: string;
  less?: string;
  character?: number;
};

const ReadMore = ({ children, more, less, character }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleLines = (event) => {
    event.preventDefault();
    setExpanded(!expanded);
  };

  if (!children) return null;

  return (
    <div style={{ fontWeight: '400', fontSize: '13px', }}>
      {(children && children.length < character) || expanded
        ? children
        : children.substring(0, character)}
      {children && children.length > character && !expanded && (
        <>
          <br />
          <span>
            <a
              href="#"
              onClick={toggleLines}
              style={{ color: '#009e7f', fontWeight: '400', fontSize: '13px', }}
            >
              {more}
            </a>
          </span>
        </>
      )}
      {children && children.length > character && expanded && (
        <>
          <br />
          <span>
            <a
              href="#"
              onClick={toggleLines}
              style={{ color: '#009e7f', fontWeight: '400', fontSize: '13px', }}
            >
              {less}
            </a>
          </span>
        </>
      )}
    </div>
  );
};

ReadMore.defaultProps = {
  character: 150,
  more: 'Read more',
  less: 'less',
};

export default ReadMore;
