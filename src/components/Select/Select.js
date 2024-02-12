export default function Select(props) {

  return (
    <div className={"input-field col ".concat(props.rootClassname ?? "s12")}>
      <select 
        required 
        onChange={props.onChange} 
        value={!!props.value ? props.value : "DEFAULT"}
      >
        <option value="DEFAULT" disabled>Choose your option</option>
        {props.children}
      </select>
      <label>{props.label}</label>
    </div>
  )
}