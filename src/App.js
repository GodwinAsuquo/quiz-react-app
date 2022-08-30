import React from 'react'
import { useGlobalContext } from './context'

import SetupForm from './SetupForm'
import Loading from './Loading'
import Modal from './Modal'
function App() {
const {waiting, loading, questions, index, correct, nextQuestion, checkAnswer} = useGlobalContext()

  if(waiting){
    return <SetupForm />
  }
  if (loading){
    return <Loading />
  }

  const{question, incorrect_answers, correct_answer, } = questions[index];
  // const answers = [...incorrect_answers, correct_answer]
  let answers = [...incorrect_answers] 
  const tempIndex = Math.floor(Math.random()*4)
  console.log(tempIndex);
  console.log(answers);
  if(tempIndex === 3){
    answers.push(correct_answer)
  } else {
    answers.push(answers[tempIndex])
    answers[tempIndex] = correct_answer
  }
console.log(answers);

  

  //here, we're looking for the item whose index matches the number generated in the tempIndex. Then we add this item to the end of the answers array and then in that spot, I place the correct answer
  return (
  <main>
    <Modal />
      <section className="quiz">
        <p className="correct-answers">
          correct answers : {correct}/{index}
        </p>
        <article className="container">
          <h2 dangerouslySetInnerHTML={{__html: question}}/>
        {/* I'm doing this because the api comes as html and i have to covert it to a string */}
   
        <div className="btn-container">
          {answers.map((answer, index)=>{
        return (<button 
        key={index}
        className='answer-btn'
        onClick={()=>checkAnswer(correct_answer === answer)}
        //here, we are passing in this as an argument to return true or false. If its true, then there is a value but if its false, the theres no value
        dangerouslySetInnerHTML={{__html: answer}}
        />
        )
          })}
        </div>
             </article>
        <button className="next-question" onClick={nextQuestion}>next-question</button>
      </section>
    </main>
    )
} 

export default App
