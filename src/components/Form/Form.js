export default function Form({ id, title, children }) {

  const onSubmit = (event) => {
    event.preventDefault();
  }

  return(
    <div className="row" id={ id }>
      <form className="col s12" onSubmit={onSubmit}>
        <h5>{ title }</h5>
        { children }
      </form>
    </div>
  )
}