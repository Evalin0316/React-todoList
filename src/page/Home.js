import React, { useState,useEffect } from "react";
import Header from "../components/Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faXmark, faPencil,faCheck } from '@fortawesome/free-solid-svg-icons';
import emptyIcon from '../assets/img/todoEmpty.png';
import { addTodo,getTodoList,deleteItem,statusChange,editItem } from '../scripts/api';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'



function Home() {

  const [state, setState] = useState('all');
  const [additems, setAddItem] = useState([]);
  const [edit,setEdit]= useState(false);
  const MySwal = withReactContent(Swal);

  const getList = async() =>{
    let item =  await getTodoList();
    let result = item.data.todos;
    setAddItem(result);
  }

  useEffect(() =>{
    getList()   
  },[]);

  //新增項目method
  const addItem = async(text) => {
    try{ 
      await addTodo({content:text});
      await getList();
    }catch(err){
      // alert('新增失敗');
      MySwal.fire('新增失敗')
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

  //edit狀態
  // const onEditItemHandler = (id) => {
  //   const usedTodo = additems.map((item) => {
  //     if (item.id === id) { //打勾設為ture
  //       return {
  //         id: item.id,
  //         text: item.text,
  //         checked: !item.checked, //ture
  //       };
  //     }
  //     return item;
  //   });
  //   console.log('usedTodo',usedTodo);
  //   setData(usedTodo);
  // };

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
    try{
      await editItem(id,data);
      MySwal.fire({
        position: 'top-end',
        icon: 'success',
        title: '編輯成功',
        showConfirmButton: false,
        timer: 1000
      })
      getList()
    }catch(err){
      MySwal.fire('更新失敗');
    }
    
  
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
    const  [save,setSave] = useState(content);
    const ChangeState = () =>{
      onToggleItem(id)
    }
    const DeleteItem = () =>{
      setDeleteItem(id)
    }

    const onSaveEdit = () =>{
        let data = {'todo':{'content':`${save}`}}
        console.log(id,data);
        seteditItem(id,data);
        setEdit(false);
    }

    const setEditStatus = () =>{
      setEdit(true);
    }

    return (
      <li>
        <label className="todoList_label">
          <input className="todoList_input" type="checkbox" checked={completed_at} onChange={ChangeState}/>
         {edit === false ? <a>{content}</a> : <input  className="todoList_inputText" value={save} onChange={(e) => {setSave(e.target.value) }}/>}
        </label>
        <div className="editItem">
          {edit === false ?
          <div onClick={setEditStatus}><FontAwesomeIcon icon={faPencil} /></div> :
          <div onClick={onSaveEdit}><FontAwesomeIcon icon={faCheck} /></div>
          }
        </div>
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