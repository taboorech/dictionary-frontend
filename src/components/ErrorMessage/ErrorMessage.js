import './ErrorMessage.scss';

export default function ErrorMessage({ children }) {
  return (
    <section className={"ErrorMessage"}>
      {children}
    </section>
  )
}