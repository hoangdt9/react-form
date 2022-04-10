import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function MuiCheckbox() {
    const [checked, setChecked] = React.useState(false);

    const handleChange1 = (event) => {
        const isCheck = event.target.checked;
        setChecked(isCheck);
        console.log(isCheck);
        // handle onClick of Refresh button in here
        if (isCheck) {
            // call api fetch('Yes')
        } else {
            // call api fetch('No')
        }
    };

    return (
        <div>
            <FormControlLabel
                label="Parent"
                control={
                    <Checkbox
                        checked={checked}
                        onChange={handleChange1}
                    />
                }
            />
        </div>
    );
}
