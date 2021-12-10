import PropTypes from 'prop-types';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import GetAppIcon from '@material-ui/icons/GetApp';
import FirebaseContext from '../../context/firebase';
import { useState, React, useContext, useEffect } from 'react';
import useUser from '../../hooks/use-user';
import UserContext from '../../context/user';
import Vote from './vote';
// import { snapshotToArray } from '../../services/firebase';

export default function Footer({ votes, comments, content }) {
    const { user: loggedInUser } = useContext(UserContext);
    const { user } = useUser(loggedInUser?.uid);
    const { database } = useContext(FirebaseContext);

    var saved;
    const [save, setSave] = useState(false);

    const handleSave = async () => {
        if (saved == null) await database.ref('Saves').child(`${user?.username}/${content?.key}`).set(1);
        else await database.ref('Saves').child(`${user?.username}/${content?.key}`).remove();
    }

    useEffect(() => {
        async function getSaved() {
            await database
                .ref(`Saves/${user?.username}/${content?.key}`)
                .on('value', (snapshot) => {
                    if (snapshot.val()) setSave(true);
                    else setSave(false);
                    saved = snapshot.val();
                });
        }
        getSaved();
    }, saved);

    
    return (
        <div className="p-4 pt-2 pb-1">
            <div className="grid grid-cols-3 text-2xl">
                <div className="font-bold flex flex-row justify-center items-center">
                    <Vote user={user} linkdb={'Posts'} content={content}/>
                </div>
                <div className="font-bold flex flex-row justify-center items-center">
                    <ChatBubbleOutlineIcon className="mr-1" />
                    <div>{comments}</div>
                </div>
                <div className="font-bold flex justify-center items-center">
                    <GetAppIcon onClick={handleSave} className="cursor-pointer rounded-full" fontSize="large" style={save ? { backgroundColor: 'green', fill: 'white' } : {}} />
                </div>
            </div>
        </div>
    );
}

Footer.propTypes = {
    votes: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired,
    content: PropTypes.object.isRequired
};
