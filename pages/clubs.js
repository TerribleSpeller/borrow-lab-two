import Link from "next/link"

export default function clubs() {
    return(
        <>
            <div className="container">
                <h1>Affliated Clubs</h1>
            </div>
            <div className="container">
                <br/>
                <div className="container">
                    <Link href="https://www.basecore.tech/"><h3>BASE CORE</h3></Link>
                    <p>BASE CORE, or Binus Aso School of Engineering Centre for Robotic Engineering, is a club that intends to  become the center of engineering research and engineering in BASE campus. With its three main divisions of - Robotic, Automotive, and Learning Divisions, the BASE CORE Club cooperates with the Lab in hopes that it'll be able to help ingrain into its club members a love of learning and the basic skills necessary to be able to innovate in the Robotics Field. </p>
                </div>
                <div className="container">
                    <h3>D'BASE</h3>
                    <p>D'BASE, is a club that dedicates its fully to represent BINUS ASO in the Shell Eco Marathon, at Pertamina Mandalika International Circuit, Lombok. Due to the club's nature of innovating and creating automotive prototypes, they cooperate closely with the Labs in order to provide tools and materials for the club to be able to focus creating their prototypes, pushing the boundaries of automotive engineering. </p>
                </div>
            </div>
        </>
    )
}