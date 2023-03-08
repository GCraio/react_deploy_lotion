import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams, useNavigate, useOutletContext } from "react-router-dom";

function Edit() {
  const [restart] = useOutletContext();
  
  
  
  const nav = useNavigate();
  const routeParams = useParams();
  const pageId = routeParams.id;
  const notesList = JSON.parse(localStorage.getItem("notesList"));
  const note = notesList[pageId];
  const [value, setValue] = useState(note.text);
  const [intitle, setTitle] = useState(note.title);
  const [indate, setDate] = useState(note.date);

  const del = () => {
    const answer = window.confirm("Are you sure?");
    if(answer){
    notesList[parseInt(pageId)] = {id: pageId, title: intitle, date: indate, text: value, show: false};
    localStorage.setItem('notesList', JSON.stringify(notesList));
    restart();
    nav(`..`);
    }
  }

  const titleChange = (event) => {
    setTitle(event.target.value);
  };

  const dateChange = (event) => {
    setDate(event.target.value);
  };
  const Save = () => {
    notesList[parseInt(pageId)] = {id: pageId, title: intitle, date: indate, text: value, show: true};
    localStorage.setItem('notesList', JSON.stringify(notesList));
    restart();
    nav(`..`);
    nav(`/` + pageId)
  }
  return (
  <>
  <div id="nHead">
      <div id = "titledate">
        <h2><input id="editTitle" onChange={titleChange} type="text" defaultValue={note.title}/></h2>
      <h6 id="caption"><input onChange={dateChange} type="datetime-local" defaultValue={note.date} id= "datePick"/></h6>
      </div>
      <div id="editdel">
        <button id="onNote" onClick={Save}>Save</button>
        <button id="onNote" onClick={del}>Delete</button>
      </div>
    </div>
    <div id="quill">
        <ReactQuill id="box" theme="snow" value = {value} onChange={setValue}/>
    </div>
  </>);
}

export default Edit;