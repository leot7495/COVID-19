import React , {useEffect , useState} from 'react';
import styles from './App.module.css'

// 一次導入 , 如果有很多個元件 , 就不用一個一個導入
import { Cards , Chart , CountryPicker } from './components'

//導入 api 裡面的 fetchData api 結果
import { fetchData } from './api'

function App () {
    const [ data , setData ] = useState({})
    const [country , setCountry] = useState('')

    async function fetchCountryData () {
        const Data = Promise.resolve(fetchData(country))  // 取 PromiseValue 的值 
        await Data.then(function(result) {
            setData(result)
        });
    }

    useEffect((country)=>{
        fetchCountryData()
    },[country])
    return (
        <>

        {/* CSS 也可以這樣直接套用屬性 */}
        <div className={styles.container}>
        <h1 className={styles.COVIDtitla}>新冠狀病毒全球統計人數表</h1>

            {/* 卡片 */}
            <Cards data={data}/>

            {/* 國家 選擇器 */}
            <CountryPicker setCountry={setCountry}/>

            {/* 圖表 */}
            <Chart data={data} country={country}/>
        </div>
        </>
    )
}

export default App;