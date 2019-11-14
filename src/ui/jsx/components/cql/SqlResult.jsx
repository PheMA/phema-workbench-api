import React from "react";

import Highlight, { defaultProps } from "prism-react-renderer";

const LineNo = props => {
  const style = {
    display: "inline-block",
    width: "2em",
    userSelect: "none",
    opacity: "0.3",
    marginLeft: "5px"
  };

  return <span style={style}>{props.children}</span>;
};

const SqlResult = props => {
  return (
    <div className="sqlResults">
      <Highlight
        {...defaultProps}
        code={props.sql}
        language="sql"
        theme={undefined}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                <LineNo>{i + 1}</LineNo>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default SqlResult;
