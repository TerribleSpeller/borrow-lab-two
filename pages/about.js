import Link from "next/link"

export default function about() {
    return(
        <>
            <div className="container">
                <h2>Purpose</h2>
                <p>
                    This website is dedicated and exists in order to facilitate better access and organisation for the various labs here in BINUS ASO School of Engineering. 
                </p>
            </div>
            <div className="container">
                <h2>Contact Us</h2>
                    <ul>
                        <li>Head of Lab : Pak Ben</li>
                        <li>Lab Staff: Faisal Kurniawan (0881-5935-518)</li> 
                        <li>Technical Inquiries: 
                            <br/>
                            WA: 081293820288 (Technician  - Jason Alexander)
                        </li>
                        
                    </ul>
                    <h3>
                        Technical
                    </h3>
                    <ul>
                        <li>Designed and Created using Next.js, Bootstrap, Next-Auth.js, and MongoDB</li>
                        <li>Hosted on Vercel, Repository on <Link href="https://github.com/TerribleSpeller/labborrow">Github</Link> </li>
                        <li>Designed by Jason Alexander (NIM: 2602188673) From Year 2026</li>
                        <li>Released under MIT License</li>
                    </ul>
            </div>
            <></>
            <></>
        </>
    )
}