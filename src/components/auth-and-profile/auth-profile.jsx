import React, {Component} from 'react';
import {Button} from "antd"

class AuthAndProfile extends Component {
  render() { 
    return (
      <React.Fragment>
        <div>
          <Button  ghost>
            Войти
          </Button>
        </div>
        <div>
          <Button type="primary" ghost>
            Регистрация
          </Button>
        </div>
      </React.Fragment>
     );
  }
}
 
export default AuthAndProfile;