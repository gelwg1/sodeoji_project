import { useContext, useState, useEffect } from 'react';
import React from 'react';
import UserContext from '../../context/user';
import useUser from '../../hooks/use-user';
import FirebaseContext from '../../context/firebase';

export default function Quizz() {
    const { user: loggedInUser } = useContext(UserContext);
    const { user } = useUser(loggedInUser?.uid);
    const [quizz, setQuizz] = useState([]);
    const { database } = useContext(FirebaseContext);

    const handleStop = async (e) => {
        await database.ref('Quizs').child(e.target.value).update({active: 0});
    }
    const handleActive = async (e) => {
        await database.ref('Quizs').child(e.target.value).update({active: 1});
    }

    useEffect(() => {
        async function getQuizz() {
            const snapshot = await database
                .ref('Quizs')
                .once("value");
            var result= [];
            if (snapshot.exists()){
                Object.keys(snapshot.val()).forEach(key => { result.push({
                    id: key,
                    val: snapshot.val()[key]
                })
            });
            setQuizz(result);
            }
        }
        getQuizz();
    }, [quizz]);
    return (
        <div className="m-4 pt-4 rounded bg-white h-screen w-full border-success border flex flex-col items-center sticky">
            
            <div className='m5 row w-90'>
                <div className='col-md-7'>
                    <button type="button" className="btn btn-light border border-dark rounded">新しいクイズを作成</button>
                </div>
                <div className='col-md-5'>
                    <input type="text" class="form-control" id="search_quizz" name="username" placeholder='検索'></input>
                </div>

                <table className="mt-4 table table-hover text-center">
                    <thead>
                        <tr className=''>
                            <th>ID</th>
                            <th>説明</th>
                            <th>時間</th>
                            <th>期日</th>
                            <th>参加者数</th>
                            <th>状態</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {quizz?
                            quizz.map(e=> <>
                                <tr>
                                    <td>{e.id}</td>
                                    <td>{e.val.title}</td>
                                    <td>{e.val.time}</td>
                                    <td>{e.val.end_date}</td>
                                    <td>{Object.keys(e.val.done_user).length}</td>
                                    {e.val.active==1? <td className='text-success'>アクティブ</td>: <td className='text-danger'> ストップ</td>}
                                    <td><button type="button" class="btn btn-danger" onClick={handleStop} value={e.id}>ストップ</button></td>
                                    <td><button type="button" class="btn btn-success" onClick={handleActive} value={e.id}>アクティブ</button></td>
                                </tr>
                            </>)
                        : null}
                    </tbody>
                </table>
                
            </div>
        </div>
    );
}