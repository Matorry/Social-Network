import { Link } from 'react-router-dom';
import { useUsers } from '../../hooks/use.user';
import { User } from '../../models/user';
import styles from './userDetail.module.scss';

type Props = {
  user: User | undefined;
};

const UserDetail = ({ user }: Props) => {
  const { currentUser } = useUsers();
  const isCurrentUser = currentUser && currentUser.id === user?.id;
  const handleFollow = () => {
    console.log(`Following user: ${user?.userName}`);
  };

  return (
    <main>
      <div className={styles.div}>
        <h2>{user ? user.userName : currentUser.userName}</h2>
        <p>Name: {user ? user.name : currentUser.name}</p>
        <p>Surname: {user ? user.surname : currentUser.surname}</p>
        <p>Email: {user ? user.email : currentUser.email}</p>

        <div>
          <h3>Followers:</h3>
          <ul>
            {user?.followingRelations.followers.map((follower) => (
              <li key={follower.id}>
                <Link to={`/user/${follower.id}`}>{follower.userName}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Following:</h3>
          <ul>
            {user?.followingRelations.followings.map((followingUser) => (
              <li key={followingUser.id}>
                <Link to={`/user/${followingUser.id}`}>
                  {followingUser.userName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {isCurrentUser && <Link to="/update-account">Update Profile</Link>}

        {!isCurrentUser && <button onClick={handleFollow}>Follow</button>}
      </div>
    </main>
  );
};

export default UserDetail;
