import React from 'react'
import { Link } from 'react-router-dom'

//
class Navbar extends React.Component {
  render(){
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">React-Idx-Kuc</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" >
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <Link to="/" className="nav-link">Home</Link>                    
                </li>
                <li className="nav-item active">
                    <Link to="/book" className="nav-link">Book</Link>                    
                </li>                
                <li className="nav-item active">
                    <Link to="/task" className="nav-link">Task</Link>                    
                </li>
            </ul>
			<ul className="navbar-nav">
				<li className="nav-item">
                    <Link to="/about" className="nav-link">About
                    </Link>                    
				</li>
			</ul>            
        </div>
        <hr />
    </nav>        

    )
  }
}
//
export default Navbar;

