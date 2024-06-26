import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {

    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context);


  return (
    <div className='main'>
        <div className="nav">
            <p>Gemini </p>
            <img src={assets.user_icon} alt="" />
        </div>

        <div className="main-container">

            {/* if showresult is not true, then it will return greet..
            if it is true then */}


            {/* jab without prompt rahega(showresult=!true) then cards will be shown
            jab prommpt will be passed showresult=true then cards will be hidden and output will be shown in console */}
            {!showResult
            ?<>
                <div className="greet">
                <p><span>Hello, Rohan Nashikkar.</span></p>
                <p>How can I help you today?</p>
            </div>

            <div className="cards">
                <div className="card">
                    <p>Suggest beautiful places to see an upcoming road trip</p>
                    <img src={assets.compass_icon} alt="" />
                </div>

                <div className="card">
                    <p>Breifl summarize this concept: urban planning</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>

                <div className="card">
                    <p>Updates about T20 World Cup 2024</p>
                    <img src={assets.message_icon} alt="" />
                </div>

                <div className="card">
                    <p>Why is Development equally important with DSA</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div>

            
            </>
            :<div className='result'>
                <div className="result-title">
                    <img src={assets.user_icon} alt="" />
                    <p>{recentPrompt}</p>
                </div>

                <div className="result-data">
                    <img src={assets.gemini_icon} alt="" />

                    {/* till the response is not available(loading statue is true) we will show loader */}
                    {loading? 
                    <div className='loader'>
                        <hr />
                        <hr />
                        <hr />
                    </div>
                    :
                    <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                    }
                    </div>

            </div>
            }




            
            <div className="main-bottom">
                <div className="search-box">

                    {/* passing input as question in form of prompt */}
                    <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here'/>
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />

                        {/* passing question and clicking send icon to get answer in console */}
                        {/* when input field is empty then  send icon is hidden, and when input field is filled with prompt(text)then send icon is seen  */}
                       {/* if input data? then all things , if nothing : then null */}
                        {input?<img onClick={()=>onSent()} src={assets.send_icon} alt="" />:null}
                    </div>
                </div>
                <p className="bottom-info">
                Gemini may display inaccurate info, including about people, so double-check its responses.Your privacy and Gemini Apps
                </p>
            </div>
        </div>
    </div>
  )
}

export default Main
