import React, { useState, useEffect } from "react";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import firebase from "firebase";
import "./styles.css";
import Todo from "./Todo";
import db from "./firebase";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    db.collection("todo").add({
      item: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setTodos([
      ...todos,
      {
        item: input,
        timestamp: { seconds: new Date() },
        id: 1
      }
    ]);
    setInput("");
  };

  useEffect(() => {
    db.collection("todo")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({
            item: doc.data().item,
            timestamp: doc.data().timestamp,
            id: doc.id
          }))
        );
      });
  }, []);

  return (
    <div className="App">
      <form className="app__formControl">
        <FormControl>
          <InputLabel>Enter new todo</InputLabel>
          <Input
            className="app__formInput"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </FormControl>
        <Button
          className="app__formButton"
          variant="contained"
          color="primary"
          disabled={!input}
          type="submit"
          onClick={handleSubmit}>
          Add Todo
        </Button>
      </form>
      {todos.map(({ item, id, timestamp }) => (
        <Todo key={id} id={id} todo={item} date={timestamp?.seconds} />
      ))}
    </div>
  );
}
