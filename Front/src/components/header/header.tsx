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
        <header className={style.header}>
          <h1>Social Network</h1>
          <nav>
            <ul className={isMenuOpen ? '' : style.hidden}>
              <li>
                <Link to={'/home'} onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to={'/my-posts'} onClick={() => setIsMenuOpen(false)}>
                  My Posts
                </Link>
              </li>
              <>
                <li>
                  <Link to={`youraccount`} onClick={() => setIsMenuOpen(false)}>
                    My account
                  </Link>
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
          </nav>
        </header>
      ) : (
        <header className={style.header}>
          <h1>Social Network</h1>
        </header>
      )}
    </>
  );
}
