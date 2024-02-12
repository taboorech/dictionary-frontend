import './Translates.scss';

export default function Translates(props) {

  const createTranslate = (word) => {
    return word.translate.map((translate, index) => (
      <div className='translate' key={`edit-translate-${index}`}>
        <div className='language'>{translate.language}</div>
        <div className='translatedWord'>{translate.translate}</div>
      </div>
    ));
  }

  return (
    <div className='Translates'>
      <div className='originalLanguage'>
        {props.word?.language}
      </div>
      {props.word && createTranslate(props.word)}
    </div>
  )
}