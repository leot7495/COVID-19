import axios from 'axios';   //導入axios , 用於發出 api 請求



const url = 'https://covid19.mathdro.id/api';


//資料數據 API
export const fetchData = async (country) => {    // export 導出 api , 要使用 async await 撈資料要有時間回傳 , 非同步不然生命週期會有錯誤

    let CheangUrl = url

    if (country) {
        CheangUrl = `${url}/countries/${country}`
    }

    try {
        //簡略快速寫法
        const { data : { confirmed , recovered , deaths , lastUpdate } } = await axios.get(CheangUrl)

        return {confirmed , recovered , deaths , lastUpdate} ;

        //  寫法二
        // const { data } = await axios.get(url)      
        
        // const modifinedData = {         //只取要的資料
        //     confirmed: data.confirmed,  //已確診
        //     recovered: data.recovered,  //已恢復
        //     deaths: data.deaths,        //死亡人數
        //     lastUpdate: data.lastUpdate //更新時間
        // }
        // return modifinedData

    } catch (error) {
        console.log(error)
    }
}

//圖表數據 API
export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`)

        const modifinedData = data.map( (dataDaily) => ({   //只取要的資料 , 把多個陣列 map 出挑出要的資料
            confirmed: dataDaily.confirmed.total,
            deaths: dataDaily.deaths.total,
            reportDate: dataDaily.reportDate
        }));

        return modifinedData
    } catch (error) {
        console.log(error)
    }
}

//選擇國家 API
export const fetchCountryData = async () => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`)

        return countries.map((country) => country.name) 
    } catch (error) {
        console.log(error)
    }
}