import { useState, React, useContext } from 'react';
import FirebaseContext from '../../context/firebase';
import {Fab, Grid} from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

export default function EditPostInfor({content, handleClose}) {
    const [newTitle, setTitle] = useState('');
    const [newContent, setContent] = useState('');
    const [newImgPost, setImgPost] = useState('');
    const [newImageSrc, setImageSrc] = useState('');
    const { database, storage } = useContext(FirebaseContext);

    const isInvalid = newContent === '' || newTitle === '';
   
    const handleUpdate = async (event) => {
        event.preventDefault();
        await database
        .ref('Posts')
        .child(content.key)
        .update({
          content: newContent,
          create_date: Date.now(),
          image_url: newImageSrc,
          title: newTitle,
    });
        window.location.reload();
    };

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
          let reader = new FileReader();
          reader.onload = (e) => {
            setImgPost({image: e.target.result});
          };
          reader.readAsDataURL(event.target.files[0]);
        }
        const file = event.target.files[0];
        const storageRef = storage.ref();
        const fileRef = storageRef.child(`/posts/${file.name}`);
        fileRef.put(file).then(() => {
            fileRef.getDownloadURL().then(function (url) {
                while (url=='')
                    console.log(url);

                setImageSrc(url);
           });
        })
      }

    return (
        <>
        <div className="flex flex-col bg-white p-4 rounded width-post">
            <img src={content.image_url} />
            <div className="p-4 py-5">
                <Grid container justify="center" alignItems="center">
                    <input
                        accept="image/*"
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={onImageChange}
                        hidden={true}
                    />
                    <label htmlFor="contained-button-file">
                    <Fab component="span">
                        <PhotoCamera />
                    </Fab>
                    </label>
                </Grid>
                { newImgPost && <img id="target" className="padding-login" src={newImgPost.image}/> }
            </div>

            <label>
            タイトル:
            <input
                type="text"
                defaultValue={content.title}
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                onChange={({ target }) => setTitle(target.value)}
                />
            </label>
            <label>
            コンテンツ:
            <input
                type="text"
                defaultValue={content.content}
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                onChange={({ target }) => setContent(target.value)}
                />
            </label>
            <div>
                <button className={`bg-red-medium text-white w-45 rounded h-8 font-bold ${isInvalid && 'opacity-50'} `} 
                disabled={isInvalid}
                onClick = {handleUpdate}> 保存
                </button>
                <a className={`pt-1`}> </a>

                <button className={` bg-blue-medium text-white w-45 rounded h-8 font-bold`}     
                onClick={handleClose}
                > キャンセル
                </button>
            </div>   
        </div>
    </>
    );
}
