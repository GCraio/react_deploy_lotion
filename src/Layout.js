import { useEffect, useRef, useState } from "react";
import { Link ,Outlet, useParams, useNavigate } from "react-router-dom";

function Layout() {
    let refresh = true;
    const ref = useRef(null);
    const [list, setList] = useState(true);
    const params = useParams();
    const [notesList, setNotes] = useState(JSON.parse(localStorage.getItem("notesList")));
    const nav = useNavigate();

    useEffect(() => {

        if(refresh){
            refresh = false;
        }
        console.log(refresh);
    });

    const reset = () => {
        refresh = true;
        const content = ref.innerHTML;
        ref.innerHTML = content;
        const updatedList = JSON.parse(localStorage.getItem("notesList"));
        setNotes(updatedList);
    }

    const hideshow = () => {
        if (document.getElementById("list").style.display === "block") {
            document.getElementById("list").style.display = "none"
        }
        else{
            document.getElementById("list").style.display = "block"
        }
        console.log(params);
    }
    const addNote = () => {
        let max = 0;
        const used = notesList.map((note) => (parseInt(note.id)));
        for(let i = 0; i < used.length; i++){
            if(used[i] > max){
                max = used[i];
            }
        }
        const newId = max + 1;
        const newNote = {id: newId.toString(), title:"Untitled", date:"", text:"...", show: true};
        console.log(notesList);
        const tempNotes = [...notesList,newNote];
        setNotes(tempNotes);
        localStorage.setItem('notesList', JSON.stringify(tempNotes));
        nav(`/` + newId + `/edit`);
        document.getElementById("notes").style.display = "block";
        document.getElementById("no_note").style.display = "none";
    }

    return (
    <>
    <div id="header">
        <header>
            <button id="menu" onClick={hideshow}>&#9776;</button>
            <div id="title">
                <h1 id="lotion">Lotion</h1>
                <h6 id="caption">Like Notion, but worse.</h6>
                
            </div>
            <h6 id="spacer"></h6>
        </header>
    </div>
    <div id="content">
        {list ?
        <div id="list">
            <div id="top_list">
                <h3>Notes</h3>
                <button id="add" onClick={addNote}>+</button>
            </div>
            <div id="no_note"><p>No Note Yet</p></div>
            <div id="notes">
                <ul ref={ref}>
                    {notesList.map((note) => (note.show ?
                        <li id="note" className = {(params.id == note.id ? "current" : "not")}>
                        <Link id={note.id} to={"./" + note.id} className = "link">
                            <h4>{note.title}</h4>
                            <h6>{note.date}</h6>
                            <h4 dangerouslySetInnerHTML = {{__html: note.text}}></h4>
                        </Link>
                        </li>
                        :
                        console.log("skipped")
                    ))}
                </ul>
            </div>
        </div>
        : <></>
        }
        <div id="v_feild">
            <Outlet context= {[reset]}/>
        </div>
    </div>
    </>
    )
  };
  
  export default Layout;