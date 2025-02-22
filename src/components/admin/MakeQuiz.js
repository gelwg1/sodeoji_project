import { useState, Fragment, React, useContext, useEffect } from 'react';
import FirebaseContext from '../../context/firebase';
import useUser from '../../hooks/use-user';
import UserContext from '../../context/user';
import { KeyboardDatePicker, MuiPickersUtilsProvider  } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';


export default function MakeQuiz({ type, post, handleClose }) {
    const { user: loggedInUser } = useContext(UserContext);
    const { user } = useUser(loggedInUser?.uid);
    const [title, setTitle] = useState('');
    const [time, setTime] = useState('');
    // const [imgPost, setImgPost] = useState('');
    const [score, setScore] = useState('');
    const [active, setActive] = useState(1);
    const [content, setContent] = useState('');
    const { database, storage } = useContext(FirebaseContext);
    const [selectedDate, handleDateChange] = useState(new Date());
    const today = new Date();
    
    function convertDate(date){
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = date.getFullYear();

        date = yyyy + '/' + mm + '/' + dd;
        return date;
    }

    const inputArr = [
        {
          type: "text"
        }
      ];
    const [arr, setArr] = useState(inputArr);

    const addInput = () => {
        setArr(s => {
            return [
            ...s,
            {
                type: "text"
            }
            ];
        });
    };

    const handleChange = e => {
        e.preventDefault();

        const index = e.target.id;
        setArr(s => {
            const newArr = s.slice();
            newArr[index].value = e.target.value;

            return newArr;
        });
    };
    const isInvalid = content === '' && title === '';

    // useEffect(() => {
    //     if (post) {
    //         setTitle(post.title);
    //         setContent(post.content);
    //         setImgSrc(post.image_url);
    //         setFileSrc(post.file_url);
    //         setFileName(post.file_name);
    //     }
    // }, [])

    const handleUpdate = async (event) => {
        // event.preventDefault();
        // await database
        //     .ref('Posts')
        //     .child(post.key)
        //     .update({
        //         content: content,
        //         create_date: Date.now(),
        //         image_url: imgSrc,
        //         file_name: fileName,
        //         file_url: fileSrc,
        //         title: title,
        //     });
        // window.location.reload();
    };

    const handlePost = async (event) => {
        console.log('title:', title);
        console.log('time: ', time);
        console.log('score: ', score);
        console.log('active: ', active);
        console.log('deadline: ', convertDate(selectedDate));
        event.preventDefault();

        await database
        .ref('Quizs')
        .push({
            active: active,
            content: content,
            create_date: convertDate(today),
            done_user: '',
            end_date: convertDate(selectedDate),
            score: score,
            time: time,
            title: title
        })
        
        handleClose();
        // var postId = database
        //     .ref('Posts')
        //     .push({
        //         postId: user?.username,
        //         author: user?.username,
        //         author_avatar: user?.avatar,
        //         content: content,
        //         create_date: Date.now(),
        //         group: user?.group,
        //         image_url: imgSrc,
        //         file_name: fileName,
        //         file_url: fileSrc,
        //         title: title,
        //         vote_numbers: 0
        //     })
        //     .key;
        // var postRef = 'Posts/' + postId;
        // database
        //     .ref(postRef)
        //     .update({
        //         postId: postId
        //     });
        // window.location.reload();
    };

    

    

    const handleCloseEvent =  () => {
        handleClose();
    };

    return (
        <>
            <div className="flex flex-col w-full item-center bg-white p-4 rounded width-post">
                <label>
                    タイトル:
                    <input
                        type="text"
                        className="form-control text-sm text-gray-base w-full mr-3  px-4  border border-gray-primary rounded mb-2"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </label>
                <div>
                <label>
                    時間:
                    <input
                        type="text"
                        className="form-control text-sm text-gray-base w-50 mr-3  px-4  border border-gray-primary rounded mb-2"
                        onChange={({ target }) => setTime(target.value)}
                    />
                </label>
                <label>
                    クイズの点数:
                    <input
                        type="text"
                        className="form-control text-sm text-gray-base w-50 mr-3  px-4  border border-gray-primary rounded mb-2"
                        onChange={({ target }) => setScore(target.value)}
                    />
                </label>
                <label>
                    状態:
                    <select class="form-select" aria-label="Default select example" onChange={({ target }) => setActive(target.value)}>
                    <option selected value="1" className='text-success'>アクティブ</option>
                    <option value="0" className='text-danger'>ストップ</option>
                    </select>
                </label>
                
                </div>
                <label>
                    期日:
                    <br className='mb-2'/>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            autoOk
                            variant="inline"
                            inputVariant="outlined"
                            format="MM/dd/yyyy"
                            value={selectedDate}
                            InputAdornmentProps={{ position: "start" }}
                            onChange={date => handleDateChange(date)}
                            className="my-2"
                        />
                    </MuiPickersUtilsProvider>
                </label>
                    {arr.map((item, i) => {
                        return (
                            <>
                            <hr className='mb-2'/>
                            <label>
                                タイトル:
                                <input
                                    type="text"
                                    className="form-control text-sm text-gray-base w-full mr-3  px-4  border border-gray-primary rounded mb-2"
                                    onChange={({ target }) => setTitle(target.value)}
                                />
                            </label>
                            <div className='flex flex-row'>
                                <div className='col-md-4 '>
                                    <label>
                                        A:
                                        <input
                                            type="text"
                                            className="form-control text-sm text-gray-base w-full mr-3  px-4  border border-gray-primary rounded mb-2"
                                            onChange={({ target }) => setTime(target.value)}
                                        />
                                    </label>
                                </div>
                                <div className='col-md-4 '>
                                    <label>
                                        B:
                                        <input
                                            type="text"
                                            className="form-control text-sm text-gray-base w-full mr-3  px-4  border border-gray-primary rounded mb-2"
                                            onChange={({ target }) => setTime(target.value)}
                                        />
                                    </label>
                                </div>
                                <div className='col-md-4 '>
                                    <label>
                                        C:
                                        <input
                                            type="text"
                                            className="form-control text-sm text-gray-base w-full mr-3  px-4  border border-gray-primary rounded mb-2"
                                            onChange={({ target }) => setTime(target.value)}
                                        />
                                    </label>
                                </div>
                            </div>
                            <label>
                                説明:
                                <textarea
                                    defaultValue={content}
                                    className="form-controltext-sm text-gray-base w-full mr-3 p-4 h-20 border border-gray-primary rounded mb-2"
                                    onChange={({ target }) => setContent(target.value)}
                                />
                            </label>
                            </>
                        );
                    })}
                    
                    <button type="button" className='btn btn-primary w-20 mb-3' onClick={addInput}>クイズを追加</button>
                
                <div>
                    <button className={`bg-green-medium text-white w-45 rounded h-8 font-bold ${isInvalid && 'opacity-50'} `}
                        disabled={isInvalid}
                        onClick={type === "編集" ? (handleUpdate) : (handlePost)}> {type}
                    </button>
                    <a className={`pt-1`}> </a>

                    <button className={`bg-red-medium text-white w-45 rounded h-8 font-bold`}
                        onClick={handleCloseEvent}
                    > キャンセル
                    </button>
                </div>
            </div>
        </>
    );
}
