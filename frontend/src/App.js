import './App.css';
import { Grid } from "@material-ui/core";
import ButtonAppBar from './components/ButtonAppBar';
import FormComponent from './components/FormComponent';
import FooterC from './components/FooterC';


const App = () => {
  return (
    <Grid container direction = "column">
      <Grid item >
        <ButtonAppBar />
      </Grid>
      <FormComponent /> 
      <FooterC />
    </Grid>
  );
};


export default App;
