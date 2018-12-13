import React from "react";
import { Layout } from "antd"

import Header from "../../components/header/Header"
import Main from "../../components/main/Main";
import Footer from "../../components/footer/Footer";

const { Content } = Layout;

const App = () => (
    <Layout className="app">
        <Header/>
        <Layout className="app__layout">
            <Content className="app__layout__content">
                <Main/>
            </Content>
        </Layout>
        <Footer/>
    </Layout>
);

export default App;