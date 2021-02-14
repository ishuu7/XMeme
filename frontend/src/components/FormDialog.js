import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import axios from '../api/axios';
import * as Yup from 'yup'
import Alert from '@material-ui/lab/Alert';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    btnstyle: {
        margin: '8px 0'
    },

    button: {
        margin: theme.spacing(1),
    },
    alignment: {
        justifyItems: 'center'
    }
}));


export default function FormDialog(props) {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const [openDelete, setOpenDelete] = React.useState(false);

    const [isError, setIsError] = React.useState(false);
    const [errorName, setErrorName] = React.useState('');



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };


    const initialValues = {
        caption: props.meme.caption,
        url: props.meme.url
    }

    const initialValuesDelete = {
        Password: ''
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
        url: Yup.string().required('URL can\'t be empty')
            .test('valid-image-url', 'Must use valid image URL', async value =>
            await testImage(value, 1000).then(status => status === 'success')
        )
    })

    const validationSchemaDelete = Yup.object().shape({
        Password: Yup.string().required("Required").test('pass-check', 'Password doesn\'t match', value => (value) === process.env.REACT_APP_PAS)
    })

    const onSubmit = async (values, formProps) => {
        try {
            const response = await axios.patch(`/memes/${props.meme.id}`, values)
                .then(() => props.meme.func());
            handleClose();
        } catch (error) {
            setIsError(true)
            setErrorName(error.response.data)
            setTimeout(() => {
                setIsError(false)
            }, 3000);
        }
    }

    const onSubmitDelete = async () => {
        try {
            const response = await axios.delete(`/memes/${props.meme.id}`)
                .then(() => props.meme.func());
            handleCloseDelete();
        } catch (error) {
            
        }
    }


  return (
    <Grid container justify="center">
        <Button variant="contained" color="primary" onClick={handleClickOpen} className = {classes.button} endIcon = {<EditIcon />}>
            Edit
        </Button>
        <Button variant="contained" color="secondary" onClick={handleClickOpenDelete} className = {classes.button} endIcon = {<DeleteIcon />}>
            Delete
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
                            <Button
                                color='secondary'
                                variant="contained"
                                className = {classes.btnstyle}
                                fullWidth
                                onClick = {handleClose}
                            >
                                Cancel
                            </Button>
                            {isError ? <Alert severity="error">{errorName}</Alert> : ''}
                        </Form>

                    )}
                </Formik>
            </DialogContent>
        </Dialog>

        <Dialog open={openDelete} onClose={handleCloseDelete} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Delete Meme</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {/* Are you sure ? */}
                    Enter Password
                </DialogContentText>
                <Formik initialValues={initialValuesDelete} onSubmit={onSubmitDelete} validationSchema={validationSchemaDelete}>
                    {(deleteProp) => (
                        <Form>
                            <Field as={TextField}
                                id="outlined-multiline-static"
                                label="Password"
                                multiline
                                type = "password"
                                style={{ margin: "8 auto" }}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                name="Password"
                                helperText={<ErrorMessage name="Password" />}
                                error = {deleteProp.errors.Password && deleteProp.errors.Password ? true : false}
                                required
                            />

                            <Button 
                                type='submit' 
                                color='primary' 
                                variant="contained" 
                                disabled={deleteProp.isSubmitting}
                                className = {classes.btnstyle}
                                fullWidth
                            >
                                {deleteProp.isSubmitting ? "Loading" : "Delete"}
                            </Button>
                            <Button
                                color='secondary'
                                variant="contained"
                                className = {classes.btnstyle}
                                fullWidth
                                onClick = {handleCloseDelete}
                            >
                                Cancel
                            </Button>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>

    </Grid>
  );
}
