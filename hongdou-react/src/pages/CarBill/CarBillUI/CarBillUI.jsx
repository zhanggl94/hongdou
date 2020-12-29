import React from 'react';
import intl from 'react-intl-universal';
import { Layout, Menu, } from 'antd';
import './style.less';
import constants from '../../../utils/constants';

const { Content, Footer, Sider } = Layout;

const CarBillUI = props => {

    const handleMenuItemClick = component => {
        props.handleMenuItemClick(component);
    }

    return (
        <>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible >
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['car']} mode="inline">
                        <Menu.Item key="car" className='iconfont icon-car'
                            onClick={handleMenuItemClick.bind(this, constants.component_car)}>
                            {intl.get('CarUI_lbl_car')}
                        </Menu.Item>
                        <Menu.Item key="bill" className='iconfont icon-zhangdan'
                            onClick={handleMenuItemClick.bind(this, constants.component_bill)}>
                            {intl.get('CarUI_lbl_bill')}
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Content style={{ margin: '0 16px' }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            {props.content}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Hongdou</Footer>
                </Layout>
            </Layout>
        </>
    )
}

export default CarBillUI;