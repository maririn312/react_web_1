import React from 'react';
import UserIcon from '../UserIcon';
import './UserRow.css';

const UserRow = (props) => {
    // const [isHover, setHover] = useState(false);
    // const { app, email, name, icon } = props;

    // const handleHover = (e) => {
    //     setHover(!isHover);
    // };

    return(
        <div key={props.id} className="userRow">
            <UserIcon src ={props.id + '.jpg'} />
            <div className="userInfo">
                <div className="name">{ props.user_name }</div>
                <div className="email">{ props.email }</div>
            </div>
        </div>
    );
}

UserRow.defaultProps = {
    id: 1,
    icon: null,
    user_name: "Г.Баасансүрэн",
    email: "baaska0316@gmail.com"
}

export { UserRow };
