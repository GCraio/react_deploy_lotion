import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import Layout from "./Layout";
import Note from "./Note";
import Edit from "./Edit";

function App() {
  const data = [{id:"0", title:"Untitled", date:" ", text:"...", show: true}];
  localStorage.setItem('notesList', JSON.stringify(data));
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing/>}></Route>
          <Route path="/:id" element={<Note/>}></Route>
          <Route path="/:id/edit" element={<Edit/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
