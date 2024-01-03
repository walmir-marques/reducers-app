import { useReducer, useState } from "react";
import "./input.css";
import { listReducer } from "./reducers/list";

function App() {
  const [list, dispatch] = useReducer(listReducer, []);
  const [addField, setAddField] = useState("");

  const handleAddItem = () => {
    if (addField.trim() === "") return false;
    dispatch({
      type: "add",
      payload: {
        text: addField.trim(),
      },
    });

    setAddField("");
  };

  const handleDoneItem = (id) => {
    dispatch({
      type: "toggleDone",
      payload: { id },
    });
  };

  const handleDelItem = (itemID) => {
    if (!window.confirm("Tem certeza que deseja excluir? ")) return false;
    dispatch({
      type: "remove",
      payload: {
        id: itemID,
      },
    });
  };

  const handleEditItem = (id) => {
    const item = list.find((it) => it.id === id);
    if (!item) return false;
    const newText = window.prompt("Editar Tarefa", item.text);
    if (!newText || newText?.trim() === "") return false;

    dispatch({
      type: "editText",
      payload: {
        id,
        newText,
      },
    });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-4xl my-4">Lista de Tarefas</h1>
      <div className="max-w-2xl mx-auto flex rounded-md border border-gray-400 p-4 my-4">
        <input
          className="flex-1 rounded-md border border-black p-3 bg-transparent text-black outline-none"
          type="text"
          placeholder="Digite um item"
          value={addField}
          onChange={(e) => setAddField(e.target.value)}
        />
        <button onClick={handleAddItem} className="p-4">
          Adicionar
        </button>
      </div>
      <ul className="max-w-2xl mx-auto">
        {list.map((item) => (
          <li
            className="flex p-3 my-3 border-b- border-gray-700 items-center"
            key={item.id}
          >
            <input
              type="checkbox"
              className="w-7 h-7 mr-3"
              checked={item.done}
              onClick={() => handleDoneItem(item.id)}
            />
            <p className={`flex-1 text-lg ${item.done ? "line-through" : ""}`}>
              {item.text}
            </p>
            <button
              className="mx-4 text-black hover:text-gray-500"
              onClick={() => handleEditItem(item.id)}
            >
              Editar
            </button>
            <button
              className="mx-4 text-black hover:text-gray-500"
              onClick={() => handleDelItem(item.id)}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
