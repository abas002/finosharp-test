import React, { ReactNode } from 'react';

interface IProps {
    children?: ReactNode
}
const ThemeContext = React.createContext({ theme: "", toggleTheme: () => { } });

const ThemeProvider: React.FC<IProps> = (props) => {
    const [theme, setTheme] = React.useState<string>("");

    React.useEffect(() => {
        if (theme) {
            if (theme === 'dark') {
                document.documentElement.classList.add('dark')
                localStorage.setItem('theme', 'dark')
            } else {
                document.documentElement.classList.remove('dark')
                localStorage.setItem('theme', 'light')
            }
        } else {
            const currentTheme = localStorage.theme ? localStorage.theme : 'light';
            setTheme(currentTheme)
        }
    }, [theme]);


    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {props.children}
        </ThemeContext.Provider>
    );
};

const useTheme = () => {
    return React.useContext(ThemeContext);
};

export { ThemeProvider, useTheme };
