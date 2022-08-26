import React, { useState,useEffect, useContext } from "react";
import Header from "../components/Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPencil,faCheck,faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';
import emptyIcon from '../assets/img/todoEmpty.png';
import { addTodo,getTodoList,deleteItem,statusChange,editItem } from '../scripts/api';
import  { ThemeContext }  from '../scripts/theme';
import toast, { Toaster } from 'react-hot-toast';
import AddInputFrom from "../components/InputForm";
import TodoTabFilter from "../components/Tab";



function Home() {

  const [state, setState] = useState('all');
  const [additems, setAddItem] = useState([]);
  const theme = useContext(ThemeContext);

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
      // const newData = {
      //   id: new Date().getTime().toString(),
      //   content:text,
      //   checked: false,
      // };
      // setAddItem((item)=>{
      //   console.log(item)
      //   return item.concat(newData);
      // })
      toast.success('新增成功');
      getList();
    }catch(err){
      toast.error('新增失敗')
    }
  };

  //刪除項目method
  const deleteItems = async(id) => {
    try{
      await deleteItem(id);
      const newData = additems.filter((item)=>item.id !== id);
      setAddItem(newData);
      toast.success('刪除成功');
    }catch{
      toast.error('刪除失敗')
    }
    
  }

  //分類checked 狀態
  const onToggleItemHandler = async(id) => {
    const res = await statusChange(id);
    const updataStatus  = res.data.completed_at;
    setAddItem((pre)=>{
      const newData=[...pre];
      newData.filter(todo =>{
        if(todo.id === id){
          todo.completed_at = updataStatus;
          return todo;
        }
      });
      return newData;
    })
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
  }

  //編輯項目
  const changeEditItem = async(id,data) =>{  
    try{
      await editItem(id,data);
      toast.success('編輯成功')
    }catch(err){
      toast.error("更新失敗")
    }
    
  
  }

  //TodoList components
  const TodoItem = (props) => {
    const {item,onToggleItem,setDeleteItem,seteditItem} = props;
    const {id,content,completed_at} = item;
    const [save,setSave] = useState(content);
    const [edit,setEdit]= useState(false);
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
        setAddItem((pre)=>{
          const newData=[...pre];
          newData.filter(todo=>{
            if(todo.id === id){
              todo.content = save;
              return todo;
            }
          });
          return newData;
        })
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

  const ThemeButton = () =>{
    const {toggleTheme} = useContext(ThemeContext)
    return <button className="modeButton" onClick={toggleTheme}><FontAwesomeIcon icon={faCircleHalfStroke} size="2x" /></button>
  }

  return (
    <>
      <div className="Container" style={{backgroundImage:theme.theme.background}}>
        <Header />
       <div className="modeTheme"><ThemeButton/></div> 
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
      <Toaster
      position="top-center"
      reverseOrder={false}
      />
    </>
  );
}

export default Home;