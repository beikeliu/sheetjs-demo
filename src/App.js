import { read, utils, writeFileXLSX } from 'xlsx'
import { useState } from 'react';
import Ktable from './Ktable';
const App = () => {
  const [data, setData] = useState([]);
  const [option, setOption] = useState([]);
  const onImport = async (e) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const wb = read(data);
    const ws = wb.Sheets[wb.SheetNames[0]];
    const json = utils.sheet_to_json(ws);
    setData(json);
    setOption(Object.keys(json[0]).map((k) => ({
      title: k,
      in: k,
    })))
  }
  const onExport = () => {
    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws);
    writeFileXLSX(wb, "test.xlsx");
  }
  return (
    <>
      <input type='file' onChange={onImport} onClick={(e) => e.target.value = null} />
      <button onClick={onExport}>导出</button>
      <Ktable rowKey="姓名" data={data} option={option} />
    </>
  )
}
export default App;