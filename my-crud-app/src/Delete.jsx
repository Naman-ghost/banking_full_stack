import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Delete() {
    const { id } = useParams();
    const [alpha, setAlpha] = useState(null); 
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8081/read/${id}`)
            .then(res => {
                console.log(res);
                setAlpha(res.data); 
            })
            .catch(err => {
                console.error("Error fetching data:", err);
            });
    }, [id]);
    if (!alpha) {
        return <div>Loading...</div>;
    }

    const handleDelete = () => {
        axios.delete(`http://localhost:8081/delete/${id}`)
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => {
                console.error("Error deleting item:", err);
            });
    };

    return (
        <div>
            <h2>Are you sure you want to delete this item?</h2>
            <div>
                <p>Name: {alpha.name}</p>
                <p>Age: {alpha.age}</p>
            </div>
            <div className='flex'>
                <div 
                    className="ml-4 button p-2 justify-center items-center m-3 aspect-square rounded-lg bg-amber-300" 
                    onClick={() => navigate(-1)}
                >
                    Back
                </div>
            </div>

            <button onClick={handleDelete} className="ml-4 p-2 bg-red-500 text-white rounded-lg">
                Confirm Delete
            </button>
        </div>
    );
}
