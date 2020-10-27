import {makeStyles} from "@material-ui/core/styles";
import Flickity from "react-flickity-component";
import React from "react";
import Link from 'next/link'


const flickityOptions = {
    initialIndex: 0,
    cellAlign: 'left',
    freeScroll: false,
    prevNextButtons: false,
    pageDots: false,
    contain: true,
    autoPlay: false,
    adaptiveHeight: true,
    selectedAttraction: 0.015,
    friction: 0.2
}

const useStyles = makeStyles(() => ({

    mainCarousel: {
        width: "min(106vh, 50%)",
    },
    carouselItem: {
        height: '100vh',
        width: '100%'
    },

    text: {
        position: 'absolute',
        bottom: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
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
            reloadOnUpdate // default false
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
        <div style={{""}}>
            <Carousel images={images} />
            <Link className={classes.text} href="/login">
                <a>Navigate to login</a>
            </Link>
        </div>
    )
}


