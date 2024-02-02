import { useState } from 'react';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useUsers } from '../../hooks/use.user';
import style from './header.module.scss';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token, logout } = useUsers();

  return (
    <>
      {token ? (
        <nav className={style['nav-container']}>
          <h1>Social Network</h1>
          <div>
            <ul style={isMenuOpen ? { right: '0%' } : { right: '-150%' }}>
              <li>
                <Link to={'/home'}>Home</Link>
              </li>
              <li>
                <Link to={'/my-posts'}>My Posts</Link>
              </li>
              <>
                <li>
                  <Link to={'/new-post'}>New Post</Link>
                </li>
                <li>
                  <Link to={'/followers'}>My account</Link>
                </li>
                <li onClick={logout} className={style.login}>
                  <a href="/">Logout</a>
                  <FaUser />
                </li>
              </>
            </ul>
            <section
              role="button"
              aria-label="button"
              className={style.menu}
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
              }}
            >
              {isMenuOpen ? <AiOutlineMenuFold /> : <AiOutlineMenuUnfold />}
            </section>
          </div>
        </nav>
      ) : (
        <header>
          <h1>Social Network</h1>
        </header>
      )}
    </>
  );
}
