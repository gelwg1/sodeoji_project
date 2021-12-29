import { useEffect, useState, useContext } from 'react';
import useUser from '../../hooks/use-user';
import UserContext from '../../context/user';

export default function QuizRank({ doneUser }) {
    const { user: loggedInUser } = useContext(UserContext);
    const { user } = useUser(loggedInUser?.uid);
    const [data, setData] = useState();
    const [myData, setMyData] = useState();

    useEffect(() => {
        var doneUserTop3Arr = [];

        Object.keys(doneUser).map((key) => {
            var item = doneUser[key];
            item.user_name = key;

            doneUserTop3Arr.push(item);
        });
        doneUserTop3Arr.sort((a, b) => {
            if (b.result !== a.result) return b.result - a.result;
            if (b.time !== a.time) return a.time - b.time;
            return a.user_name - b.username
        });
        setData(doneUserTop3Arr.slice(0, 3));
        console.log(doneUserTop3Arr.length);
        if (doneUser[`${user?.username}`]) {
            setMyData(doneUser[`${user?.username}`]);
        }
        // console.log(doneUser);
        // console.log(data);
        // console.log(myData);
    }, []);

    return (
        <div className="p-4 pt-2 pb-1 flex flex-col items-center w-full">
            <p className="font-bold text-black-light text-2xl" >
                上位の結果：
            </p>
            <div className='grid grid-ranking w-full justify-between'>
                <div>名前</div>
                <div className='text-center'>正解</div>
                <div className='text-center'>時間</div>
                <div className='text-end'>合計ポイント</div>
                {data && data?.length !== 0 ? (
                    data.map((doneUser) => {
                        return (
                            <>
                                <div>{doneUser.user_name}</div>
                                <div className='text-center'>{doneUser.corrected}</div>
                                <div className='text-center'>{doneUser.time}</div>
                                <div className='text-end'>{doneUser.result}</div>
                            </>
                        )
                    })
                ) : null}
                {data && data?.length === 2 ? (
                    <>
                        <div>-</div>
                        <div className='text-center'>-</div>
                        <div className='text-center'>-</div>
                        <div className='text-end'>-</div>
                    </>
                ) : data && data?.length === 1 ? (
                    <>
                        <div>-</div>
                        <div className='text-center'>-</div>
                        <div className='text-center'>-</div>
                        <div className='text-end'>-</div>
                        <div>-</div>
                        <div className='text-center'>-</div>
                        <div className='text-center'>-</div>
                        <div className='text-end'>-</div>
                    </>
                ) : data && data?.length === 0 ? (
                    <>
                        <div>-</div>
                        <div className='text-center'>-</div>
                        <div className='text-center'>-</div>
                        <div className='text-end'>-</div>
                        <div>-</div>
                        <div className='text-center'>-</div>
                        <div className='text-center'>-</div>
                        <div className='text-end'>-</div>
                        <div>-</div>
                        <div className='text-center'>-</div>
                        <div className='text-center'>-</div>
                        <div className='text-end'>-</div>
                    </>
                ) : null}
                <div>私の成績：</div>
                {myData ? (
                    <>
                        <div className='text-center'>{myData.corrected}</div>
                        <div className='text-center'>{myData.time}</div>
                        <div className='text-end'>{myData.result}</div>
                    </>
                ) : (
                    <>
                        <div className='text-center'>-</div>
                        <div className='text-center'>-</div>
                        <div className='text-end'>-</div>
                    </>
                )}

            </div>

        </div>

    );
}

QuizRank.propTypes = {

};
