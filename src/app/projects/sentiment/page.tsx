'use client'

import NavBar from '../../../components/navbar'
import Blog from '../../../components/blog'
import TeX from '@matejmazur/react-katex';
import 'katex/dist/katex.min.css';

export default function YawNN() {
  return (
    <>
      <NavBar showName={true} />
      <Blog 
        title="Sentiment Classification"
        colour="lightblue"
        text={
            <>
                <p>As part of an introduction to NLP, I worked on a project comparing multiple different methods of sentiment analysis to determine which is the most accurate. This began with a simple lexical map of certain keywords which indicate sentiment directly ('good', 'bad', 'enjoyed', 'hated', etc.) which were used to calculate a sentiment score over a dataset of movie reviews, but I quickly discovered this was a flawed method as the reviewer could be describing a small section of the movie, or use inverting phrases such as 'not bad'. I also needed to consider the strength of the words used ('bad' versus 'awful', for example), and found that since the sentiment map was hand-made, it would succumb to biases if I were to include word strengths; it became apparent that this was a poor classification choice and moving to an automated machine learning approach would work much better.</p>
                <p>As such, I developed a training routine to perform the creation of a similar lexical map. Under the assumption of feature independence I created a naïve Bayes classifier, which uses a set of training data to build a lexical map as before. The advantage of this approach, besides being automatic, is that it only requires the sentiment of each review in the training set, rather than each word — this can be done using the review's "star rating", which we assume to be a ground truth. The sentiment <TeX math="s" /> of a given unseen review is then the max over each sentiment of the product of the probabilities of each word appearing in a review of that sentiment:</p>
                <TeX block math="\text{argmax}_s \left( \prod_i s[\text{word}_i] \right)" />
                <p>(In practice, though, I logged each probability to prevent underflow and gave words new to the classifier a small baseline probability of appearing to prevent the probability being 0 for reviews containing words the system hasn't seen before.)</p> 
            </>
        }
        />
    </>
  )
}