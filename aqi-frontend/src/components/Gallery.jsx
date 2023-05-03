import React,{ useState } from 'react'
// mui
import { 
    Typography,
    Box,
    Stack,
} from "@mui/material";
// carousel
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
// components
import Title from './Title'
import Paragraph from './Paragraph'


const Gallery = () => {
    
    const [currentIndex, setCurrentIndex] = useState();

    const imageData = [
        {
            alt: 'image1',
            url: 'https://i0.wp.com/cleanschoolair.com/wp-content/uploads/2020/09/london-air-pollution-.jpg?resize=750%2C500&ssl=1'
        },
        {
            alt: 'image2',
            url: 'https://media.springernature.com/lw685/springer-static/image/art%3A10.1186%2Fs40537-021-00548-1/MediaObjects/40537_2021_548_Fig8_HTML.png'
        },
        {
            alt: "image3",
            url: 'https://ychef.files.bbci.co.uk/976x549/p09vjsqs.png'
        },
        {
            alt: "image4",
            url: 'https://imgnew.outlookindia.com/public/uploads/articles/2018/1/11/india_gate.jpg'
        },
        {
            alt: "image5",
            url: 'https://www.aqi.in/share/real-time-aqi-air-quality-index.jpg'
        },
    ];
  
    const renderSlides = imageData.map((image) => (
    <div key={image.alt}>
        <img src={image.url} alt={image.alt} />
    </div>
    ));


    const handleChange = (index) => {
        setCurrentIndex(index);
    }

    return (
        <Stack
        direction='column'
        justifyContent= 'center'
        alignItems= 'center'
        sx={{
            py: 8,
            px: 2,
            display: { xs: 'flex'},
        }}
        >
            <Box
            component='section'
            sx={{
                paddingBottom: 3,
            }}
            >
                <Title 
                text={
                    'Air Pollution Prediction'
                }
                textAlign={'center'}
                />
                <Typography
                variant='h5'
                component='h4'
                align='center'
                sx={{
                    paddingTop: 1,
                }}
                >
                    Gallery
                </Typography>
            </Box>
            
            <Box sx={{ 
                maxWidth: 700,
                width: '100%',
            }}>
                <Carousel
                centerSlidePercentage={40}
                thumbWidth={180}
                dynamicHeight={true}
                centerMode={false}
                showArrows={false}
                autoPlay={true}
                infiniteLoop={true}
                selectedItem={imageData[currentIndex]}
                onChange={handleChange}
                className="carousel-container"
                >
                {renderSlides}
                </Carousel>
            </Box>
        </Stack>
    )
}

export default Gallery