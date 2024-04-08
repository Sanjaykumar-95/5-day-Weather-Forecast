import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

function Citiestable() {
    let Apikey = 'be7377befbf477f1c5143d5791f260be';
    let geonames = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20`;
    const [pdata, setPdata] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [cities, setCities] = useState([]);
    const [country, setCountry] = useState([]);
    const [timezone, setTimezone] = useState([]);
    const [countrycode, setCountrycode] = useState([]);

    useEffect(() => {
        fetch(geonames)
            .then(response => response.json())
            .then(data => {
                setPdata(data.results);
                const cityName = data.results.map(city => city.name)
                const countryname = data.results.map(city => city.cou_name_en);
                const countrycode = data.results.map(city => city.country_code);
                const timezone = data.results.map(city => city.timezone);
                setCities(cityName);
                setCountry(countryname);
                setCountrycode(countrycode);
                setTimezone(timezone);
            })
    }, [])

    const columns = [
        {
            name: 'City',
            // selector: row => row.name,
            selector: row => <Link to={`/Forecast/${row.name}`}>{row.name}</Link>,
            sortable: true
        },
        {
            name: 'Country',
            selector: row => row.cou_name_en,
            sortable: true
        },
        {
            name: 'Country Code',
            selector: row => row.country_code,
            sortable: true
        },
        {
            name: 'Timezone',
            selector: row => row.timezone,
            sortable: true
        }
    ]

    function handelfilter(event) {
        const value = event.target.value.toLowerCase();
        const filteredData = pdata.filter((city) => {
            return (
                city.name.toLowerCase().includes(value.toLowerCase()) ||
                city.country_code.toLowerCase().includes(value.toLowerCase())
            );
        });
        setFilteredData(filteredData);
    }
    return (
        <div className="App">
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <h2>Weather Forecast</h2>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-9'></div>
                    <div className='col-md-3'>
                        <input type='text' placeholder='Enter City / Country code' className='form-control' onChange={handelfilter} />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12 table'>
                        <DataTable columns={columns}
                            data={filteredData.length > 0 ? filteredData : pdata}
                            // onRowClicked={(row) => window.open(`${row.name}`, `_blank`)}
                        >
                        </DataTable>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Citiestable;