import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from '../api/axios';
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik';

const useStyles = makeStyles((theme) => ({
    btnstyle: {
        margin: '8px 0'
    },
}));


export default function FormDialog(props) {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    // console.log(props);

    const initialValues = {
        caption: props.meme.caption,
        url: props.meme.url
    }

    const testImage = (url, timeout) =>
        new Promise(res => {
        timeout = timeout || 5000;
        let timedOut = false;
        let timer;
        const img = new Image();

        img.onerror = img.onabort = function() {
        if (!timedOut) {
            clearTimeout(timer);
            res('error');
        }
        };

        img.onload = function() {
        if (!timedOut) {
            clearTimeout(timer);
            res('success');
        }
        };

        img.src = url;

        timer = setTimeout(function() {
        timedOut = true;
        // reset .src to invalid URL so it stops previous
        // loading, but doesn't trigger new load
        img.src = '//!!!!/test.jpg';
        res('timeout');
        }, timeout);
    });

    const validationSchema = Yup.object().shape({
        caption: Yup.string().required("Required"),
        url: Yup.string().required('Please enter the URL')
            .test('valid-image-url', 'Must use valid image URL', value =>
            testImage(value, 1000).then(status => status === 'success')
        )
    })

    const onSubmit = async (values, formProps) => {
        try {
            const response = await axios.patch(`/memes/${props.meme.id}`, values)
                .then(() => props.meme.func());
            handleClose();
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Meme</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can edit the caption and url of the meme from here!
          </DialogContentText>
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {(formProp) => ( 
                <Form>
                    <Field as={TextField}
                        id="outlined-multiline-static"
                        label="Caption"
                        multiline
                        style={{ margin: "8 auto" }}
                        rows={4}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        name="caption"
                        helperText={<ErrorMessage name="caption" />}
                        error = {formProp.errors.caption && formProp.touched.caption ? true : false}
                        required
                    />
                    <Field as={TextField}
                        id="outlined-full-width"
                        label="URL"
                        style={{ margin: "15px auto" }}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        name="url"
                        helperText={<ErrorMessage name="url" />}
                        required
                        error = {formProp.errors.url && formProp.touched.url ? true : false}
                    />
                    <Button 
                        type='submit' 
                        color='primary' 
                        variant="contained" 
                        disabled={formProp.isSubmitting}
                        className = {classes.btnstyle}
                        fullWidth
                    >
                        {formProp.isSubmitting ? "Loading" : "Edit"}
                    </Button>
                </Form>
            )}
        </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}
