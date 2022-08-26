import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus} from '@fortawesome/free-solid-svg-icons';

const { useState , useEffect } = React;
const AddInputFrom = ({ onAdd }) => {
        const inputItem = onAdd;
        const [data, setData] = useState('');
        const onAddHandle = (e) => {
          e.preventDefault();
          setData('');
          inputItem(data);
        }
        return (
          <div className="todoInput">
            <div className="inputBox">
              <input className="addInput" value={data} onChange={(e) => { setData(e.target.value) }} />
              <a href="#" onClick={onAddHandle}><FontAwesomeIcon icon={faSquarePlus} size="3x" /></a>
            </div>
          </div>
        )
}

export default AddInputFrom;

 