import React from 'react'
import { Card , CardContent , Typography , Grid } from '@material-ui/core';
import Countup from 'react-countup';
import cx from 'classnames'
// 為了避免不同 Component 之間的 className 互相衝突，一般在 Webpack 的設定中會將 styles.css 中的 class 重新命名，
// 例如加上一段 hash，或是加上 Scope 名稱。所以上例中的 redBorder 經過 Webpack 的 Loader 轉換後可能會被重新命名為 styles_redBorder_vgo，
// 其中 styles 是 Scope，vgo 則是一段 hash。
// 由於 className 是動態產生的，所以 assign 給 Component 時不能寫死成 className="redBorder"，必須要以變數方式傳遞：className={styles.redBorder}。

import styles from './Cards.module.css'
function Cards ({ data: {confirmed , recovered , deaths , lastUpdate} }) {  // App 傳的只有 data , 為了可讀性佳 , 可以這樣使用
    
    if (!confirmed) {
        return 'Loading...'
    }

    return (
        <>
            <div className={styles.container}>
                {/* spacing 類似 margin 卡片與卡片會有距離 */}
                <Grid container spacing={3} justify="center">
                    {/* 卡片一 */}
                    {/* 類型為: Card  xs:螢幕縮小的話  md:螢幕大的話 */}
                    <Grid item component={Card} xs={12} md={3} className={cx(styles.Card , styles.Infected)}>
                        
                        {/* gutterBottom 與下一行 會有間距  */}
                        <Typography color="textSecondary" gutterBottom>Infected 已確診</Typography>

                        {/* variant 更改字體 , separator 千位數隔開 , duration start ~ end 跑的時間*/}
                        <Typography variant="h5"><Countup start={0} end={confirmed.value} separator=',' duration={2}/></Typography>     

                        {/* new Date 台灣的時間 , toDateString時間的轉換 */}
                        <Typography color="textSecondary">{new Date (lastUpdate).toDateString()}</Typography>

                        {/* variant 更改字體 */}
                        <Typography variant="body2">Number of active cases of COVID-19</Typography>
                    </Grid>               

                    {/* 卡片二 */}
                    {/* 類型為 Card */}
                    <Grid item component={Card} xs={12} md={3} className={cx(styles.Card , styles.Recovered)}>
                        
                        {/* gutterBottom 與下一行 會有間距  */}
                        <Typography color="textSecondary" gutterBottom>Recovered 已恢復</Typography>

                        {/* variant 更改字體 */}
                        <Typography variant="h5"><Countup start={0} end={recovered.value} separator=',' duration={2}/></Typography>     

                        <Typography color="textSecondary">{new Date (lastUpdate).toDateString()}</Typography>

                        {/* variant 更改字體 */}
                        <Typography variant="body2">Number of Recoveries from COVID-19</Typography>
                    </Grid>

                    {/* 卡片三 */}
                    {/* 類型為 Card */}
                    <Grid item component={Card} xs={12} md={3} className={cx(styles.Card , styles.Deaths)}>
                        
                        {/* gutterBottom 與下一行 會有間距  */}
                        <Typography color="textSecondary" gutterBottom>Deaths 死亡數</Typography>

                        {/* variant 更改字體 */}
                        <Typography variant="h5"><Countup start={0} end={deaths.value} separator=',' duration={2}/></Typography>     

                        <Typography color="textSecondary">{new Date (lastUpdate).toDateString()}</Typography>

                        {/* variant 更改字體 */}
                        <Typography variant="body2">Number of deaths caused by COVID-19</Typography>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default Cards;