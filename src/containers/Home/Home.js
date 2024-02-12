import { useDispatch, useSelector } from "react-redux";
import { 
  getWordsByDate,
} from "../../redux/dictionary/dictionary";
import { useCallback, useEffect, useMemo, useState } from "react";
import M from 'materialize-css';
import Button from "../../components/Button/Button";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { Link, useLocation, useNavigate } from "react-router-dom";
import EditBlockSection from "../../hoc/EditBlockSection/EditBlockSection";
import DictionarySection from "../../hoc/DictionarySection/DictionarySection";

export default function Home() {

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const linkDate = useMemo(() => {
    return new Date(new URLSearchParams(location.search).get("date") || localStorage.getItem("date") || Date.now());
  }, [location]);
  const [createBlockHidden, setCreateBlockHidden] = useState(true);
  const [wordOnEdit, setWordOnEdit] = useState(false);

  const selectInit = useCallback(() => {
    var selectElems = document.querySelectorAll('select');
    M.FormSelect.init(selectElems);
  }, []);

  useEffect(() => {
    M.updateTextFields();
    selectInit();
  }, [wordOnEdit, selectInit, auth.isAuth]);
  
  const createBlockButtonClick = () => {
    setCreateBlockHidden(false);
  };

  useEffect(() => {
    selectInit();
  }, [selectInit]);

  useEffect(() => {
    dispatch(getWordsByDate({ date: linkDate }));
  }, [dispatch, linkDate]);

  useEffect(() => {
    const localStorageDate = localStorage.getItem("date");
    if(!location.search && localStorageDate) {
      navigate(`?date=${localStorageDate}`);
    }
  }, [location, navigate]);

  return(
    <>
      {auth.isAuth ?
        <>
          <DictionarySection
            wordOnEdit={wordOnEdit}
            setCreateBlockHidden = {setCreateBlockHidden}
            setWordOnEdit = {setWordOnEdit}
            linkDate={linkDate}
          />

          <EditBlockSection 
            wordOnEdit={wordOnEdit} 
            createBlockHidden={createBlockHidden} 
            setCreateBlockHidden={setCreateBlockHidden} 
            setWordOnEdit={setWordOnEdit}
          />

          <Button className={"btn-floating red create-button"} onClick={createBlockButtonClick}>
            <i className="material-icons">add</i>
          </Button>
        </>
      : 
        <ErrorMessage>
          <div>
            Nothing to do
            <Link to={"/auth"}>Authorization</Link>
          </div>
        </ErrorMessage>
      }
    </>
  )
}