import Link from "next/link"
import img13 from '../public/images/img-13.jpg'
import Image from "next/image"
import { Carousel } from 'react-responsive-carousel';
import sem1 from '../public/images/IMG-20240207-WA0036.jpg'
import sem2 from '../public/images/IMG-20240207-WA0037.jpg'
import sem3 from '../public/images/IMG-20240207-WA0038.jpg'
import sem4 from '../public/images/IMG-20240207-WA0039.jpg'
import sem5 from '../public/images/IMG-20240207-WA0040.jpg'
import sem6 from '../public/images/IMG-20240207-WA0041.jpg'
import sem7 from '../public/images/IMG-20240207-WA0042.jpg'
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 

export default function about() {
    return(
        <>
            <div className="container">
                <h1>Projects</h1>
                <br/>
                <div className="d-flex flew-row ">
                    <div className="p-2">
                        <Image width={600}	className=" rounded-5 " src={img13}  alt="Pierronetic"/>
                    </div>
                    <div className="p-4 bg-body-secondary rounded-5">
                        <h2>Pierronetic</h2>
                        <h5>Made by Daffeyd Wilbert</h5>
                        <h5><Link href="https://github.com/daffeyd/Pierronetic" >Github</Link></h5>
                        <hr/>
                        <p>
                            Fires can occur and appear anywhere, causing devastating consequences such as damage to property and endangering the lives of individuals. Nowadays, fires can be extinguished with three essential elements: firefighter, robots, and fire sprinkler. The delayed arrival time of firefighters and robots causes them to be regarded as external factors in the fire scenario. Traditional fire extinguisher like fire sprinkler has limitations in terms of speed, accuracy, and control making it challenging to detect and extinguish fire accurately in real time. This paper proposes an improved fire extinguishing approach for buildings based on the YOLOv8 algorithm, called pyro fighter turret (PYRETT) which leverages the strengths of deep learning to detect fire in real time. PYRETT approach has the potential to improve the speed and accuracy of fire detection, reduce the risk of damage to property and human life, cost-effective and faster response times of fire extinguishing compared to traditional fire extinguishing methods. PYRETT achieved state-of-the-art performance in terms of both precision and recall, with a high precision rate of 90% for all classes. The proposed approach has several potential applications, including fire safety management in public and private areas.
                        </p>
                    </div>
                </div>
                <br/>
                <div className="d-flex flew-row ">
                    <div className="p-2">
                        <Carousel width ={600 } showThumbs={false} >
                            <div>
                                <Image width={600}	className="  " src={sem7}  alt="sem7"/>
                            </div>
                            <div>
                                <Image width={600}	className="  " src={sem1}  alt="sem1"/>
                            </div>
                            <div>
                                <Image width={600}	className="  " src={sem2}  alt="sem2"/>
                            </div>
                            <div>
                                <Image width={600}	className=" " src={sem3}  alt="sem3"/>
                            </div>
                            <div>
                                <Image width={600}	className="  " src={sem4}  alt="sem4"/>
                            </div>
                            <div>
                                <Image width={600}	className="  " src={sem5}  alt="sem5"/>
                            </div>
                            <div>
                                <Image width={600}	className="  " src={sem6}  alt="sem6"/>
                            </div>
                            
                        </Carousel>
                    </div>
                    <div className="p-4 bg-body-secondary rounded-5">
                        <h2>SEM Prototypes</h2>
                        <h5>Made by D'Base Club</h5>
                     
                        <hr/>
                        <p>
                            As efforts are to make a more better and ecofriendly car continues to be in the zeitgeist of the times, D'BASE has strived to innovate and create a more innovative and fuel efficient vehicle. In the Last Competition, D'BASE team was able to make a prototype with an efficiency of 224 kilometres per kWh, and an Urban Concept vehicle with a fuel efficiency of 67 km/liter. It is a great success, showing their hard work and effort have paid off for the creation of such a vehicle.
                        </p>
                        <br/>
                        <p>
                            The Shell Eco-Marathon Asia 2022 activity is an opportunity to raise the spirit of innovation and competition, especially for the D'BASE team which managed to finish in the top 5 and qualify in the top 12 in this competition along with several teams from other universities. It is also hoped that this activity will be a good step in developing environmentally friendly cars so that it will have a good impact on Indonesia and the world.
                        </p>
                    </div>
                </div>
            </div>
            <div className="container">

            </div>
        </>
    )
}