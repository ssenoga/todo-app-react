import React, { useState } from "react";
import {
  List,
  ListItemText,
  ListItem,
  Button,
  ButtonGroup,
  Modal,
  Input
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import moment from "moment";

import db from "./firebase";

import { toDateTime } from "./util";

export default function Todo({ todo, id, date }) {
  const dr = moment(toDateTime(date)).format("MMMM Do YYYY, h:mm:ss a");
  // const fr = moment(toDateTime(date))
  //   .startOf("hour")
  //   .fromNow();
  const [showDelete, setShowDelete] = useState(false);
  const [modal, setModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [input, setInput] = useState("");

  const handleMouseEnter = () => {
    setShowDelete(true);
  };
  const handleMouseLeave = () => {
    setShowDelete(false);
  };

  const handleDeleteClick = () => {
    setIsDelete(true);
    handleOpen();
  };

  const handleClose = () => {
    setModal(false);
  };
  const handleOpen = () => {
    setModal(true);
  };

  const handleUpdate = () => {
    db.collection("todo")
      .doc(id)
      .set({ item: input }, { merge: true });
    handleClose();
  };

  const handleDelete = () => {
    db.collection("todo")
      .doc(id)
      .delete();
    handleClose();
  };

  const deleteData = (
    <>
      <h2>Are yyou sure you want to delete?</h2>
      <hr />
      <div className="app__ModalButtons">
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            setModal(false);
            setIsDelete(false);
          }}
        >
          No
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDelete}>
          Yes
        </Button>
      </div>
    </>
  );

  const editData = (
    <>
      <h2>You are editing your Activity</h2>
      <hr />
      <Input
        placeholder={todo}
        variant="outlined"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <div className="app__ModalButtons">
        <Button variant="outlined" color="default" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Update
        </Button>
      </div>
    </>
  );

  return (
    <>
      <Modal open={modal} onClose={handleClose} className="app__modal">
        <div className="app__modalDiv">{isDelete ? deleteData : editData}</div>
      </Modal>
      <List
        className="app__list"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <ListItem className="app__todo">
          <ListItemText primary={todo} secondary={`${dr}`} />
          {showDelete && (
            <ButtonGroup className="app__btngrp">
              <Button onClick={handleOpen}>
                <EditIcon />
              </Button>
              <Button onClick={handleDeleteClick}>
                <DeleteForeverIcon />
              </Button>
            </ButtonGroup>
          )}
        </ListItem>
      </List>
    </>
  );
}
