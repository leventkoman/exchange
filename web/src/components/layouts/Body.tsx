import {useEffect, useMemo, useState} from "react";
import type {Exchange} from '../../models/exchange.model.ts'
import type {Currency} from "../../models/currency.model.ts";

function Body() {
    const [search, setSearch] = useState("");
    const [data, setData] = useState<Exchange | null>(null);
    const [selectedFrom, setSelectedFrom] = useState<string>('USD');
    const [selectedTo, setSelectedTo] = useState<string>('TRY');
    const [result, setResult] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);

    const fetchExchange = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/currency");
            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            const result = await response.json();
            setData(result);

        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchExchange();
    }, []);

    const filteredData = useMemo(() => {
        const currencyList = data?.Tarih_Date?.Currency || [];
        if (!search.trim()) return currencyList;

        return currencyList.filter((item: Currency) =>
            item.CurrencyName.trim().toLowerCase().includes(search) ||
            item.Kod.trim().toLowerCase().includes(search)
        );
    }, [search, data])

    const onSearchChange = (search: string) => {
        search = search.trim().toLowerCase();
        setSearch(search);
    }

    const clearSearch = () => search ? setSearch('') : undefined;

    const swapSelectedValues = () => {
        if (!selectedFrom || !selectedTo) return;

        setSelectedFrom(selectedTo);
        setSelectedTo(selectedFrom);
    }

    const convert = () => {
        if (!amount) return;
        const from: Currency | undefined = data?.Tarih_Date?.Currency.find((item: Currency) => item.Kod === selectedFrom);
        const to: Currency | undefined = data?.Tarih_Date?.Currency.find((item: Currency) => item.Kod === selectedTo);
        let fromUnit: number;
        let toUnit: number;
        let calculate: string;

        if (selectedFrom === 'TRY' || selectedTo === 'TRY') {
            if (from === undefined) {
                fromUnit = 1;
                toUnit = parseFloat(to.ForexSelling) / parseFloat(to.Unit);
            }
            if (to === undefined) {
                fromUnit = parseFloat(from.ForexSelling) / parseFloat(from.Unit);
                toUnit = 1;
            }
            calculate = (amount * (fromUnit / toUnit)).toFixed(2);
            setResult(calculate);
            return;
        }


        if (!from || !to) return;

        fromUnit = parseFloat(from.ForexSelling) / parseFloat(from.Unit);
        toUnit = parseFloat(to.ForexSelling) / parseFloat(to.Unit);

        calculate = (amount * (fromUnit / toUnit)).toFixed(2);
        setResult(calculate);
    }

    return (
        <div className={"flex-col bg-[#f6f7f8] dark:bg-[#101822] h-full overflow-auto flex"}>
            <div className={"px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-8"}>
                <div className={"layout-content-container flex flex-col max-w-300 flex-1"}>
                    <div className={"grid grid-cols-1 lg:grid-cols-12 gap-6 p-4"}>
                        <div
                            className={"lg:col-span-5 flex flex-col bg-white dark:bg-[#1a2332]  rounded-xl border border-[#dbe0e5] dark:border-[#233348] p-6 shadow-sm"}>
                            <div className={"flex items-center gap-3 mb-6"}>
                                <span className={"material-symbols-outlined text-[#136dec]"}>calculate</span>
                                <h2 className={"font-bold text-black dark:text-white"}>Quick Exchange</h2>
                            </div>
                            <div className={"flex items-end gap-2 mb-6"}>
                                <label className={"flex flex-col flex-1"}>
                                    <p className={"text-[#596d85] dark:text-[#92a9c9] text-sm font-medium pb-2"}>Amount</p>
                                    <input type="text"
                                           onChange={(e) => setAmount(parseInt(e.target.value))}
                                           className={"text-[#111418] dark:text-white rounded-lg focus:outline-0 focus:ring-2 focus:ring-primary border border-[#dbe0e5] dark:border-[#324867] focus:border-[#dbe0e5] dark:focus:border-[#324867] bg-[#f6f7f8] dark:bg-[#111822]  cursor-pointer p-[15px] appearance-none h-12 transition-all"}/>
                                </label>
                            </div>
                            <div className={"flex items-end gap-2 mb-6"}>
                                <label className={"flex flex-col flex-1"}>
                                    <p className={"text-[#596d85] dark:text-[#92a9c9] text-sm font-medium pb-2"}>From</p>
                                    <select name=""
                                            value={selectedFrom}
                                            onChange={(e) => setSelectedFrom(e.target.value)}
                                            className={"text-[#111418] dark:text-white rounded-lg focus:outline-0 focus:ring-2 focus:ring-primary border  border-[#dbe0e5] dark:border-[#324867] focus:border-[#dbe0e5] dark:focus:border-[#324867] bg-[#f6f7f8] dark:bg-[#111822] cursor-pointer p-2 appearance-none h-12 transition-all"}>
                                        {data?.Tarih_Date?.Currency && data?.Tarih_Date?.Currency?.map((item: Currency) => (
                                            <option key={item.Kod} disabled={item.Kod === selectedTo}
                                                    value={item.Kod}>{item.Kod}</option>
                                        ))}
                                        <option key={"TRY"} disabled={'TRY' === selectedTo} value="TRY">TRY</option>
                                    </select>
                                </label>
                                <button
                                    onClick={() => swapSelectedValues()}
                                    className={"flex items-center justify-center size-12 rounded-lg bg-gray-100 dark:bg-[#233348] hover:bg-gray-200 dark:hover:bg-[#2d405a]  text-[#596d85] dark:text-[#92a9c9] transition-colors cursor-pointer"}>
                                    <span className={"material-symbols-outlined"}>swap_horiz</span>
                                </button>
                                <label className={"flex flex-col flex-1"}>
                                    <p className={"text-[#596d85] dark:text-[#92a9c9] text-sm font-medium pb-2"}>To</p>
                                    <select name=""
                                            value={selectedTo}
                                            onChange={(e) => setSelectedTo(e.target.value)}
                                            className={"text-[#111418] dark:text-white rounded-lg focus:outline-0 focus:ring-2 focus:ring-primary border  border-[#dbe0e5] dark:border-[#324867] focus:border-[#dbe0e5] dark:focus:border-[#324867] bg-[#f6f7f8] dark:bg-[#111822] cursor-pointer p-2 appearance-none h-12 transition-all"}>
                                        {data?.Tarih_Date?.Currency && data?.Tarih_Date?.Currency?.map((item: Currency) => (
                                            <option key={item.Kod} disabled={item.Kod === selectedFrom}
                                                    value={item.Kod}>{item.Kod}</option>
                                        ))}
                                        <option key={"TRY"} disabled={'TRY' === selectedFrom} value="TRY">TRY</option>
                                    </select>
                                </label>
                            </div>
                            <div className={"flex items-end gap-2 mb-6"}>
                                <button
                                    onClick={() => convert()}
                                    disabled={!amount || !selectedTo || !selectedFrom}
                                    className={"flex w-full items-center justify-center cursor-pointer disabled:bg-gray-400 disabled:text-[#dfdfdf] px-4 bg-[#136dec] hover:bg-blue-600 font-bold  text-white rounded-lg h-12 transition-all"}>
                                    Convert Now
                                </button>
                            </div>
                            {result ? (
                                <>
                                    <hr className={"text-[#dbe0e5] dark:text-[#233348] mb-6"}/>
                                    <div className={"flex flex-col flex-1 justify-center items-center"}>
                                        <p className={"text-[#596d85] dark:text-[#92a9c9] text-sm font-medium pb-2"}>Result</p>
                                        <div className={"flex flex-col items-center justify-center gap-1 mb-6"}>
                                            <p className={"text-black dark:text-white text-3xl font-bold"}>{result}
                                                <span
                                                    className={"text-[#596d85] dark:text-[#92a9c9] text-sm font-medium"}>{selectedTo}</span>
                                            </p>
                                            <p className={"text-[#596d85] dark:text-[#92a9c9] text-xs font-medium flex gap-1"}>
                                        <span className={"material-symbols-outlined"}
                                              style={{fontSize: "14px"}}>info</span>
                                                Based on real-time market data</p>
                                        </div>
                                    </div>
                                </>
                            ) : ''}
                        </div>
                        <div
                            className={"lg:col-span-7 flex flex-col bg-white dark:bg-[#1a2332]  rounded-xl border border-[#dbe0e5] dark:border-[#233348] p-6 gap-6 shadow-sm"}>
                            <div className={"flex flex-row gap-3 mb-6"}>
                                <span className={"material-symbols-outlined text-[#136dec]"}>trending_up</span>
                                <h2 className={" font-bold text-black dark:text-white"}>Popular Exchange Rates</h2>
                            </div>
                            {data?.Tarih_Date?.Currency?.slice(0, 4).map((item: Currency) => (
                                <div
                                    key={item.Kod}
                                    className={"flex items-center justify-between gap-3 p-3 rounded-lg border  border-transparent dark:border-[#233348] bg-[#f6f7f8] dark:bg-[#111822] hover:bg-[#dbe0e5] dark:hover:bg-[#324867]"}>
                                    <div className={"flex items-center gap-3"}>
                                        <div
                                            className={"rounded-full size-10 bg-white dark:bg-[#233348] flex items-center justify-center"}>
                                            <img src={`/flags/${item.Kod}.gif`} alt=""/>
                                        </div>
                                        <div>
                                            <p className={"text-[#111418] dark:text-white font-bold"}>{`${item.Kod} / TRY`}</p>
                                            <p className={"text-[#596d85] dark:[#92a9c9] text-xs"}>{item.CurrencyName}</p>
                                        </div>
                                    </div>
                                    <p className={"text-[#111418] dark:text-white font-bold"}>{item.ForexSelling}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={"grid grid-cols-12 gap-6 p-4 "}>
                        <div
                            className={"col-span-12 flex flex-col bg-white dark:bg-[#1a2332]  rounded-xl border border-[#dbe0e5] dark:border-[#233348]  p-6 gap-6 shadow-sm"}>
                            <div className={"flex flex-col md:flex-row justify-between"}>
                                <h2 className={"text-white  text-2xl"}>Live Market Data</h2>
                                <div className={"relative w-full sm:w-auto min-w-[300px]"}>
                                    <input
                                        value={search}
                                        onChange={(e) => onSearchChange(e.target.value)}
                                        className={"w-full h-10 pl-3 pr-4 rounded-lg bg-[#f6f7f8] dark:bg-[#111822] border border-[#dbe0e5] dark:border-[#324867] text-[#111418] dark:text-white placeholder:text-[#596d85] focus:outline-0 focus:border-primary focus:ring-2 focus:ring-primary text-sm transition-all"}
                                        placeholder="Search..." type="text"/>
                                    <span
                                        onClick={() => clearSearch()}
                                        className={`material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#92a9c9] ${search ? 'cursor-pointer' : 'pointer-events-none'}`}>{search ? 'close' : 'search'}</span>
                                </div>
                            </div>
                            {filteredData && filteredData.length > 0 ? (
                                <table className={"w-full border-collapse"}>
                                    <thead>
                                    <tr className={" w-full text-[#92a9c9] text-xs uppercase tracking-wider bg-white dark:bg-[#1a2332]  rounded-xl border-b border-[#dbe0e5]  dark:border-[#233348] "}>
                                        <th className={"px-6 py-4 font-medium text-left"}>Symbol</th>
                                        <th className={"px-6 py-4 font-medium text-left hidden md:table-cell"}>Name</th>
                                        <th className={"px-6 py-4 font-medium text-left md:table-cell"}>ASK</th>
                                        <th className={"px-6 py-4 font-medium text-left md:table-cell"}>BID</th>
                                    </tr>
                                    </thead>
                                    <tbody
                                        className={"divide-y divide-[#dbe0e5] dark:divide-[#233348] text-sm md:text-base"}>
                                    {filteredData?.map((item: Currency, index: number) => (
                                        <tr key={index}
                                            className={"hover:bg-[#dbe0e5] dark:hover:bg-[#1f2937] transition-colors group"}>
                                            <td className={"px-6 py-4"}>
                                                <div className={"flex items-center gap-2"}>
                                                    <div
                                                        className={"size-8 rounded-full bg-gray-100 dark:bg-[#233348] flex items-center justify-center text-sm"}>
                                                        <img src={`/flags/${item.Kod}.gif`} alt=""/>
                                                    </div>
                                                    <span
                                                        className={"dark:text-[#111418] dark:text-white font-bold"}>{`${item.Kod}`}</span>
                                                </div>
                                            </td>
                                            <td className={"px-6 py-4  text-[#596d85] dark:text-[#92a9c9] text-sm text-left hidden md:table-cell"}>{`${item.CurrencyName} / TURKISH LIRA`}</td>
                                            <td className={"px-6 py-4 dark:text-[#111418] dark:text-white font-medium text-left"}>{item.ForexBuying}</td>
                                            <td className={"px-6 py-4 dark:text-[#111418] dark:text-white text-left md:table-cell"}>{item?.ForexSelling?.length ? item.ForexSelling : ''}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            ) : <p className={"text-[#596d85] dark:text-[#92a9c9]  text-center"}>No data available</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Body;