import React , {useState , useEffect} from 'react'
import { fetchDailyData } from '../../api'
import { Line , Bar } from 'react-chartjs-2'

import styles from './Chart.module.css'

function Chart ( {data : { confirmed , recovered , deaths} , country} ) {
    const [dailyData , setDailyData] = useState([])
    console.log(confirmed )
    console.log(recovered )
    console.log(deaths )

    useEffect( () => {
        const fetchApi = async () => {
            setDailyData(await fetchDailyData())
        }
        fetchApi()
    },[])

    //如果數據是全球顯示的圖表
    const lineChart = (
        <Line 
            data = {{
                labels:  dailyData.map(( {reportDate} ) => reportDate),     //標題
                datasets: [{                                                //資料集
                    data: dailyData.map(( {confirmed} ) => confirmed),      //資料
                    label: 'Infected',                                      //標籤
                    borderColor: '#3333ff',                                 //背景色
                    backgroundColor: 'rgb(150, 146, 146)',
                    fill: true               
            } , {
                    data: dailyData.map(( {deaths} ) => deaths),            //資料
                    label: 'Deaths',                                        //標籤
                    backgroundColor: 'rgba(255 , 0 , 0 , .5)',              //背景色
                    borderColor: 'red',
                    fill: true
                }]
            }}
        >

        </Line>
    )

    //如果數據是單個國家顯示的圖表
    const lineCoutryChart = (
        confirmed ?  
        <Bar
            data = {{
                labels: ['confirmed' , 'recovered' , 'deaths'],
                datasets: [{                                                       //資料集
                    label: 'People',                                               //標籤
                    data: [confirmed.value , recovered.value , deaths.value],      //資料
                    backgroundColor: ['rgba(0 , 0 , 255 , .5)' ,
                                      'rgba(0 , 255 , 0 , .5)' ,
                                      'rgba(255 , 0 , 0 , .5)']             
                }]
            }}
        >
        </Bar>
        : null
    )

    return (
        <>
            <div className={styles.container}>
                {country === '' ? lineChart : lineCoutryChart}
            </div>
        </>
    )
}

export default Chart;