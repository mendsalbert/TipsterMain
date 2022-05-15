import React, { useState } from 'react';
import { FormControl } from "react-bootstrap";
import { useMoralis } from 'react-moralis';
import Avatar from "./Avatar";

import { Link } from "react-router-dom";

const MessageList = () => {

  const { user } = useMoralis();
  const [dms, setDms] = useState([])
  const [ searchValue, setSearchValue] = useState("");
  
    return (
      <div className="container-fluid bg-white mt-5">
      <div className="row">
      <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '900px' }}>
      <div className="content mr-auto ml-auto">

      <div className="col-lg-12 p-3 m-auto mb-3">
                <div className="d-flex">
                <FormControl
                    type="text"
                    placeholder="Find Friends"
                    className="me-2"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    aria-label="friends"
                    required
                />
                </div>
            </div>

            <div className="col-lg-12 mb-4 mt-5 card" >
              <Link to="/dm">
              <div className="card-header">

                  <Avatar className="mr-2" />

                  {user.getUsername()}
                

                </div>
              </Link>

                </div>
      </div>
      </main>
      </div>
</div>
    );
  }


export default MessageList;