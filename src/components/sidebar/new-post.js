import { useState, React, useContext } from 'react';
import FirebaseContext from '../../context/firebase';
import {Fab, Grid} from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

export default function NewPost({user, handleClose}) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imgPost, setImgPost] = useState('');
    const [imageSrc, setImageSrc] = useState('');
    const { database, storage } = useContext(FirebaseContext);

    const isInvalid = content === '' || title === '';

    const handlePost = async (event) => {
        event.preventDefault();

        var postId = database
            .ref('Posts')
            .push({
                postId: user?.username,
                author: user?.username,
                author_avatar: user?.avatar,
                comment_numbers: 0,
                content: content,
                create_date: Date.now(),
                group: user?.group,
                image_url: imageSrc,
                title: title,
                vote_numbers: 0,
                comments: ''
                })
            .key;
        var postRef = 'Posts/' + postId; 
        database
            .ref(postRef)
            .update({
                postId: postId
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
                { imgPost && <img id="target" className="padding-login" src={imgPost.image}/> }
            </div>

            <input
                type="text"
                placeholder="タイトル"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                onChange={({ target }) => setTitle(target.value)}
                />

            <input
                type="text"
                placeholder="コンテンツ"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                onChange={({ target }) => setContent(target.value)}
                />

            <div>
                <button className={`bg-red-medium text-white w-45 rounded h-8 font-bold ${isInvalid && 'opacity-50'}`}    
                disabled={isInvalid} 
                onClick = {handlePost}> 保存
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
