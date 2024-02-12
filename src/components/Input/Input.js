export default function Input(props) {
  return(
    <div className={"input-field col ".concat(props.rootClassname ?? "s12")}>
      <input 
        id={props.id} 
        type={props.type ?? "text"} 
        className={props.inputClassname || ""}
        value={props.value}
        onChange={props.onChange}
        readOnly={props.readOnly}
      />
      <label htmlFor={props.id} className={props.labelClassnames}>{props.label}</label>
    </div>
  )
}