import './Button.scss';

export default function Button({ className, onClick, children, ...props }) {
  return (
    <button 
      className={"waves-effect waves-light btn ".concat(className)}
      onClick={onClick}
      {...props}
    >{children}</button>
  )
}