import './App.css';
import { Grid } from "@material-ui/core";
import ButtonAppBar from './components/ButtonAppBar';
import FormComponent from './components/FormComponent';


const App = () => {
  return (
    <Grid container direction = "column">
      <Grid item>
        <ButtonAppBar />
      </Grid>
      <FormComponent /> 
    </Grid>
  );
};


export default App;
