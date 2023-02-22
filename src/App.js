import './App.css';
import { unzip } from 'unzipit';
import { BasicTable } from './components/table/BasicTable';
import React, { useReducer, useState } from 'react';


let info = [{"serial":1,"file_name":"DiamId.xls","file_location":"Annaba","size":12}];
info = null;


function App() {
  const [ignored, forceUpdate] = useReducer(x=>x+1, 0);
  const [showResults, setShowResults]=React.useState(false)
  //const [showResults, setShowResults] = useState(false)
  const rows = [1, 2, 3]
  const handleChange = async (event) => {
    info = [{"serial":1,"file_name":"DiamId.xls","file_location":"Annaba","size":12}];

    let results = [];

    //return (<BasicTable/>);
    async function readFiles(url) {
      let entries = null;
      try{
        entries = await (await unzip(url)).entries;
      }catch(err){
        return alert("Not a zip file")
      }
      

      // print all .exe entries
      let count = 0;
      let exes = [];
      
      for (const [name, entry] of Object.entries(entries)) {
        if (name.endsWith('.exe')) {
          count++;
          //console.log(`${count}. ${name}`);
          exes.push(name)
          results.push({serial : count, file_name: name.substring(name.lastIndexOf('/')+1, name.length), file_location: name, size: entry.size})

        }
      }
      console.log('totalFiles:', count);
      console.log('Total FileSize:', `${event.target.files[0].size * 0.000001} MB`)
    }
    await readFiles(event.target.files[0]);
    info = results;
    forceUpdate();
    //alert(info)
    return setShowResults(true);
  };
  return (
    <div className="App">
      <header className="App-header">
        <input accept=".zip" multiple="" type="file" autocomplete="off" id="zipPicker" onChange={handleChange} />
        {showResults? <BasicTable info={info}/> : null}
        </header>
  
    </div>
  );
}

export default App;

{/* <header className="App-header"></header>
        <input accept=".zip" multiple="" type="file" autocomplete="off" id="zipPicker" onChange={handleChange} />

</header> */}
//<BasicTable />


