import NavBar from '../../../components/navbar'
import Blog from '../../../components/blog'

export default function YawNN() {
  return (
    <>
      <NavBar showName={true} />
      <Blog 
        title="Yawning Detection"
        image={{
          src: "/assets/index/logo-yawnn.svg",
          alt: ""
        }}
        colour="lightgreen"
        text={
            <>
              <h3>Dissertation</h3>
                <p>My final year of university saw the development, implementation and analysis of a 9-month solo project and related dissertation. </p>

                <p>I wanted to work on a project that had the genuine possibility of helping people, while also being novel, engaging and challenging. MedTech has always been interesting to me and seemed like a great place to start, so after getting in contact with the <a href="https://mobile-systems.cl.cam.ac.uk/">Mobile Systems Research Lab</a>, I was introduced to the idea, challenges, and potential of using wearable tech for yawning detection.</p>

                <p>Despite seeming exceedingly niche, there's a surprising need for more work in the field. To quote... myself, </p>

                <blockquote>
                  "Alertness is of paramount importance in safety-critical situations, such as long-haul driving, working with heavy machinery or in emergency response. Being tired can have a significant impact on a person's ability to perform these tasks safely and can lead to accidents; according to the National Highway Traffic Safety Administration (NHTSA), there were 91,000 crashes involved drowsy driving in 2017, leading to roughly 50,000 injuries and 800 deaths [<a href="#ref1">1</a>]. Moreover, excessive drowsiness among individuals could have detrimental effects on their work performance, resulting in decreased productivity, frequent lapses in work, and a negative impact on their overall mood and well-being [<a href="#ref2">2</a>, <a href="#ref3">3</a>].
                  <br/><br/>
                  "The ability to detect when a person is becoming tired as to encourage taking breaks is therefore of great importance."
                </blockquote>

              <h3>Paper</h3>


              <p id="ref1">[1] NHTSA. 2017. Drowsy Driving. <a href="https://www.nhtsa.gov/risky-driving/drowsy-driving">https://www.nhtsa.gov/risky-driving/drowsy-driving</a>. Accessed: 2023-23-03.</p>
              <p id="ref2">[2] Michael H. Bonnet. 1985. Effect of Sleep Disruption on Sleep, Performance, and Mood. Sleep 8, 1 (03 1985), 11-19. <a href="https://doi.org/10.1093/sleep/8.1.11">https://doi.org/10.1093/sleep/8.1.11</a><br/> arXiv: <a href="https://academic.oup.com/sleep/article-pdf/8/1/11/13678498/080102.pdf">https://academic.oup.com/sleep/article-pdf/8/1/11/13678498/080102.pdf</a></p>
              <p id="ref3">[3] Judith A. Ricci, Elsbeth Chee, Amy L. Lorandeau, and Jan Berger. 2007. Fatigue in the U.S. Workforce: Prevalence and Implications for Lost Productive Work Time. Journal of Occupational and Environmental Medicine 49, 1 (2007), 1-10. <a href="http://www.jstor.org/stable/44997095">http://www.jstor.org/stable/44997095</a></p>
            </>
        }
        />
    </>
  )
}