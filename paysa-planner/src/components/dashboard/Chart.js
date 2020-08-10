import { useTheme } from '@material-ui/core/styles';
import React from 'react';
import Title from './Title';


const data = [];

export default function Chart() {
  const theme = useTheme();
  return (
    <React.Fragment>
      <Title>Curent Month</Title>
    </React.Fragment>
  );
}