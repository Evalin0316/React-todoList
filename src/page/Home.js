import React, { useState,useEffect } from "react";
import Header from "../components/Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faXmark, faPencil,faCheck } from '@fortawesome/free-solid-svg-icons';
import emptyIcon from '../assets/img/todoEmpty.png';
import { addTodo,getTodoList,deleteItem,statusChange,editItem } from '../scripts/api';


function Home() {

  const [state, setState] = useState('all');
  const [additems, setAddItem] = useState([]);
  const [edit,setEdit]= useState(false);

  const getList = async() =>{
    let item =  await getTodoList();
    let result = item.data.todos;
    setAddItem(result);
  }

  useEffect(() =>{
    getList()   
  },[]);

  //新增項目methods
  const addItem = async(text) => {
    try{ 
      await addTodo({content:text});
      await getList();
    }catch(err){
      alert('新增失敗');
    }
  };

  //刪除項目method
  const deleteItems = async(text) => {
    await deleteItem(text);
    await getList();
  }

  //分類checked 狀態
  const onToggleItemHandler = async(id) => {
    await statusChange(id);
    await getList();
  }

  //已完成數量
  const dataComplete = (additems.filter((item) => !item.completed_at)).length;
  
  //change tab filter data 
  let tabData = additems.filter(function(x){
      if (state === 'completed') {
        return x.completed_at;
      }
      if (state === 'active') {
        return !x.completed_at
      }
      return true;
    });

  //清除已完成
  const clearComplete = () =>{
    let result = additems.filter((item)=> item.completed_at);
    result.forEach(async(x)=>{
      await deleteItem(x.id);
      getList();
    })
    
    console.log(result)
    // await deleteItem(text);
    // setAddItem(result);
  }

  //編輯項目
  const changeEditItem = async(id,data) =>{  
    await editItem(id,data);
  }

  //新增項目component
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

  //tab component
  const TodoTabFilter = ({ todoState, onFilterChange }) => {
    const filterType = todoState;
    const FilterChange = onFilterChange;

    const activeState = function (type) { //判斷狀態是否被選中
      return filterType === type ? 'active' : '';
    };

    const tab = [
      { state: 'all', title: '全部' },
      { state: 'active', title: '待完成' },
      { state: 'completed', title: '已完成' }
    ];
    return (
      <ul className="tabFilter">
        {tab.map((x, index) => (
          <li key={index}>
            <a
              className={activeState(x.state)}
              onClick={() => FilterChange(x.state)}
            >{x.title}</a>
          </li>
        ))}
      </ul>
    )
  }

  const TodoItem = (props) => {
    const {item,onToggleItem,setDeleteItem,seteditItem} = props;
    const {id,content,completed_at} = item;
    const ChangeState = () =>{
      onToggleItem(id)
    }
    const DeleteItem = () =>{
      setDeleteItem(id)
    }
    const listenEdit = (e) =>{
      e.preventDefault();
      let content = e.target.value;
      console.log(content)
      if(e.code === 'Enter'){
        onEditItem();
        setEdit(false);
      }
    }
    const onEditItem = (e) =>{
        let content = e.target.value;
        let data = {'todo':{'content':`${content}`}}
        console.log(id,data);
        seteditItem(id,data);
    }

    const setEditStatus = () =>{
      setEdit(true);
    }

    return (
      <li>
        <label className="todoList_label">
          <input className="todoList_input" type="checkbox" checked={completed_at} onChange={ChangeState}/>
         {edit === false ? <a>{content}</a> : <input onKeyDown={(e)=>listenEdit(e)} type="text" className="todoList_inputText" value={content} onChange={(e)=>onEditItem(e)}/>}
        </label>
        <a className="editItem">
          {edit === false ?
          <FontAwesomeIcon icon={faPencil} onClick={setEditStatus}/> :
          // <FontAwesomeIcon icon={faCheck}/>
          ''}
        </a>
        <a className="deleteItem" onClick={DeleteItem}>
          <FontAwesomeIcon icon={faXmark} />
        </a>
      </li>
    )
  }



  return (
    <>
      <div className="Container">
        <Header />
        <div className="tabListContent">
          <AddInputFrom onAdd={addItem} />
          {additems.length ?
            <div className="todoList">
              <TodoTabFilter todoState={state} onFilterChange={setState} />
              <div className="todoList_items">
                <ul className="todoList_item">
                  {
                    tabData.map((item, index) => (
                      <TodoItem
                        key={`indexFilter${index}`}
                        item={item}
                        onToggleItem={() => onToggleItemHandler(item.id)}
                        setDeleteItem={deleteItems}
                        seteditItem={changeEditItem}
                      />
                    ))
                  }
                </ul>
                <div className="todoList_complete">
                  <p>{dataComplete} 個待完成項目</p>
                  <p onClick={clearComplete} className="clearAllData">清除已完成項目</p>
                </div>
              </div>
            </div>
              :
            <div className="todoList_empty">
              <div className="todoList_emptyText">目前尚無代辦事項</div>
              <div className="emptyIcon"><img src={emptyIcon} alt="" />
              </div>
            </div>}
        </div>
      </div>
    </>
  );
}

export default Home;