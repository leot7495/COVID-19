import React , {useState , useEffect} from 'react'
import { FormControl , NativeSelect } from '@material-ui/core'
import styles from './CountryPicker.module.css'
import { fetchCountryData } from '../../api'

function CountryPicker ( {setCountry}) {
    const [countiesData , setCountiesData] = useState([])

    useEffect( () => {
        const countryApi = async () =>{
            setCountiesData(await fetchCountryData());
        }
        countryApi();
    },[])

    return (
        <>
            <FormControl>
                <NativeSelect onChange={(e)=>{setCountry(e.target.value)}}>
                    <option value="">Global</option>
                    {countiesData.map((country , i)=>
                        <option key={i} value={country}>{country}</option>
                    )}
                </NativeSelect>
            </FormControl>
        </>
    )
}

export default CountryPicker;