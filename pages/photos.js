import { Carousel } from 'react-responsive-carousel';
import img1 from '../public/images/img-1.jpg'
import img2 from '../public/images/img-2.jpg'
import img3 from '../public/images/img-3.jpg'
import img4 from '../public/images/img-4.jpg'
import img5 from '../public/images/img-5.jpg'
import img6 from '../public/images/img-6.jpg'
import img7 from '../public/images/img-7.jpg'
import img8 from '../public/images/img-8.jpg'
import lab1 from '../public/images/018.jpg'
import lab2 from '../public/images/021.jpg'
import lab3 from '../public/images/022.jpg'
import lab4 from '../public/images/023.jpg'
import lab5 from '../public/images/024.jpg'
import lab6 from '../public/images/025.jpg'
import lab7 from '../public/images/027.jpg'
import lab8 from '../public/images/059.jpg'
import lab9 from '../public/images/060.jpg'
import lab10 from '../public/images/062.jpg'
import lab11 from '../public/images/065.jpg'
import lab12 from '../public/images/098.jpg'
import lab13 from '../public/images/100.jpg'
import Image from 'next/image';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 
export default function photos() {
    return(
        <>
            <div>
                <center><h2>Laboratories</h2></center>
                <Carousel centerMode={true} autoPlay={true} centerSlidePercentage={70} infiniteLoop={true} showThumbs={false} >
                    <div>
                    <Image src={lab1}  width={500}height={500}alt="Picture of the author"/>
                    </div>
                    <div>
                    <Image src={lab2}  width={500}height={500}alt="Picture of the author"/>
                    </div>
                    <div>
                    <Image src={lab3}  width={500}height={500}alt="Picture of the author"/>
                    </div>
                    <div>
                    <Image src={lab4}  width={500}height={500}alt="Picture of the author"/>
                    </div>
                    <div>
                    <Image src={lab5}  width={500}height={500}alt="Picture of the author"/>
                    </div>
                    <div>
                    <Image src={lab6}  width={500}height={500}alt="Picture of the author"/>
                    </div>
                    <div>
                    <Image src={lab7}  width={500}height={500}alt="Picture of the author"/>
                    </div>
                    <div>
                    <Image src={lab8}  width={500}height={500}alt="Picture of the author"/>
                    </div>
                    <div>
                    <Image src={lab9}  width={500}height={500}alt="Picture of the author"/>
                    </div>
                    <div>
                    <Image src={lab10}  width={500}height={500}alt="Picture of the author"/>
                    </div>
                    <div>
                    <Image src={lab11}  width={500}height={500}alt="Picture of the author"/>
                    </div>
                    <div>
                    <Image src={lab12}  width={500}height={500}alt="Picture of the author"/>
                    </div>
                    <div>
                    <Image src={lab13}  width={500}height={500}alt="Picture of the author"/>
                    </div>

                </Carousel>
            </div>
            <br/>
            <div>
                <center><h2>Labs in Use</h2></center>
                <Carousel centerMode={true} autoPlay={true} centerSlidePercentage={70} infiniteLoop={true} showThumbs={false} >
                    <div>
                        <Image src={img1}  width={500}height={500}alt="Picture of the author"/>
                    </div>
                    <div>
                    <Image src={img2}  width={500}height={500}alt="Picture of the author"/>
                    </div>
                    <div>
                    <Image src={img3}  width={500}height={500}alt="Picture of the author"/>
                    </div>
                    <div>
                    <Image src={img4}  width={500}height={500}alt="Picture of the author"/>
                    </div>
                    <div>
                    <Image src={img5}  width={500}height={500}alt="Picture of the author"/>
                    </div>
                    <div>
                    <Image src={img6}  width={500}height={500}alt="Picture of the author"/>
                    </div>
                    <div>
                    <Image src={img7}  width={500}height={500}alt="Picture of the author"/>
                    </div>
                    <div>
                    <Image src={img8}  width={500}height={500}alt="Picture of the author"/>
                    </div>

                </Carousel>
            </div>
            <br/>
        </>
    )
}