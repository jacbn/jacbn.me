import React from 'react';
import Blog from '../../../components/blog';

export default function Pandemic() {
  return <Blog 
    title="Pandemic Simulation and Real-World COVID-19 Data Analysis"
    colour="lightcoral"
    text={
        <>
            <h2>Simulation</h2>
            <p>The first part of the project involved simulating the spread of an infection through a population. This is done by assigning the population randomly into households at the start of the simulation (with tuneable sizes), then maintaining two probabilities — that of transmission within the household, and that of transmission between households. Simulation involves applying these probabilities to each infected person each day. </p>
            <p>All the data is stored in a NumPy matrix for efficiency purposes — running a 200-day simulation on a population of 100,000 only takes a few seconds — and for a simple transition between the raw data and plotting it. You can see the results of 5 simulations for different household sizes (3 hshlds = each household is 3x the size of the average UK household — about 2.4) in Figure 1 below.</p>
            <p>One thing that's particularly interesting is that it's actually incredibly unlikely that 100% of the population gets infected. As more people catch the virus it leads to a peak, but after this peak herd immunity lowers the probability of catching the virus for those who have not yet been infected. Over time, the virus dies out without infecting everyone, despite having the capability to do so — and we can see that the total percentage of the population infected after the virus dies out is much lower with smaller household sizes (and hence more total households to infect).</p>
            <p>Of course, this model isn't perfect. It doesn't take into account the possible virus mutations, the effects of lockdown, etc, partly because the data for how effective these are isn't known. So, we turn to looking at real world data to see how effective these measures are.</p>
            
            <h3>Figure 1: Simulated infection over time in a population of 100,000.</h3>
            <img className="pandemicIm" src={"/src/assets/pandemic/Figure_2.png"}/>
            
            <h2>Data Analysis</h2>
            <p>The second half of the project involved processing data (gathered from researchers at John Hopkins University), and looking into the effectiveness of certain measures introduced by the government, such as lockdowns, mask wearing, etc. The first and simplest thing to do, of course, was to format the data into a processable form and plot it; Figure 2 shows a snapshot of the data running up to the 12th Dec 2020.</p>
            <p>Plotting the data alone isn't too interesting though, and we can't draw any real conclusions from it. Instead, we can calculate the R-value using a rolling average of infections, and measure how this changes compared to the number of people currently infected. This is a good way to measure the impact of certain measures via a phase-space diagram — see Figure 3. In this plot, the y-axis is the R-value, the x-axis is the (log of) the number of infections, and the line progresses through time (each cross marks a day). By default, a standard, exponentially-increasing pandemic would be represented as a flat line; where there are sharp changes to the direction of the line in the figure is where a policy has come into effect and the number of new infections is changing.</p>
            <p>A clear example is the first lockdown/reopen in the UK. We can see that initially the R-value was far above 3, and immediately after the lockdown came into effect (March 23rd, 2020) the R-value began to drop significantly, and the number of new infections (i.e. the x-gap between points) slowed. Eventually, the R-value broke below 1 and the number of infected decreased. However, almost immediately after the reopening, this pivoted into a loop and infections jumped and the R-value increased above 1 (unfortunately, some of the data was incorrect for the UK during the following period so the R-value appears to drop far below 0 — it picks back up again on the left side a few weeks later).</p>
            
            <h3>Figure 2: Infections & Deaths over time for the UK, 2020-01-22 to 2020-12-12</h3>
            <img className="pandemicIm" src={"/src/assets/pandemic/Figure_4.png"}/>
            <h3>Figure 3: Phase-space plot of R-value against number of people infected (4 countries)</h3>
            <img className="pandemicIm" src={"/src/assets/pandemic/Figure_5.png"}/>
        </>
    }
    />;
}
