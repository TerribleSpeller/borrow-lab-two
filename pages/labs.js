import fis1 from '../public/images/098.jpg'
import fis2 from '../public/images/img-8.jpg'
import fis3 from '../public/images/img-9.png'
import fis4 from '../public/images/img-10.png'
import ergo1 from '../public/images/027.jpg'
import ergo2 from '../public/images/img-11.png'
import com1 from '../public/images/img-12.png'
import lab2081 from '../public/images/img-1.jpg'
import lab2082 from '../public/images/060.jpg'
import lab2083 from '../public/images/062.jpg'
import lab2091 from '../public/images/065.jpg'
import PDE1 from '../public/images/img-7.jpg'
import PDE2 from '../public/images/img-2.jpg'
import PDE3 from '../public/images/018.jpg'
import PDE4 from '../public/images/021.jpg'
import AUT1 from '../public/images/022.jpg'
import AUT2 from '../public/images/023.jpg'
import AUT3 from '../public/images/024.jpg'
import AUT4 from '../public/images/025.jpg'
import AUT5 from '../public/images/img-3.jpg'
import AUT6 from '../public/images/img-4.jpg'
import Image from 'next/image'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 



export default function labsDesc() {
    return(
        <>
            <div className="d-flex  flex-md-column flex-lg-row container">
                <div id="physic-lab-im" className="p-2">
                    <Carousel centerMode={false} autoPlay={true} centerSlidePercentage={70} infiniteLoop={true} showThumbs={false} >
                        <div>
                            <Image src={fis1} width={400} height={400}/>
                        </div>
                        <div>
                            <Image src={fis2} width={400} height={400}/>
                        </div>
                        <div>
                            <Image src={fis4} width={400} height={400}/>
                        </div>
                    </Carousel>
                </div>
                <div id="physics-lab-desc" className="p-4">
                    <h2>Physics Lab (Room 106)</h2>
                    <br/>
                    <p>This lab is dedicated to teaching and conducting experiments of related to the subject of Physics, where the students can apply theoratical knowledge learnt in class, develop experimental skills, verify laws and pricniples, practice critical thinking, engage in problem solving, and also observe the real life applications of material learnt in class.</p>
                </div>
            </div>
            
            <div className="d-flex  flex-md-column flex-lg-row container">
                <div id="ergo-lab-desc" className="p-4">
                    <h2>Ergonomics Lab (Room 107)</h2>
                    <br/>
                    <p>This lab is dedicated to teaching and learning about the elements influencing human movements and how best to design a product that may with ease, adapt well to consumer behaviour and actions.</p>
                </div>
                <div id="ergo-lab-im" className="p-2">
                    <Carousel centerMode={false} autoPlay={true} centerSlidePercentage={70} infiniteLoop={true} showThumbs={false} >
                        <div>
                            <Image src={ergo1} width={400} height={400}/>
                        </div>
                        <div>
                            <Image src={ergo2} width={400} height={400}/>
                        </div>
                  </Carousel>
                </div>

            </div>

            <div className="d-flex  flex-md-column flex-lg-row container">
                <div id="com-lab-im" className="p-2">
                    <Carousel centerMode={false} autoPlay={true} centerSlidePercentage={100} infiniteLoop={true} showThumbs={false} >
                        <div>
                            <Image src={com1} width={1000} height={400}/>
                        </div>
                    </Carousel>
                </div>
                <div id="com-lab-desc" className="p-4">
                    <h2>Computer Lab (Room 111)</h2>
                    <br/>
                    <p>
                        This Computer Lab has a series of computers used for a variety of labs for hands on practice. Mainly Digital Signal Processing, Computer Network and Information Security, and Circuit & Electronics. Of note, is that this lab's computers are all installed with MatLab. 
                    </p>
                    <p>
                        MATLAB is a high-level programming language and environment. It is primarily utilized for numerical computing, data analysis, and visualization across various fields. 
                    </p>
                    <p>MATLAB excels in performing mathematical and numerical computations, supporting operations like solving linear algebraic equations, optimization problems, and numerical simulations. </p>
                    <p>
                    The platform provides powerful tools for analyzing and visualizing data, including statistical analysis, signal processing, image processing, and the creation of plots and graphs.
                    </p>
                    <p>
                        MATLAB's versatility, ease of use, and extensive library make it a valuable resource for the students to learn and use with, so that they may be able to use it well in their future careers.
                    </p>
                </div>
            </div>

            <div className="d-flex  flex-md-column flex-lg-row container">
                <div id="comp208-lab-desc" className="p-4">
                    <h2>Application/Computer Lab (Room 208)</h2>
                    <br/>
                    <p>This lab is dedicated to activites that are geared more towards needing computers. Room 208 has a 3D UPBox Printer, Rolang Milling Machine, a GOM 3D Scanner, and two Invoa 3D Printers</p>
                    <p>In addition to that, this room also has 41 PCs installed with several different applications needed for simulating and implementing various programs, such as XILINX ISE Design Suite for CPLD Programming.</p>
                </div>
                <div id="comp208-lab-im" className="p-2">
                    <Carousel centerMode={false} autoPlay={true} centerSlidePercentage={70} infiniteLoop={true} showThumbs={false} >
                        <div>
                            <Image src={lab2082} width={400} height={400}/>
                        </div>
                        <div>
                            <Image src={lab2083} width={400} height={400}/>
                        </div>

                    </Carousel>
                </div>

            </div>

            <div className="d-flex  flex-md-column flex-lg-row container">
            <div id="209-lab-im" className="p-2">
                    <Carousel centerMode={false} autoPlay={true} centerSlidePercentage={70} infiniteLoop={true} showThumbs={false} >
                        <div>
                            <Image src={lab2091} width={400} height={400}/>
                        </div>
                    </Carousel>
                </div>
                <div id="209-lab-desc" className="p-4">
                    <h2>Computer Lab (Room 209)</h2>
                    <br/>
                    <p>This lab is dedicated more towards designing, with applications that can do Computer Aided Design (CAD), Computer Aided Engineering (CAE), Computer Aided Manufacturing (CAM), and Anthropometry. This lab as a whole is dedicated to such academic activites with 25 High End PCs. </p>
                </div>


            </div>

            <div className="d-flex  flex-md-column flex-lg-row container">
                <div id="expression-techniquw-lab-desc" className="p-4">
                    <h2>Product Design Engineering Lab (Room 103)</h2>
                    <br/>
                    <p>This lab is dedicated to allowing undergraduates to turn their sketches into prototypes utilizing wood and foam so that may be able to create and get a better understanding of their designs and how to better improve their designs.</p>
                </div>
                <div id="expression-techniquw-lab-im" className="p-2">
                    <Carousel centerMode={false} autoPlay={true} centerSlidePercentage={70} infiniteLoop={true} showThumbs={false} >
                        <div>
                            <Image src={PDE3} width={400} height={400}/>
                        </div>
                        <div>
                            <Image src={PDE4} width={400} height={400}/>
                        </div>

                        <div>
                            <Image src={PDE1} width={400} height={400}/>
                        </div>
                        <div>
                            <Image src={PDE2} width={400} height={400}/>
                        </div>

                    </Carousel>
                </div>

            </div>

            <div className="d-flex  flex-md-column flex-lg-row container">
            <div id="monozukari-lab-im" className="p-2">
                    <Carousel centerMode={false} autoPlay={true} centerSlidePercentage={70} infiniteLoop={true} showThumbs={false} >
                        <div>
                            <Image src={AUT1} width={400} height={400}/>
                        </div>
                        <div>
                            <Image src={AUT2} width={400} height={400}/>
                        </div>
                        <div>
                            <Image src={AUT3} width={400} height={400}/>
                        </div>
                        <div>
                            <Image src={AUT4} width={400} height={400}/>
                        </div>
                        <div>
                            <Image src={AUT5} width={400} height={400}/>
                        </div>
                        <div>
                            <Image src={AUT6} width={400} height={400}/>
                        </div>
                    </Carousel>
                </div>
                <div id="monozukari-lab-desc" className="p-4">
                    <h2>Monozukari Lab (Room 104)</h2>
                    <br/>
                    <p>This lab is for matters relating to understanding and learnign automotives practices and projects relating to it. There are tools such as cyclinder gauges, and micrometers that are often use to interact with pistons, and other Automotive Components. In addition, there is a Aerodynamics Machine to observe the aerodynamics of an objec.</p>
                </div>


            </div>
        </>
    )
}