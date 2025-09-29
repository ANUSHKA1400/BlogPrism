import React from 'react';
import { Header, DynamicBackground } from './';

const Layout = ({ children }) => {
  return (
    <>
      <DynamicBackground />
      <Header />
      {children}
    </>
  )
}

export default Layout