import React from 'react';
import Dashboard from '../dashboard/Dashboard'
import InternWork from './InternWork'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            login: false
            // almost all the data of this app can be contained within this parent components state
         };
      }
    componentDidMount() {
        this.checkLoggedIn()
    }
    checkLoggedIn() {
        axios.get('/index', {})
        .then((response) => {
        if (!response.data.logged_in) {
            this.handleRedirect()
        } else {
            this.handleLogin()
        }}, (error) => { 
            this.handleError()
        });
    }

    // Handlers
    handleRedirect() {
        this.props.history.push("/login");
    }
    handleLogin() {
        this.setState({login: true})
    }
    handleError() {
        console.log("Paysa Servers Down. Try again later");
    }

    //styles
    classes = makeStyles({
        root: {
            width: '100%',
            height: '100%',
            backgroundColor: "#404040"
        },
    });

    render() { 
      return (
        this.state.login ?  
            (<div className={this.classes.root}>
                <Dashboard history={this.props.history}/>
            </div>) 
        : 
            (<InternWork />)
    )
    }
  }

  export default Index;