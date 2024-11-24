// @ts-ignore
import { animationOnLoad } from '../../../scripts/animatedImages';
import { useEffect } from 'react';
import React from 'react';
import Blog from '../../../components/blog';

export function AnimatedImage() {
  useEffect(() => animationOnLoad([
    {
      hoverId: '#blogImageContainerYawningDetection', 
      imageId: '#blogImageYawningDetection',
      srcStatic: '/src/assets/home/logo-yawnn-static.png', 
      srcAnimated: '/src/assets/home/logo-yawnn.gif',
    }
  ]), []);
  return <></>;
}

export default function YawNN() {
  return (
    <>
      <AnimatedImage />
      <Blog 
        title="Yawning Detection"
        image={{
          src: "/src/assets/home/logo-yawnn-static.png",
          alt: ""
        }}
        colour="#9bfae7"
        text={
            <>
              <p>My final year of university saw the development, implementation and analysis of a 9-month solo project and related dissertation. It ended up winning the CST Department Prize for a Highly Commended Dissertation, and my supervisor and I worked together to publish a <a href="https://dl.acm.org/doi/10.1145/3615592.3616854">paper</a> with the results!</p>

              <h2>Dissertation</h2>

                <p>I wanted to work on a project that had the genuine possibility of helping people, while also being novel, engaging and challenging. MedTech has always been interesting to me and seemed like a great place to start, so after getting in contact with the <a href="https://mobile-systems.cl.cam.ac.uk/">Mobile Systems Research Lab</a>, I was introduced to the idea, challenges, and potential of using wearable tech for yawning detection.</p>

                <p>Despite seeming exceedingly niche, there's a surprising need for more work in the field. To quote... myself, </p>

                <blockquote>
                  "Alertness is of paramount importance in safety-critical situations, such as long-haul driving, working with heavy machinery or in emergency response. Being tired can have a significant impact on a person's ability to perform these tasks safely and can lead to accidents; according to the NHTSA, 91,000 crashes involved drowsy driving in 2017, leading to roughly 50,000 injuries and 800 deaths [<a href="#ref1">1</a>]. 
                  <br/><br/>
                  "Moreover, excessive drowsiness among individuals has been shown to have detrimental effects on their work performance, resulting in decreased productivity, frequent lapses in focus, and a negative impact on their overall mood and well-being [<a href="#ref2">2</a>, <a href="#ref3">3</a>].
                  <br/><br/>
                  "The ability to detect when a person is becoming tired as to encourage taking breaks is therefore of great interest."
                </blockquote>

                <p>My project aimed to enable a pipeline for collecting <a href="https://en.wikipedia.org/wiki/Inertial_measurement_unit">IMU</a> data from <a href="https://esense.io/#eSense">eSense</a> earphones, preprocessing this then passing it into a neural network, outputting a prediction of whether the wearer was yawning or not.</p>

                <p>I first created a simple <a href="https://github.com/jacbn/yawning-detection/tree/main/yeimu">mobile app</a> using Flutter to interface with and collect raw data from the earphones. Data is sent over a BLE connection and stored locally on the device; one of several apps can be used to transfer the data to a more powerful computer for model training via the device's sharesheet.</p>

                <div className="imageContainer">
                  <div className="doubleImage">
                    <img style={{width: "35%"}} src={'/src/assets/yawnn/app/recording.png'} alt="YeIMU Recording" />
                    <img style={{width: "35%"}} src={'/src/assets/yawnn/app/plots.png'} alt="YeIMU Plots" />
                  </div>
                  <p>Figure 1: The YeIMU app. The first shows the main screen once connected to the earphones and recording, the second a post-recording graph accessible from the 'View Results' button on the main screen.</p>
                </div>

                <p>With some initial testing data acquired, I manually explored features present in the data to determine what models would best suit the task. The figures below show the raw data for a sample of both eating and of a single yawn:</p>


                <div className="imageContainer">
                  <div className="doubleImage">
                    <img style={{width: "49%"}} src={'/src/assets/yawnn/prelim/eating.png'} alt="YeIMU Recording" />
                    <img style={{width: "49%"}} src={'/src/assets/yawnn/prelim/yawn.png'} alt="YeIMU Plots" />
                  </div>
                  <p>Figure 2: Preliminary analysis. Eating is characterised by oscillatory gyroscope readings in all axes at intervals of just under 2Hz, with mostly flat accelerometer readings. Yawning is characterised by a long period of flat readings in both sets of axes, followed by a spike in activity in gyroscope readings, most notably in the Z-axis.</p>
                </div>

                <p>Given that these features are so discernable visually (admittedly the recordings were collected in an ideal environment, but the idea holds), using a convolutional network seemed logical as these networks are typically used for pattern recognition in images. The temporal nature of the data alternatively encourages a recurrent neural network, so these two network types were both constructed and compared.</p>

                <p>The details of preprocessing are a little too complicated for a post like this, but in short 7 neural network models were constructed, being mixtures of CNN / RNN (LSTM) networks with FFT or spectrogram transforms applied. 3 additional models were constructed using classical ML algorithms (KNN / SVM / RF) as baselines, giving 10 total models to compare.</p>

                <p>The results on a dataset I collected from 10 users showed that the LSTM approach over raw data was the most successful under leave-some-out testing, with accuracies averaging 90% (F1: 0.89). By moving a small fraction of the data from an individual into the training set, however, accuracies averaged 95% (F1: 0.93); in the real world, this would be equivalent to a new user providing a sample of their data before using the otherwise-trained model.</p>

                <p>While promising, there was significant scope for further research after this. The dataset was small and was collected in a controlled environment. It also only used the accelerometer and gyroscope readings; data from a microphone or other sensors could be used to provide additional data points to further refine the features of a yawn picked up on by the models.</p>

                <p>On reflection, the project was a huge success. I thoroughly enjoyed the challenge of working on something novel, and the thrills of getting things working after a lot of pain aren't something I'll forget soon. The diss ended up scoring 90 marks, one of the best in the year, which I'm also incredibly proud of. From something I initially thought was amusingly niche, yawning detection came to define a lot of my ups and downs for the year and I'm glad it did!</p>

              <h2>Paper</h2>

                <p>Following the success of the dissertation, my supervisor had the idea of converting the project into a full scientific paper. A second dataset had been made accessible a few days before the deadline of the diss (unfortunately too little time to use then), but this could now be used to provide a more robust analysis of the models, and whether they would generalise to other people.</p>

                <p>This paper was submitted and accepted into the <a href="https://smart-wear-2023-bjfs.vercel.app/">SmartWear 2023 Workshop</a>! The workshop ran in early October, and we gave a small presentation on the project to industry experts. The published paper is available <a href="https://dl.acm.org/doi/10.1145/3615592.3616854">here</a>!</p>

              <p id="ref1" className="footnote">[1] NHTSA. 2017. Drowsy Driving. <a href="https://www.nhtsa.gov/risky-driving/drowsy-driving">https://www.nhtsa.gov/risky-driving/drowsy-driving</a>. Accessed: 2023-23-03.</p>
              <p id="ref2" className="footnote">[2] Michael H. Bonnet. 1985. Effect of Sleep Disruption on Sleep, Performance, and Mood. Sleep 8, 1 (03 1985), 11-19. <a href="https://doi.org/10.1093/sleep/8.1.11">https://doi.org/10.1093/sleep/8.1.11</a><br/> arXiv: <a href="https://academic.oup.com/sleep/article-pdf/8/1/11/13678498/080102.pdf">https://academic.oup.com/sleep/article-pdf/8/1/11/13678498/080102.pdf</a></p>
              <p id="ref3" className="footnote">[3] Judith A. Ricci, Elsbeth Chee, Amy L. Lorandeau, and Jan Berger. 2007. Fatigue in the U.S. Workforce: Prevalence and Implications for Lost Productive Work Time. Journal of Occupational and Environmental Medicine 49, 1 (2007), 1-10. <a href="http://www.jstor.org/stable/44997095">http://www.jstor.org/stable/44997095</a></p>
            </>
        }
        />
    </>
  );
}
