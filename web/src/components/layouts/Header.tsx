import {useTheme} from "../../hooks/useTheme.tsx";

function Header() {
    const {theme, toggleTheme} = useTheme();
    
    return (
        <div className={"h-[52px] bg-white dark:bg-[#101822] py-3 px-12 border-b  border-b-[#dbe0e5] dark:border-b-[#233348] flex items-center justify-between"}>
            <div className={"flex items-center gap-4"}>
                <span className={"material-symbols-outlined text-[#136dec] "}>currency_exchange</span>
                <h6 className={"text-black font-bold dark:text-white"}>Exchange</h6>
            </div>
            <button onClick={toggleTheme} className={"cursor-pointer"}>
                <img src={theme === 'dark' ? "/dark-theme.svg" : "/light-theme.svg"} alt=""/>
            </button>
        </div>
    )
}

export default Header;