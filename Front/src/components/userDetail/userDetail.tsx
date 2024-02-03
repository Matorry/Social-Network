import { Link } from 'react-router-dom';
import { useUsers } from '../../hooks/use.user';
import { User } from '../../models/user';
import styles from './userDetail.module.scss';

type Props = {
  user?: User;
};

const UserDetail = ({ user }: Props) => {
  const { currentUser, followUser, getUserById, unfollowUser } = useUsers();

  const isCurrentUser = currentUser && currentUser.id === user?.id;

  const handleFollow = async () => {
    if (user) {
      await followUser(currentUser.id, user);
      await getUserById(user.id);
    }
  };

  const handleUnfollow = async () => {
    if (user) {
      await unfollowUser(currentUser.id, user);
      await getUserById(user.id);
    }
  };

  if (
    user &&
    !user.isPublic &&
    currentUser.id !== user.id &&
    !currentUser.followers.find((element) => {
      element.id === user.id;
    })
  ) {
    return (
      <main>
        <div className={styles.div}>
          <p>This profile is private.</p>
          {!isCurrentUser && (
            <button
              className={styles.button}
              onClick={
                currentUser.followings.some(
                  (element) => element.id === user?.id
                )
                  ? handleUnfollow
                  : handleFollow
              }
            >
              {currentUser.followings.some((element) => element.id === user?.id)
                ? 'Unfollow'
                : 'Follow'}
            </button>
          )}
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className={styles.div}>
        <h2>{user ? user.userName : currentUser.userName}</h2>
        <p>Name: {user ? user.name : currentUser.name}</p>
        <p>Surname: {user ? user.surname : currentUser.surname}</p>
        <p>Email: {user ? user.email : currentUser.email}</p>

        <div>
          <div>
            <h3>Followers:</h3>
            {user?.followers && user.followers.length > 0 ? (
              <ul>
                {user.followers.map((follower) => (
                  <li key={`follower${follower.id}`}>
                    <Link
                      onClick={() => getUserById(follower.id)}
                      to={`/user/${follower.id}`}
                    >
                      {follower.userName}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No followers yet.</p>
            )}
          </div>

          <div>
            <h3>Following:</h3>
            {user?.followings && user.followings.length > 0 ? (
              <ul>
                {user.followings.map((followingUser) => (
                  <li key={`followingUser${followingUser.id}`}>
                    <Link
                      onClick={() => getUserById(followingUser.id)}
                      to={`/user/${followingUser.id}`}
                    >
                      {followingUser.userName}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Not following anyone yet.</p>
            )}
          </div>
        </div>

        {isCurrentUser && <Link to="/update-account">Update Profile</Link>}

        {!isCurrentUser && (
          <button
            className={styles.button}
            onClick={
              currentUser.followings.some((element) => element.id === user?.id)
                ? handleUnfollow
                : handleFollow
            }
          >
            {currentUser.followings.some((element) => element.id === user?.id)
              ? 'Unfollow'
              : 'Follow'}
          </button>
        )}
      </div>
    </main>
  );
};

export default UserDetail;
