import React from "react";
import { Layout, Icon } from "antd";

const { Footer } = Layout;

const PheExFooter = () => (
    <div className="footer">
        <Footer>
            <div className="footer__text">PHEMA 2018 <a target="_blank" href="http://informatics.mayo.edu/phema/index.php/Main_Page"><Icon type="link" /></a></div>
        </Footer>
    </div>
);

export default PheExFooter;