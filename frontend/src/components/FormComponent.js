import React, { useEffect, useState } from 'react';
import { Grid, Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import MemeContent from './MemeContent';
import axios from '../api/axios';
import * as Yup from 'yup'


const useStyles = makeStyles((theme) => ({
    paperStyle: {
        padding: 30,
        height: 'auto',
        width: 280,
        margin: "80px 0px"
    },
    btnstyle: {
        margin: '8px 0'
    },
}));


export default function FormComponent() {
    const classes = useStyles();
    const [memes, setMemes] = useState([]);
    const [memesChange, setMemesChange] = useState(0);

    let getMemes = async() => {
        try {
            const response = await axios.get('/memes')
            setMemes(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const initialValues = {
        name: '',
        caption: '',
        url: ''
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
        name: Yup.string().required("Required"),
        caption: Yup.string().required("Required"),
        url: Yup.string().required('Please enter the URL')
            .test('valid-image-url', 'Must use valid image URL', value =>
            testImage(value, 1000).then(status => status === 'success')
        )
    })

    const updateMemes = () => {
        setMemesChange(memesChange + 1);
    }

    const onSubmit = async (values, props) => {
        try {
            const response = await axios.post('/memes', values)
                .then(() => props.resetForm())
                .then(() => props.setSubmitting(false))
                .then(() => updateMemes())
        } catch (error) {
            console.log("error", error);
        }
        console.log("val", values)   
        console.log("props", props)
        
    }

    useEffect(() => {
        getMemes();
    }, [memesChange]);

    return (
        <Grid>
            <Grid>
                <Grid item container>
                    <Grid item xs = {false} sm = {5} />
                    <Grid item xs = {12} sm = {7} >
                        <Paper elevation = {10} className = {classes.paperStyle}>
                            <Grid align="center">
                                Hey There! Post your Memes Here :)
                            </Grid>
                            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                                {(props) => ( 
                                    <Form>
                                        <Field as={TextField}
                                            id="outlined-full-width"
                                            label="Name"
                                            style={{ margin: "8 auto" }}
                                            placeholder="Enter your Full Name."
                                            fullWidth
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="outlined"
                                            name="name"
                                            helperText={<ErrorMessage name="name" />}
                                            error = {props.errors.name && props.touched.name ? true : false}
                                            required
                                        />
                                        <Field as={TextField}
                                            id="outlined-multiline-static"
                                            label="Caption"
                                            multiline
                                            style={{ margin: "8 auto" }}
                                            placeholder="Let's see your creativity."
                                            rows={4}
                                            fullWidth
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="outlined"
                                            name="caption"
                                            helperText={<ErrorMessage name="caption" />}
                                            error = {props.errors.caption && props.touched.caption ? true : false}
                                            required
                                        />
                                        <Field as={TextField}
                                            id="outlined-full-width"
                                            label="URL"
                                            style={{ margin: "15px auto" }}
                                            placeholder="Enter the URL."
                                            fullWidth
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="outlined"
                                            name="url"
                                            helperText={<ErrorMessage name="url" />}
                                            required
                                            error = {props.errors.url && props.touched.url ? true : false}
                                        />
                                        <Button 
                                            type='submit' 
                                            color='primary' 
                                            variant="contained" 
                                            disabled={props.isSubmitting}
                                            className = {classes.btnstyle}
                                            fullWidth
                                        >
                                            {props.isSubmitting ? "Loading" : "Submit"}
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                        </Paper>
                    </Grid>
                    <Grid item xs = {false} sm = {false} />
                </Grid>
            </Grid>
            <Grid>
                <Grid item container> 
                    <Grid item xs = {false} sm = {1} />
                    <Grid item xs = {12} sm = {10} >
                        <MemeContent memes = {memes} fn = {updateMemes}/>
                    </Grid>
                    <Grid item xs = {false} sm = {1} />
                </Grid>
            </Grid>
        </Grid>
    );
}
