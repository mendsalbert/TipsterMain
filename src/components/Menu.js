import React, { Component } from 'react';
import photo from '../photo.png';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';

class Menu extends Component {

  render() {
return (
    <div>
            <button className="btn ml-3 bg-white text-dark" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">Menu</button>
         
            <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel"><a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={photo} width="60" height="60" className="d-inline-block align-top" alt="" />
        </a></h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
            <ul>
            <li><a href="/"><FaIcons.FaHome size={50} className='shadow p-3' /> Home</a></li>
            <li><a href="/myprofile"><IoIcons.IoMdPerson size={50} className='shadow p-3' /> My Profile</a></li>
            <li><a href="/explore"><FaIcons.FaSearch size={50} className='shadow p-3' /> Explore</a></li>
            <li><a href="/messagemain"><IoIcons.IoMdChatboxes size={50} className='shadow p-3' /> Messages</a></li>
            </ul>
            </div>
            </div>

    </div>

)
  }
}

export default Menu;