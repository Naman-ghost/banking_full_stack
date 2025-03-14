import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Read() {
    const { id } = useParams();
    const [alpha, setAlpha] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`http://localhost:8081/read/${id}`)
            .then(res => {
                setAlpha(res.data);
            })
            .catch(err => {
                console.error("Error fetching data:", err);
            });
    }, [id]);
    if (!alpha) {
        return <div className="flex justify-center items-center py-5">Loading...</div>;
    }
    return (
        <div className='flex flex-col justify-center items-center py-10 bg-gray-50'>
            <div className='max-w-lg w-full bg-white shadow-lg rounded-lg p-8'>
                <button 
                    className="btn btn-warning mb-5 px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-400 transition duration-200"
                    onClick={() => navigate(-1)}
                >
                    BACK
                </button>
                <div className='text-center text-2xl font-semibold text-gray-800 mb-5'>
                    <div className="mb-3">
                        <div className="text-xl font-bold text-blue-600">Name:</div>
                        <div className="text-lg text-gray-700">{alpha.name}</div>
                    </div>
                    <div className="mb-3">
                        <div className="text-xl font-bold text-blue-600">Age:</div>
                        <div className="text-lg text-gray-700">{alpha.age}</div>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <button 
                        onClick={() => navigate(`/Edit/${alpha.id}`)}
                        className='px-6 py-2 bg-blue-500 text-white rounded-xl shadow-lg hover:bg-blue-400 transition duration-200'
                    >
                        Edit
                    </button>
                    <button 
                        onClick={() => navigate(`/delete/${alpha.id}`)}
                        className='px-6 py-2 bg-red-500 text-white rounded-xl shadow-lg hover:bg-red-400 transition duration-200'
                    >
                        Delete
                    </button>
                </div>

                {alpha.id === 2 && (
                    <div className="mt-5 text-center text-xl text-pink-600 font-bold">
                        I love you
                    </div>
                )}
            </div>
        </div>
    );
}
