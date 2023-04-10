import React from 'react';
import './UserIcon.scss';

const storageUrl = process.env.REACT_APP_STORAGE_URL;

const UserIcon = (props) => {
    const avatar = storageUrl + '/accounts/icons/' + props.src;

    let mode ="";
    if(props.size ==='small')  {
        mode = "is-32x32";
    } else if(props.size ==='medium')  {
        mode = "is-48x48";
    } else if(props.size ==='large')  {
        mode = "is-128x128";
    }

    return(
        <figure class={"userIcon image " + {mode}}>
            <img class={"is-" + props.mode} src={avatar} alt=""/>
        </figure>
    );
}

UserIcon.defaultProps = {
    icon: "empty.jpg",
    size: "medium",
    mode: "rounded" //other props is-round
}

export { UserIcon };
