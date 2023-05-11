import { useEffect, useRef, useState } from 'react';
import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5';

const ThemeSwitcher = () => {
    const [theme, setTheme] = useState('');
    const sunRef = useRef();
    const moonRef = useRef();

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'light') {
            setTheme('sun');
            setLightTheme();
        } else {
            setTheme('moon');
            setDarkTheme();
        }
    }, []);

    const switchTheme = () => {
        if (document.body.classList.contains('dark')) {
            setLightTheme();
        } else {
            setDarkTheme();
        }
        if (theme === 'sun') {
            setTheme('moon');
            localStorage.setItem('theme', 'dark');
        } else if (theme === 'moon') {
            setTheme('sun');
            localStorage.setItem('theme', 'light');
        }
    };

    const setLightTheme = () => {
        setTheme('sun');
        document.body.classList.remove('dark');
        document.body.classList.add('light');
        moonRef.current.classList.remove('active');
        sunRef.current.classList.add('active');
        document.body.style.setProperty('--primary', '#0B0B0B');
        document.body.style.setProperty('--secondary', '#FFFFFF');
    };

    const setDarkTheme = () => {
        setTheme('moon');
        document.body.classList.remove('light');
        document.body.classList.add('dark');
        sunRef.current.classList.remove('active');
        moonRef.current.classList.add('active');
        document.body.style.setProperty('--primary', '#FFFFFF');
        document.body.style.setProperty('--secondary', '#0B0B0B');
    };

    return (
        <div
            className={`button__form__switch ${theme}`}
            onClick={switchTheme}
        >
      <span ref={sunRef} className="switch__sun">
        <IoSunnyOutline size="1em" />
      </span>
            <span ref={moonRef} className="switch__moon active">
        <IoMoonOutline size="1em" />
      </span>
        </div>
    );
};

export default ThemeSwitcher;
