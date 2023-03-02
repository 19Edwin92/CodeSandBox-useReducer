import "./styles.css";
import { useReducer, useState } from "react";

const DefaultInfo = {
  count: 1,
  student: [
    {
      id: 1677780408557,
      name: "Edwin",
      isHere: false
    }
  ]
};

const reducer = (state, action) => {
  switch (action.type) {
    case "추가하기":
      action.payload.e.preventDefault();
      const name = action.payload.name;
      const newStudent = { id: Date.now(), name, isHere: false };
      action.payload.setName("");
      return {
        count: state.count + 1,
        student: [...state.student, newStudent]
      };

    case "삭제하기":
      return {
        count: state.count - 1,
        student: state.student.filter((els) => els.id !== action.payload.id)
      };
    default:
      return state;
  }
};

export default function App() {
  const [studentInfo, dispatch] = useReducer(reducer, DefaultInfo);
  const [name, setName] = useState("");

  return (
    <>
      <h2>출석부</h2>
      <p>총 학생 수 : {studentInfo.count} 명</p>
      <form
        onSubmit={(e) => {
          dispatch({ type: "추가하기", payload: { e, name, setName } });
        }}
      >
        <input
          required
          type="text"
          value={name}
          placeholder="이름을 입력하세요"
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onSubmit={(e) => {
            dispatch({ type: "추가하기", payload: { e, name, setName } });
          }}
        >
          추가
        </button>
      </form>
      <div>
        {studentInfo.student.map((el) => {
          const id = el.id;
          return (
            <div key={el.id}>
              <span>{el.name}</span>
              <button
                onClick={() => {
                  dispatch({ type: "삭제하기", payload: { id } });
                }}
              >
                삭제하기
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
