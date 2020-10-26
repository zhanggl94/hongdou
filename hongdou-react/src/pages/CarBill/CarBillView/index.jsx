import React, { useState } from 'react';
import intl from 'react-intl-universal';
import { Layout, Menu, Breadcrumb } from 'antd';
import './style.less';
import constants from '../../../utils/constants';

const { Content, Footer, Sider } = Layout;

const CarBillView = props => {

    const handleMenuItemClick = component => {
        props.handleMenuItemClick(component);
    }

    console.log(props.content)

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible >
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['car']} mode="inline">
                    <Menu.Item key="car" className='iconfont icon-car'
                        onClick={handleMenuItemClick.bind(this, constants.component_CarList)}>
                        {intl.get('CarView_lbl_Car')}
                    </Menu.Item>
                    <Menu.Item key="BillType" className='iconfont icon-tubiao'>
                        {intl.get('CarView_lbl_BillType')}
                    </Menu.Item>
                    <Menu.Item key="Bill" className='iconfont icon-zhangdan'>
                        {intl.get('CarView_lbl_Bill')}
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Content style={{ margin: '0 16px' }}>
                    {/* <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb> */}
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        {props.content}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    )
}

export default CarBillView;