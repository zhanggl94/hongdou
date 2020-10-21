import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import Header from '../components/Header';
import intl from 'react-intl-universal';
import { connect } from 'react-redux';

const currLanguage = localStorage.getItem('lang-type') || 'zh';

const locales = {
  'zh': require('../locales/zh.json'),
  'en': require('../locales/en.json')
}
function App(props) {

  const [lanInitDone, setlanInitDone] = useState(false);

  //多语言初始化
  useEffect(() => {
    intl.init({
      currentLocale: currLanguage,
      locales
    }).then(() => {
      setlanInitDone(true);
    });
  }, []);

  /**
   * 改变语言
   * @param {*} lang 所选语言
   */
  const handlChangeLang = lang => {
    localStorage.setItem('lang-type', lang);
    window.location.reload();
  }

  return (
    lanInitDone &&
    <Spin spinning={props.loadingStatus}>
      <Header changeLang={handlChangeLang} />
      {props.children}
    </Spin>
  );
}

const mapStateToProps = ({ loadingStatus }) => {
  return {
    loadingStatus
  }
}

export default connect(mapStateToProps, null)(App);
