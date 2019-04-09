import { AUTH_TOKEN, USERNAME } from '../../constants';
import React from 'react';
import {Link,withRouter} from 'react-router-dom';

const authToken = localStorage.getItem(AUTH_TOKEN);

const loginButton = (props) => {
    
return  (<span> 
            <span className ="separator ml1">| </span>
            { authToken ? 
              <button
                    type="button"
                    className="pointer black"
                    onClick={() => { localStorage.removeItem(AUTH_TOKEN);  props.history.push(`/`);}}
                    >
                    Logout {localStorage.getItem(USERNAME)}
                </button> :
                    ( <Link to="/login" className="ml1 no-underline black">
                            Login
                      </Link>
                    )
                }
        </span>)
      
      
}
export default withRouter(loginButton);