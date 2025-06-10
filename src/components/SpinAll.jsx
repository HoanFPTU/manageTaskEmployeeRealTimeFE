import React from 'react';

import { Spin } from 'antd';
import { sSpin } from '../store/spinAll';



export default function SpinAll() {
  const isSpin = sSpin.use();
  return <>{isSpin ? <Spin style={{ width: '100%' }} fullscreen /> : <></>}</>;
}
