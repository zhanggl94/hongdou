import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import intl from 'react-intl-universal';

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
    localStorage.setItem('lang-type',lang);
    window.location.reload();
  }

  return (
    lanInitDone &&
    <div>
      <Header changeLang={handlChangeLang} />
      {props.children}
    </div>
  );
}

export default App;
