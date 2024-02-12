import { useState } from 'react';
import EditBlock from '../EditBlock/EditBlock';
import { useSelector } from 'react-redux';
import './WordsGrid.scss';
import Translates from '../Translates/Translates';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function WordsGrid(props) {

  const dictionary = useSelector((state) => state.dictionary);

  const [editBlockHidden, setEditBlockHidden] = useState(true);
  const [activeWord, setActiveWord] = useState(null);
  const [editBlockStyle, setEditBlockStyle] = useState({});

  const wordOnClick = (word, elem) => {
    setEditBlockHidden(!editBlockHidden);
    setEditBlockStyle({
      top: elem.offsetTop + elem.offsetHeight,
      left: elem.offsetLeft + (elem.offsetWidth / 2),
      transform: "translateX(-50%)"
    })
    setActiveWord(word);
  }

  const onDialogClose = () => {
    setEditBlockHidden(true);
    setActiveWord(null); 
  }

  const fillGrid = (words) => {
    return words.map((wordInfo, index) => (
      <div 
        key={`word-${index}`} 
        onClick={(event) => wordOnClick(wordInfo, event.currentTarget)}
        className='row'
      >
        <div className="input-field col s12">
          {dictionary[wordInfo._id]}
        </div>
      </div>
    ))
  }

  return(
    <div className="WordsGrid">
      {!!props.words.length && fillGrid(props.words)}
      {!props.words.length && <ErrorMessage>NOT FOUND</ErrorMessage>}
      <EditBlock 
        style = {editBlockStyle} 
        onDialogClose = {onDialogClose}
        isOpen = {!editBlockHidden} 
        toClose = {props.toClose}
      >
        <Translates word = {activeWord} />
        <button className='btn col s12 waves-effect waves-light' onClick={() => props.onEditClick(activeWord._id)}>EDIT</button>
        <button className='btn col s12 waves-effect waves-light red' onClick={() => {
          props.onDeleteClick(activeWord._id);
          setEditBlockHidden(true);
        }}>DELETE</button>
      </EditBlock>
    </div>
  )
}