import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import ImageUploader from 'react-images-upload';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import './PopUp.scss';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: 640,
        },
    },
    button: {
        marginLeft: 15
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    }
}));

const PopUp = (props) => {

    const styles = {
        width: props.width,
        height: props.height,
        overflowY: "scroll"
    };
    const classes = useStyles();

    const [title, setTitle] = useState();
    const [intro, setIntro] = useState();
    const [catId, setCategory] = useState(0);
    const [special, setSpecial] = useState(0);
    const [images, setImages] = useState([]);
    const [imageBase64, convertImage] = useState();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const handleUpload = (images) => {
        setImages(images);
        convertBase64(images[0], convertImage);
    };

    const handleInput1Change = (event) => {
        setTitle(event.target.value);
    };

    const handleInput2Change = (event) => {
        setIntro(event.target.value);
    };

    const handleCatChange = (event) => {
        console.log(event.target.value);
        setCategory(event.target.value);
    }

    const handleSwitchChange = (event) => {
        setSpecial(!special);
    };

    const handleEditorChange = (editorState) => {
        setEditorState(editorState);
        console.log(editorState);
    }

    const save = () => {
        const datas = {
            title: title,
            intro: intro,
            catId: catId,
            special: special,
            image: imageBase64,
            editorRaw: convertToRaw(editorState.getCurrentContent())
        };
        props.onSave(datas);
    };

    const convertBase64 = (file, cb) => {
        // console.log('convert image');
        console.log(file);
        let reader = new FileReader();
        reader.readAsDataURL(file);
        // const url = reader.readAsDataURL(file.name);
        console.log(reader);
        reader.onloadend = () => {
            cb(reader.result);
        };
        reader.onerror = (error) => {
            console.log('Error: ', error);
        };
    }

    return (
        <div className="disabler">
            <div className='PopUp'>
                <div className='container'>
                    <div className='popUpHeader'>
                        <div className="title">{ props.title }</div>
                    </div>
                    <div className='mainBox' style={styles}>
                        <form className={classes.root} noValidate autoComplete="off">
                            <Input
                                value={title}
                                onChange ={handleInput1Change}
                                placeholder="Гарчиг"
                                inputProps={{ 'aria-label': 'title' }}
                            />
                            <FormControl className={classes.formControl}>
                                <InputLabel id="category">Ангилал</InputLabel>
                                <Select
                                    labelId="category"
                                    value={catId}
                                    onChange={handleCatChange}
                                >
                                    <MenuItem value={1}>Сovid 19</MenuItem>
                                    <MenuItem value={2}>Улс төр</MenuItem>
                                    <MenuItem value={3}>Нийгэм</MenuItem>
                                    <MenuItem value={4}>Эдийн засаг</MenuItem>
                                    <MenuItem value={5}>Боловсрол</MenuItem>
                                    <MenuItem value={6}>Эрүүл мэнд</MenuItem>
                                    <MenuItem value={7}>Технологи</MenuItem>
                                    <MenuItem value={8}>Спорт</MenuItem>
                                    <MenuItem value={9}>Дэлхийд</MenuItem>
                                </Select>
                            </FormControl>
                            <Input
                                value={intro}
                                placeholder="Товч тайлбар"
                                onChange ={handleInput2Change}
                            />
                        </form>
                        <FormControlLabel
                            control ={
                                <Switch checked={special} onChange={handleSwitchChange} />
                            }
                            label="Онцлох эсэх"
                        />
                        {
                            images.map(image => {
                                return <img width="760" src={URL.createObjectURL(image)} alt=""/>
                            })
                        }
                        <ImageUploader
                            withIcon={false}
                            buttonText='Зураг ачааллах'
                            onChange={handleUpload}
                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                            maxFileSize={5242880}
                        />
                        <Editor
                            editorState={editorState}
                            toolbarClassName="toolbar"
                            wrapperClassName="wrapper"
                            editorClassName="editor"
                            hashtag={{
                                separator: ' ',
                                trigger: '#',
                            }}
                            onEditorStateChange={handleEditorChange}
                        />
                    </div>
                    <div className='popUpFooter'>
                        <div className="buttons">
                            <Button
                                variant="contained"
                                className={classes.button}
                                color="primary"
                                onClick ={save}
                            >
                                Хадгалах
                            </Button>
                            <Button
                                onClick={props.onClose}
                                variant="contained"
                                className={classes.button}
                                color="primary"
                            >
                                Хаах
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

PopUp.defaultProps = {
    width: 800,
    height: 350,
    title: 'Мэдээ нэмэх',
    onSave: () => {console.log('on save not function')},
    onClose: () => {console.log('on close not function')}
}

export { PopUp };
