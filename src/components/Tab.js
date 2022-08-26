import React from "react";

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

  export default TodoTabFilter;