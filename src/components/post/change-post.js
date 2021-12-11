import { useState, React, useContext, useEffect } from 'react';
import FirebaseContext from '../../context/firebase';
import { Fab, Grid } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import useUser from '../../hooks/use-user';
import UserContext from '../../context/user';

export default function ChangePost({ type, post, handleClose }) {
    const { user: loggedInUser } = useContext(UserContext);
    const { user } = useUser(loggedInUser?.uid);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    // const [imgPost, setImgPost] = useState('');
    const [imgSrc, setImgSrc] = useState('');
    const { database, storage } = useContext(FirebaseContext);

    const isInvalid = content === '' && title === '';

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setContent(post.content);
            setImgSrc(post.image_url);
        }
    }, [])

    const handleUpdate = async (event) => {
        event.preventDefault();
        await database
            .ref('Posts')
            .child(post.key)
            .update({
                content: content,
                create_date: Date.now(),
                image_url: imgSrc,
                title: title,
            });
        window.location.reload();
    };

    const handlePost = async (event) => {
        event.preventDefault();

        var postId = database
            .ref('Posts')
            .push({
                postId: user?.username,
                author: user?.username,
                author_avatar: user?.avatar,
                content: content,
                create_date: Date.now(),
                group: user?.group,
                image_url: imgSrc,
                title: title,
                vote_numbers: 0
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

        // console.log(event.target.files.length);
        if (event.target.files && event.target.files[event.target.files.length - 1]) {
            let reader = new FileReader();
            // reader.onload = (e) => {
            //     setImgPost({ image: e.target.result });
            // };
            reader.readAsDataURL(event.target.files[event.target.files.length - 1]);
            const file = event.target.files[event.target.files.length - 1];
            const storageRef = storage.ref();
            let urlName = Date.now() + file.name;
            const fileRef = storageRef.child(`/avatars/${urlName}`);
            fileRef.put(file).then(() => {
                fileRef.getDownloadURL().then(function (url) {
                    setImgSrc(url);
                });
            })
        }
    }

    return (
        <>
            <div className="flex flex-col bg-white p-4 rounded width-post">
                <div className="p-4 py-5">
                    <Grid container justifyContent="center" alignItems="center">
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
                    {imgSrc && <img id="target" className="padding-login" src={imgSrc} alt="" />}
                </div>

                <label>
                    タイトル:
                    <input
                        type="text"
                        defaultValue={title}
                        className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </label>
                <label>
                    コンテンツ:
                    <textarea
                        defaultValue={content}
                        className="text-sm text-gray-base w-full mr-3 p-4 h-40 border border-gray-primary rounded mb-2"
                        onChange={({ target }) => setContent(target.value)}
                    />
                </label>
                <div>
                    <button className={`bg-red-medium text-white w-45 rounded h-8 font-bold ${isInvalid && 'opacity-50'} `}
                        disabled={isInvalid}
                        onClick={type === "編集" ? (handleUpdate) : (handlePost)}> {type}
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
