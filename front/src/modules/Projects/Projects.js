import React from 'react';
import Tag from '../../components/Tag';

const Projects = (props) => {
    return (
        <div className="projects-container">
            my projects
            <Tag name="Миний төслүүд" delete={true}/>
            <Tag name="Онцлох" size="large" color="danger"/>
            <Tag name="Гадаад төслүүд" color="dark"/>
        </div>
    );
}

export { Projects };
