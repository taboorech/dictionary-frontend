import EditBlock from "../../components/EditBlock/EditBlock";
import Form from "../../components/Form/Form";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import Button from "../../components/Button/Button";
import { 
  changeWord,
  changeLanguage,
  changeTranslateWord,
  changeTranslateLanguage,
  changeTranslateSecondWord,
  changeTranslateSecondLanguage,
  createWord,  
  updateWord
} from "../../redux/dictionary/dictionary";
import M from "materialize-css";
import { useSelector, useDispatch } from "react-redux";

export default function EditBlockSection({ createBlockHidden, setCreateBlockHidden, wordOnEdit, setWordOnEdit }) {

  const dictionary = useSelector((state) => state.dictionary);
  const dispatch = useDispatch();

  const createButtonClick = () => {
    const data = {
      _id: wordOnEdit._id,
      word: dictionary.word,
      language: dictionary.language,
      translate: [
        {
          language: dictionary.translateLanguage,
          translate: dictionary.translateWord
        }
      ]
    };

    if(!!dictionary.translateSecondWord && !!dictionary.translateSecondLanguage) {
      data.translate.push({
        language: dictionary.translateSecondLanguage,
        translate: dictionary.translateSecondWord
      });
    }
    
    if(wordOnEdit) {
      return dispatch(updateWord(data))
    }
    dispatch(createWord(data));

    M.updateTextFields();
  };

  const onEditBlockClose = () => {
    if(wordOnEdit) {
      setWordOnEdit(false);
      dispatch(changeWord(""));
      dispatch(changeLanguage(null));
      dispatch(changeTranslateWord(""));
      dispatch(changeTranslateLanguage(null));
      dispatch(changeTranslateSecondWord(null));
      dispatch(changeTranslateSecondLanguage(null));
    };
    setCreateBlockHidden(true);
  };

  return(
    <section>
      <EditBlock 
        isOpen = {!createBlockHidden} 
        className = {"left"}
        onDialogClose = {onEditBlockClose}
      >
        <Form>
          <h6>Create word</h6>
          <Input 
            value={dictionary.word}
            label={"Word"} 
            id={"word"}
            rootClassname = {"s12"}
            onChange={(event) => dispatch(changeWord(event.target.value))}
          />
          <Select 
            onChange={(event) => dispatch(changeLanguage(event.target.value))}
            value={dictionary.language}
            label={"Language"}
          >
            <option value="ENGLISH">English</option>
            <option value="GERMAN">German</option>
          </Select>

          <Input 
            value={dictionary.translateWord}
            label={"Translate"} 
            id={"translate"}
            rootClassname = {"s12"}
            onChange={(event) => dispatch(changeTranslateWord(event.target.value))}
          />
          <Select onChange={(event) => dispatch(changeTranslateLanguage(event.target.value))} label={"First language"}>
            <option value="UKRAINIAN">Ukrainian</option>
            <option value="RUSSIAN">Russian</option>
          </Select>

          <Input 
            value={dictionary.translateSecondWord}
            label={"Translate"} 
            id={"translate"}
            rootClassname = {"s12"}
            onChange={(event) => dispatch(changeTranslateSecondWord(event.target.value))}
          />
          <Select onChange={(event) => dispatch(changeTranslateSecondLanguage(event.target.value))} label={"Second language"}>
            <option value="UKRAINIAN">Ukrainian</option>
            <option value="RUSSIAN">Russian</option>
          </Select>
          
          <Button
            className={"col s4 offset-s4"}
            onClick={createButtonClick}
          >
            {wordOnEdit ? "Update" : "Create"}
          </Button>
        </Form>
      </EditBlock>
    </section>
  )
}