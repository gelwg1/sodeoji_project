import { useState, useEffect, useContext } from 'react';
import { getQuizs } from '../services/firebase';
import useUser from './use-user';
import UserContext from '../context/user';

export default function useQuizs(type, param2) {
  const { user: loggedInUser } = useContext(UserContext);
  const { user } = useUser(loggedInUser?.uid);
  const [quizs, setQuizs] = useState(null);

  useEffect(() => {
    async function getTimelineQuizs() {
      const QuizList = await getQuizs(user, type, param2);
      QuizList.sort((a, b) => {
        // if (b.vote_numbers !== a.vote_numbers) return b.vote_numbers - a.vote_numbers;
        return a.create_date - b.create_date;
      });
      setQuizs(QuizList);
    }

    getTimelineQuizs();
  }, [quizs?.length]);

  return { quizs };
}
