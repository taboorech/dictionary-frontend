import { Children } from 'react';

export default function Tabs(props) {

  const createTabsPages = () => {
    if(!Array.isArray(props.children)) {
      return <li className={"tab col s12"}><a href={`#${props.children.props.id}`}>{props.children.props.tabName}</a></li>
    }
    return props.children.map((children, index) => (
      <li className={"tab col ".concat("s" + (12 / Children.count(props.children)))} key={`tabs-pages-${index}`}><a href={`#${children.props.id}`}>{children.props.tabName}</a></li>
    ));
  }

  return(
    <div className={"row ".concat(props.className)}>
      <div className="col s12">
        <ul className="tabs">
          {createTabsPages()}
        </ul>
      </div>
      {props.children}
    </div>
  )
}