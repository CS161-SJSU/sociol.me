import {makeStyles} from "@material-ui/core/styles";
import Flickity from "react-flickity-component";
import React from "react";
import Link from 'next/link'


const flickityOptions = {
    initialIndex: 1,
    cellAlign: 'center',
    freeScroll: true,
    prevNextButtons: false,
    pageDots: false,
    contain: true,
    autoPlay: 3500,
    pauseAutoPlayOnHover: false,
    selectedAttraction: 0.015,
    friction: 0.2,
    resize: false,
    wrapAround: true,
    setGallerySize: false,
    imagesLoaded: true,
    accessibility: false,
    draggable: false,
}

const useStyles = makeStyles(() => ({

    mainCarousel: {
        width: "min(108vh, 50%)",
        margin: '0',
        padding: '0',
    },
    carouselItem: {
        height: '100vh',
        width: '51vw',
    },

    text: {
        position: 'fixed',
        top: '50%',
        left: '51%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        fontFamily: 'arial',
        textDecoration: 'none',
        fontSize: '1.8em',
        zIndex: 'auto',
        color: 'black',
        backgroundColor: 'chartreuse',
    },

    outerBody: {
        position: 'relative',
        textAlign: 'center',
    },
}))



function Carousel({ images }) {
    const classes = useStyles()

    return (
        <Flickity
            className={classes.mainCarousel}
            options={flickityOptions} // takes flickity options {}
            reloadOnUpdate={false} // default false
            static // default false
            disableImagesLoaded={false} // default false
        >
            {images.map(image =>
                <img className={classes.carouselItem}  src={image.urls.full} alt={"Image"} />
            )}
        </Flickity>
    )
}


export default function Dashboard({images}) {
    const classes = useStyles()
    return (
        <div>
            <Carousel images={images} />
            <Link  href="/login">
                <a  className={classes.text} >  Navigate to login</a>
            </Link>
        </div>
    )
}


