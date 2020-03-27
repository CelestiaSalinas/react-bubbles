import React, { useState } from "react";
import axios from "axios";
import axiosWithAuth from "../utils/axiosWithAuth";
import styled from 'styled-components'


const Input = styled.input`
  font-size: 18px;
  padding: 10px;
  background: papayawhip;
  border: none;
  display: flex;
  flex-direction: column;
  align-content: center;
  background-color: #D9C2ED;
  width: 80%;
  margin: 0 auto;
  border-radius: 5px;
  }
`;

const Label = styled.label`
font-size: 20px;
padding: 30px;
margin: 0 auto;
`

const Button = styled.button`
  cursor: pointer;
  background: transparent;
  font-size: 16px;
  border-radius: 3px;
  color: #431070;
  border: 2px solid #431070;
  margin: 0 1em;
  padding: 0.25em 1em;
  transition: 0.5s all ease-out;
  margin:30px;
  &:hover {
    background-color: #8b3ad6;
    color: white;
  }`

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState({
    color: "",
    code: { hex: "" }
  })

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is it saved right now?

    axiosWithAuth()
    .put(`/api/colors/${colorToEdit}`, colorToEdit)
    .then(res => {
      let colorArray = colors.filter(color => color.id !== res.data.id);
      updateColors([...colorArray, res.data]);
      setEditing(false)
    })
    .catch(error => console.log(error.res))
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
    .delete(`/api/colors/${color.id}`)
    .then(() => {
      updateColors(colors.filter(colorThingy => colorThingy.id !== color.id))
      setEditing(false)
    })
  };

  const addNewColor = e => {
    e.preventDefault()
    axiosWithAuth()
      .post('/api/colors', newColor)
      .then(() => {
        axiosWithAuth()
          .get('/api/colors')
          .then(res => updateColors(res.data))
      })
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <div className='add'>
        <form onSubmit={addNewColor}>
          <Input
            type='text'
            name='color'
            placeholder='add a new color'
            onChange={e => {
              setNewColor({ ...newColor, color: e.target.value })
            }}
          />
          <Input
            type='text'
            name='hex'
            placeholder='add a new color'
            onChange={e => {
              setNewColor({ ...newColor, code: { hex: e.target.value } })
            }}
          />
          <div className="button-row">
            <Button type="submit">add color</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ColorList;
