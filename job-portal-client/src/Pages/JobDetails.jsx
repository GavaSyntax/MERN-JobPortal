import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import PageHeader from '../components/PageHeader';
import { FaBriefcase } from "react-icons/fa6"
import { FiMapPin } from 'react-icons/fi';

const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/all-jobs/${id}`)
            .then(res => res.json())
            .then(data => setJob(data))
    }, []);

    const handleApply = async () => {
        const { value: url } = await Swal.fire({
            input: 'url',
            inputLabel: 'URL address',
            inputPlaceholder: 'Sumbit your CV  URL here',
        });
        if (url) {
            Swal.fire(`Entered URL: ${url}`);
        }
    }; 
     
    const jobIdShort = id.slice(0, 5);
    

    return (
        <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
            <PageHeader title={"Single Job Page"} path={"single job"} />
            <h2 className='font-bold'>Job ID : {jobIdShort}</h2>
            <h2 className='text-3xl text-blue font-medium mt-5'>Job details</h2>
            <p className='text-gray-600'>Here's how the job details align with your job preferences. Manage job preferences anytime in your profile</p>
            <div className='flex items-center mt-5 gap-4'>
            <FaBriefcase className='w-8 h-8  '/>
            {job && job.jobTitle && (
                <h1 className='text-4xl font-medium'>{job.jobTitle.toUpperCase()}</h1>
            )}
            </div>
            <div className='flex items-center'>
            <FiMapPin/><p className='text-gray-600'>{job.jobLocation}</p>
            </div>
            <div className='flex items-center mt-5 gap-4'>
            <button className='bg-blue px-8 py-2 text-white'>{job.employmentType}</button>
            <button className='bg-indigo-600 px-8 py-2 text-white' onClick={handleApply}>Apply Now</button>
            </div>

        </div>
    );
};

export default JobDetails



