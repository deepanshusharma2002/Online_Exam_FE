"use client"

import { useState } from 'react';
import styes from './getFreeProposal.module.scss';

function GetFreeProposal() {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if(name.trim() === '') {
            setError(true);
        }else {
            setError(false);
            console.log("Form submitted with name:", name);
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <div className={styes.getFreeProposal}>
                <div className={styes.inputWrap}>
                    <input 
                        type="text" 
                        placeholder="Name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button className='btn btn-black'>Get Free Proposal</button>
                </div>
                {error && <p className={styes.error}>Please enter keyword</p>}
            </div>

        </form>
    )
}

export default GetFreeProposal;