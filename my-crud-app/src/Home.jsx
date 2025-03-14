import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CiBank } from "react-icons/ci";
import { MdOutlineContactPhone  } from "react-icons/md";
import { IoReceiptOutline } from "react-icons/io5";


export default function Home() {
  const [data, setData] = useState([]);
  const naviagate  = useNavigate();
  useEffect(() => {
    axios
      .get('http://localhost:8081/')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);
  return (
    <>
      <div className="d-flex">
        <div className="sidebar bg-blue-950 shadow-2xl text-white p-4" style={{ height: '100vh', width: '250px' }}>
          <div className="d-flex justify-content-start align-items-center mb-4">
            <CiBank size={40} className="mr-2" />
            <h4>Bank</h4>
          </div>
          <ul className="list-unstyled">
            <li><Link to="/" className="text-white">Dashboard</Link></li>
            <li><Link to="/make-payment" className="text-white">Payment</Link></li>
            <li><Link to="/contact" className="text-white">Contact Us</Link></li>
            <li><Link to="/Past_Payments/:id" className="text-white">E-Statement</Link></li>
          </ul>
        </div>
        <div className="flex-grow-1">
          <div className="py-5 shadow-sm flex text-center p-4 ml-4 items-center ">
            <h1 className="display-4 text-primary mr-6">User Information</h1>
            <div className="flex space-x-6 ml-auto">
              <div className='flex items-center space-x-2'> < CiBank /><span>Home</span></div>
              <div className='flex items-center space-x-2'><MdOutlineContactPhone /><span>Contact Us</span></div>
              <div className='flex items-center space-x-2'><IoReceiptOutline /><span>E-Statement</span></div>
            </div>
          </div>
          <div className="container mt-4">
            <div className="row justify-content-center">
              <div className="col-10 col-md-8">
                <div className='p-3 d-flex justify-content-between shadow-[0_4px_6px_rgba(75,0,130,0.3)]'>
                    <Link to='/' className='btn btn-info'>Info</Link>
                    <Link to="/create" className='btn btn-success'>Add New</Link>
                </div>
                <table className="table table-bordered table-striped text-center shadow-2xl">
                  <thead className="table-dark text-white shadow-sm placeholder-red-100 pd-[3px]">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Age</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((alpha, index) => (
                      <tr key={index}>
                        <td>{alpha.id}</td>
                        <td>{alpha.name}</td>
                        <td>{alpha.age}</td>
                        <td className=' flex p-1 justify-center items-center'>
                          <div className='p-1'>
                          <Link to={`/read/${alpha.id}`} className='btn btn-info'>Info</Link>
                          </div>
                          <div className='p-1'>
                          <Link to={`/edit/${alpha.id}`} className='btn btn-success'>Edit</Link>
                          </div>
                          <div className='p-1'>
                          <Link to={`/delete/${alpha.id}`} className='btn btn-danger'>Delete</Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
