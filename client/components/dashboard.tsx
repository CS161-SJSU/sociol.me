import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Flickity from "react-flickity-component";
//import "flickity/dist/flickity.css";



const flickityOptions = {
    initialIndex: 0,
    cellAlign: 'left',
    freeScroll: false,
    prevNextButtons: false,
    pageDots: false,
    contain: true,
    autoPlay: 2000,
    adaptiveHeight: true,
    selectedAttraction: 0.015,
    friction: 0.2
}

const useStyles = makeStyles(() => ({

    mainCarousel: {
        width: "100%",
    },
    carouselItem: {
        height: '100vh',
        width: '100%'
    },
}))


function Carousel() {
    const classes = useStyles()

    return (
        <Flickity
            className={classes.mainCarousel}
            options={flickityOptions} // takes flickity options {}
            reloadOnUpdate // default false
            static // default false
            disableImagesLoaded={false} // default false
        >

            <img  className={classes.carouselItem}  src="https://placeimg.com/640/480/animals" />
            <img   className={classes.carouselItem} src="https://placeimg.com/640/480/animals" />
            <img  className={classes.carouselItem} src="https://placeimg.com/640/480/animals" />
            <img  className={classes.carouselItem} src="https://placeimg.com/640/480/animals" />
        </Flickity>
    )
}


export default function Dashboard() {


    return (
        <div>
            <Carousel  />
        </div>
    )
}
