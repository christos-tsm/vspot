'use client';

import {useState} from "react";
import styles from '../forms.module.scss';
import Select from "@/components/common/forms/select";
import Button from "@/components/common/forms/button";

type Options = {
    label: string,
    value: string | number
}[]


const SearchForm = () => {
    const [options, setOptions] = useState<Options>([
        {
            label: "Ηλεκτρολόγος",
            value: "1",
        },
        {
            label: "Υδραυλικός",
            value: "2",
        },
        {
            label: "Βιζιτα",
            value: "3",
        },
    ]);
    const [locations, setLocations] = useState<Options>([
        {
            label: 'Βόλος',
            value: 1,
        },
        {
            label: 'Νέα Αγχίαλος',
            value: 2,
        },
        {
            label: 'Νέα Ιωνία',
            value: 3,
        }
    ]);

    const handleChangeSelect = (e: any) => {
        console.log(e.value)
    }

    return (
        <div className={styles.searchForm}>
            <Select
                options={options}
                placeholder='Αναζήτηση'
                onChange={(e) => handleChangeSelect(e)}
                isSearchable
                isMulti={false}
            />
            <Select
                options={locations}
                placeholder='Περιοχή'
                onChange={(e) => handleChangeSelect(e)}
                isSearchable
                isMulti={false}
            />
            <Button variation={'primary'} text={'Αναζήτηση'}/>
        </div>
    );
};

export default SearchForm;