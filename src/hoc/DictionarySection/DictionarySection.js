import Form from "../../components/Form/Form";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import WordsGrid from "../../components/WordsGrid/WordsGrid";
import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { 
  changeWord, 
  changeLanguage, 
  changeTranslateWord,
  changeTranslateLanguage, 
  changeTranslateSecondWord, 
  changeTranslateSecondLanguage,
  changeFunction,
  changeSavedWords,
  deleteSavedWord,
  deleteWord,
  getWordsByDate
} from "../../redux/dictionary/dictionary";
import M from "materialize-css";

export default function DictionarySection({ wordOnEdit, setCreateBlockHidden, setWordOnEdit, linkDate }) {

  const dictionary = useSelector((state) => state.dictionary);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const datepickerChangeValue = useCallback((date) => {
    const stringDate = new Date(date).toLocaleDateString('en-CA');
    navigate(`?date=${stringDate}`)
    localStorage.setItem("date", stringDate);
    dispatch(getWordsByDate({ date: new Date(date) }));
  }, [dispatch, navigate]);

  useEffect(() => {
    var datepickers = document.querySelectorAll('.datepicker');
    M.Datepicker.init(
      datepickers, 
      { 
        autoClose: true, 
        onSelect: datepickerChangeValue, 
        setDefaultDate: true, 
        defaultDate: linkDate
      }
    );
  }, [datepickerChangeValue, linkDate]);

  const getWordsList = () => {
    return dictionary.savedWords.filter((wordInfo) => 
      wordInfo.word.includes(dictionary.findByWord ?? "") && 
      (dictionary.findByLanguage ? wordInfo.language === dictionary.findByLanguage : true) &&
      (dictionary.findByTranslate ? !!wordInfo.translate.find(({ translate }) => translate.includes(dictionary.findByTranslate)) : true)
    );
  };

  const changeWords = (id, value) => {
    dispatch(changeSavedWords(
      {
        id: id, 
        value: value
      }
    ));
  };

  const deleteButtonClick = (id) => {
    dispatch(
      deleteWord(
        {
          _id: id
        }
      )
    );

    if(dictionary.error.length === 0) {
      dispatch(deleteSavedWord(id));
    }
  };

  const editButtonClick = (id) => {
    const activeWord = dictionary.savedWords.find(({_id}) => _id === id);

    if(!activeWord) {
      return;
    }

    setWordOnEdit(activeWord);
    dispatch(changeWord(activeWord.word));
    dispatch(changeLanguage(activeWord.language));
    dispatch(changeTranslateWord(activeWord.translate[0].translate));
    dispatch(changeTranslateLanguage(activeWord.translate[0].language));
    dispatch(changeTranslateSecondWord(activeWord.translate[1]?.translate));
    dispatch(changeTranslateSecondLanguage(activeWord.translate[1]?.language));
    setCreateBlockHidden(false);
  };

  return (
    <section>
      <Form title={ "Dictionary" }>
        <Input 
          value={dictionary.findByWord ?? ""}
          label={"Find by word"} 
          id={"findByWord"}
          rootClassname = {"s12"}
          onChange={(event) => dispatch(changeFunction({
            key: "findByWord", 
            value: event.target.value
          }))}
        />
        <Input 
          label={"Find by date"} 
          id={"findByDate"}
          rootClassname = {"s12"}
          inputClassname = {"datepicker"}
        />
        <Select 
          onChange={(event) => dispatch(changeFunction({
            key: "findByLanguage",
            value: event.target.value
          }))}
          label={"Find by language"}
          value={dictionary.findByLanguage ?? "first"}
        >
          <option value="">All</option>
          <option value="ENGLISH">English</option>
          <option value="GERMAN">German</option>
        </Select>
        <Input 
          value={dictionary.findByTranslate ?? ""}
          label={"Find by translate"} 
          id={"findByTranslate"}
          rootClassname = {"s12"}
          onChange={(event) => dispatch(changeFunction({
            key: "findByTranslate", 
            value: event.target.value
          }))}
        />
      </Form>

      <WordsGrid 
        words={getWordsList()} 
        toClose = {wordOnEdit}
        onEditClick={editButtonClick} 
        onWordChange={changeWords}
        onDeleteClick = {deleteButtonClick}
      />
    </section>
  )
}