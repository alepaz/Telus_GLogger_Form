// SurveyField contains logic to render a single
// label and text input
import React from 'react';

export default ({ input, label, meta: { asyncValidating, touched, error } , ...custom }) => {
    return (
        <div>
            <label>{ label }{custom.myCustomProp1}</label>
            <input {...input} />
            <div className='red-text' style={{ marginBottom: '10px' }}>
                {touched && error ? error : null}
            </div>
        </div>
    );
};