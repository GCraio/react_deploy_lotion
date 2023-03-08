import { useEffect, useState} from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import Layout from "./Layout";


function Note() {
  const [restart] = useOutletContext();
  const routeParams = useParams();
  const pageId = routeParams.id;
  const notesList = JSON.parse(localStorage.getItem("notesList"));
  const note = notesList[pageId];
  const nav = useNavigate();


  const edit = () => {
    nav(`/` + pageId + `/edit`)
  }

  const del = () => {
    const answer = window.confirm("Are you sure?");
    if(answer){
    notesList[parseInt(pageId)] = {id: pageId, title: "deleted", date: "deleted", text: "deleted", show: false};
    localStorage.setItem('notesList', JSON.stringify(notesList));
    restart();
    nav(`..`);
    
    }
  }
  
    const text = note.text

    return (
    <>
    <div id="nHead">
      <div id = "titledate">
      <h2>{note.title}</h2>
      <h6 id="caption">{note.date}</h6>
      </div>
      <div id="editdel">
        <button id="onNote" onClick={edit}>Edit</button>
        <button id="onNote" onClick={del}>Delete</button>
      </div>
    </div>
    <div id="nText">
      <div dangerouslySetInnerHTML = {{__html: text}}></div>
    </div>
    </>
    )
  };
  
  export default Note;