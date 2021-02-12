import React, { useEffect, useState } from 'react';
import { Grid } from "@material-ui/core";
import MemeCard from './MemeCard';

const MemeContent = (props) => {
    // console.log("final", props);

    const getMemeCard = (memeObj, idx) => {
        return (
            <Grid key = {idx} item xs = {12} sm = {6} lg = {4} >
                <MemeCard key={memeObj.id} {...memeObj} fun = {props.fn}/>
            </Grid>
        )
    }

    return (
        <Grid container spacing={2}>
            {props.memes.map((meme, idx) => getMemeCard(meme, idx))}
        </Grid>
    )
}

export default MemeContent;