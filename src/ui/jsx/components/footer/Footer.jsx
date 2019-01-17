import React from "react";

const PhExFooter = () => (
  <div className="footer">
    <div className="footer__text">
      PHEMA {`${new Date().getFullYear()} `}
      <a
        target="_blank"
        href="http://informatics.mayo.edu/phema/index.php/Main_Page"
      />
    </div>
  </div>
);

export default PhExFooter;