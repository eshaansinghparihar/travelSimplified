import React,{Component} from 'react';
import { Paper, Tab ,Tabs} from '@material-ui/core';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import FlightIcon from '@material-ui/icons/Flight';
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
const styles = (theme) => ({
  root: {
    width: '100%',
    height:'13vh',
    '& > svg': {
      margin: theme.spacing(0),
    },
    marginTop:'4vh',
    marginBottom:'4vh',
    marginLeft:'auto',
    marginRight:'auto',
  },
})

class Navigation extends Component{
  
  constructor(props){
    super(props);
    this.state={
      value: window.location.pathname
    }
  }
  render(){
    const { classes } = this.props;
    return (
        <Tabs variant="fullWidth" value={this.state.value} onChange={(event, newValue) => {this.setState({value:newValue});}} className={classes.root}>
        < Tab component={Link} label="Based On Distance & Time" value="/" to='/' icon={<DriveEtaIcon fontSize="medium"/>}/>
        <Tab component={Link} label="Based On Cost" value="/minimumcost" to='/minimumcost' icon={<FlightIcon fontSize="medium"/>}/>
        </Tabs>
    );
  }

}
export default withStyles(styles, { withTheme: true })(Navigation);