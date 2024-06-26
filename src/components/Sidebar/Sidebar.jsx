import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = () => {
      // here extended is false ie it is hidden
    //here initally we have set extended to be false so it will give null
  const [extended, setExtended] = useState(false);

  //saving previous prompts in recents
  const {onSet, prevPrompts, setRecentPrompt, newChat} = useContext(Context);

  //to click on recent prompt and to show it on the screen
  const loadPrompt = async (prompt) =>{
    setRecentPrompt(prompt)
    await onSent(prompt)

  }

  return (
    <div className="sidebar">
      <div className="top">
        {/* onclick property here gives if previous is false then it will 
        give not previous(true) */}
        <img onClick={()=>setExtended(prev=>!prev)} className="menu" src={assets.menu_icon} alt="" />
        <div onClick={()=>newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
          {/* if extended is true then new chat will be shown, if false null */}
        </div>

        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {/* passing item at each index */}
            {prevPrompts.map((item,index)=>{
                return (
                    <div key={item} onClick={()=> loadPrompt(item)} className="recent-entry">
                    <img src={assets.message_icon} alt="" />
                    <p>{item.slice(0,18)} ...</p>  
                    {/* it means in recents it stores prompts from index 0 to 18 and not full sentence */}
                  </div>

                )

            })}
        
          </div>
        ) : null}
      </div>

        {/* if extended is true then show text else show null */}
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended?<p>Help</p>:null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended?<p>Activities</p>:null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended?<p>Settings</p>:null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
