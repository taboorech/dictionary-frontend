import { Fragment } from 'react';
import './Layout.scss';
import Navbar from '../../components/Navbar/Navbar';

export default function Layout(props) {
  return(
    <>
      <Navbar/>
      <main className="Layout">
        { props.children }
      </main>
    </>
  )
}