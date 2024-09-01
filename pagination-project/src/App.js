import React, { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import { BsCursor } from "react-icons/bs";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedTodos, setPaginatedTodos] = useState([]);
  // const [isPending, setIsPending] = useState(true);

  let pageSize = 10;
  let pagesNumbers;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((datas) => {
        setTodos(datas);
        let endIndex = pageSize * currentPage;
        let startIndex = endIndex - pageSize;
        let allShownTodos = datas.slice(startIndex, endIndex);
        setPaginatedTodos(allShownTodos);
      });
  }, []);

  const pagesCount = Math.ceil(todos.length / pageSize);
  pagesNumbers = Array.from(Array(pagesCount).keys());
  // coment/////////////////////////////////////////////////////////////////////.......................................
  // این تیکه که جدا کردم خیلی مهم هستش حتما بعدا بهش توجه کن
  useEffect(() => {
    let endIndex = pageSize * currentPage;
    let startIndex = endIndex - pageSize;
    let allShownTodos = todos.slice(startIndex, endIndex);
    setPaginatedTodos(allShownTodos);
  });
  const changePaginate = (newPage) => {
    setCurrentPage(newPage);
  };
  // coment/////////////////////////////////////////////////////////////////....................................

  // let active = 2;
  // let items = [];
  // for (let number = 1; number <= 5; number++) {
  //   items.push(
  //     <Pagination.Item key={number} active={number === active}>
  //       {number}
  //     </Pagination.Item>
  //   );
  // }

  return (
    <div>
      {!todos ? (
        "Loading"
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Title</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {paginatedTodos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.userId}</td>
                <td>{todo.title}</td>
                <td>
                  <p
                    className={
                      todo.completed ? "btn btn-success" : "btn btn-danger"
                    }
                  >
                    {todo.completed ? "Completed" : "Pending"}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <nav className="d-flex justify-content-center">
        <ul className="pagination" aria-current="page">
          {pagesNumbers.map((pageNumber) => (
            <li
              style={{ cursor: "pointer" }}
              className={
                pageNumber + 1 === currentPage
                  ? "page-item  active"
                  : "page-item"
              }
              id=""
              key={pageNumber + 1}
              onClick={() => changePaginate(pageNumber + 1)}
            >
              <span className="page-link">{pageNumber + 1}</span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
