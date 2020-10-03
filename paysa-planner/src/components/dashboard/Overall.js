// import { useTheme } from '@material-ui/core/styles';
import React from 'react';
import Title from './Title';
import Typography from '@material-ui/core/Typography';



const data = {
  earnings: "2000",
  expenditure: "1500",
  savings: "500"

};

export default function Overall() {
  //const theme = useTheme();
  return (
    <React.Fragment>
      <Title>Overall</Title>
      <Typography variant="subtitle1" gutterBottom>
        Earnings: ${data.earnings}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Expenditure: ${data.expenditure}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Savings: ${data.savings}
      </Typography>
    </React.Fragment>
  );
}