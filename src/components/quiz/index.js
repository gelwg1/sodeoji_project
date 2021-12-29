import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import useQuizs from '../../hooks/use-quizs'
import Quiz from './quiz';
import 'react-loading-skeleton/dist/skeleton.css'

export default function Quizs({ type, param2 }) {
    var { quizs } = useQuizs(type, param2);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (quizs) setLoading(true);
    })
    return (
        <div className="container col-span-2 mb-12">
            {!loading ? (
                <Skeleton count={4} width={640} height={500} className="mb-5" />
            ) : (
                quizs.map((quiz) => {
                    return (
                      <>
                        <Quiz content={quiz}/>
                      </>
                    )
                  })
            )}
        </div>
    );
}
