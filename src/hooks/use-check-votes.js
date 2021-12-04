import { useState, useEffect,useContext } from 'react';
import {snapshotToArray} from '../services/firebase';
import FirebaseContext from '../context/firebase';

export default function useCheckVotes(uid, post_id) {
  const [isVoted, setIsVoted] = useState(false);
  const [id, setId] = useState('');
  const { database } = useContext(FirebaseContext);

  useEffect(() => {
    async function check(uid, post_id) {
        let result;
        await database.ref('Votes').orderByChild('user_id').equalTo(uid).once("value", snapshot => {
            if (snapshot.exists()) {
                result = snapshotToArray(snapshot);
                result.forEach(element => { 
                    if (element?.post_id == post_id) {
                        setIsVoted(true);
                        setId(element?.key);
                    }
                });
            }
        });
    }
    if (uid && post_id) {
        check(uid, post_id);
        
    console.log(id);
    }
  }, [uid,post_id]);

  return { isVoted, id };
}
