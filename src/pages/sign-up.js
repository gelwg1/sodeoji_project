import { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { arrayOfGroup } from '../services/firebase';

export default function SignUp() {
  const history = useHistory();
  const { firebase, database } = useContext(FirebaseContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const [groups, setGroups] = useState();
  const [group, setGroup] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || username === '' || group === '' || passwordCheck === '';

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (passwordCheck === password) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(username + '@gmail.com', password);

        await createdUserResult.user.updateProfile({
          displayName: username
        });

        console.log(createdUserResult.user);

        await database
          .ref('/Users')
          .push({
            user_id: createdUserResult.user.uid,
            avatar: '',
            group: group,
            username: username,
          });

        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setGroup('');
        setUsername('');
        setPassword('');
        setPasswordCheck('');
        setError(error.message);
      }
    } else {
      setPassword('');
      setPasswordCheck('');
      setError("パスワード確認が間違えた！");
    }

  };

  function Options({ options }) {
    return (
      <>
        {options.map((option) =>
          <option value={option}>{option}</option>
        )}
      </>
    )
  }
  async function getGroups() { setGroups(await arrayOfGroup()) };

  useEffect(() => {
    getGroups();
    document.title = 'サインアップ';
  }, []);

  return (
    <div className="mx-auto max-w-screen-md">

      <div className="mx-auto w-3/5">

        <div>
          <img src="/images/login-back.png" alt="" />
        </div>
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">


          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <form onSubmit={handleSignUp} method="POST">
            <input
              type="text"
              placeholder="ユーザー名"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />
            <input
              type="password"
              placeholder="パスワード"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <input
              type="password"
              placeholder="パスワード確認"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setPasswordCheck(target.value)}
              value={passwordCheck}
            />
            <select
              placeholder="グルプル選択"
              className="text-sm text-gray-base w-full mr-3 py-4 px-4 h-8 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setGroup(target.value)}
              value={group}>
              {groups && <Options options={groups}/>}
            </select>
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold
            ${isInvalid && 'opacity-50'}`}
            >
              サインアップ
            </button>
          </form>

          <div className="padding-login">
            <p className="text-sm">
              {` `}
              <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
                アカウントを持ってる？
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
