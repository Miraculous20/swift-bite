import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { acceptJob, rejectJob, fetchAvailableJobs, fetchDeliveryHistory, selectAgent, selectAgentJobs, selectAgentStatus } from '../../store/agentSlice';
import Loading from '../../components/Loading';
import DisplayTable from '../../components/DisplayTable';
import { createColumnHelper } from '@tanstack/react-table';
import { FaBoxOpen, FaMotorcycle, FaHistory, FaCheck, FaTimes } from "react-icons/fa";

const AgentDashboard = () => {
    const dispatch = useDispatch();
    const agent = useSelector(selectAgent);
    const { availableJobs, acceptedJobs, deliveryHistory } = useSelector(selectAgentJobs);
    const status = useSelector(selectAgentStatus);
    const [activeTab, setActiveTab] = useState('available');

    useEffect(() => {
        // Fetch initial data when component mounts
        dispatch(fetchAvailableJobs());
        dispatch(fetchDeliveryHistory());
    }, [dispatch]);
    
    const handleAcceptJob = (jobId) => {
        dispatch(acceptJob(jobId));
    };

    const handleRejectJob = (jobId) => {
        dispatch(rejectJob(jobId));
    };

    const columnHelper = createColumnHelper();
    const availableJobsColumns = [
        columnHelper.accessor('orderId', { header: 'Order ID' }),
        columnHelper.accessor('eateryName', { header: "Pickup From" }),
        columnHelper.accessor('customerAddress', { header: 'Deliver To' }),
        columnHelper.accessor('_id', {
            header: 'Actions',
            cell: ({ row }) => (
                <div className='flex items-center gap-2'>
                    <button onClick={() => handleAcceptJob(row.original._id)} className='flex items-center gap-1 px-3 py-1 text-xs font-semibold text-white bg-green-600 rounded-full hover:bg-green-700'>
                        <FaCheck /> Accept
                    </button>
                    <button onClick={() => handleRejectJob(row.original._id)} className='flex items-center gap-1 px-3 py-1 text-xs font-semibold text-white bg-red-600 rounded-full hover:bg-red-700'>
                        <FaTimes /> Reject
                    </button>
                </div>
            )
        })
    ];
    
    const activeJobsColumns = [
        columnHelper.accessor('orderId', { header: 'Order ID' }),
        columnHelper.accessor('eateryName', { header: "Pickup From" }),
        columnHelper.accessor('customerAddress', { header: 'Deliver To' }),
        columnHelper.accessor('status', { header: 'Status' }),
    ];
    
    const historyColumns = [
        columnHelper.accessor('orderId', { header: 'Order ID' }),
        columnHelper.accessor('eateryName', { header: 'Eatery' }),
        columnHelper.accessor('status', { header: 'Final Status' }),
    ];

    const dataMap = {
        available: { data: availableJobs, columns: availableJobsColumns },
        accepted: { data: acceptedJobs, columns: activeJobsColumns },
        history: { data: deliveryHistory, columns: historyColumns },
    };

    return (
        <section className="min-h-screen p-4 md:p-6 bg-slate-50">
            <div className="container mx-auto">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold">Welcome, {agent?.name || 'Agent'}!</h1>
                    <p className="text-slate-600">Here’s your delivery summary for today.</p>
                </div>

                {/* --- Summary Cards --- */}
                <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
                    <div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-md">
                        <FaBoxOpen className="text-4xl text-blue-500" />
                        <div>
                            <p className="text-slate-500">Available Jobs</p>
                            <p className="text-2xl font-bold">{availableJobs.length}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-md">
                        <FaMotorcycle className="text-4xl text-green-500" />
                        <div>
                            <p className="text-slate-500">Active Deliveries</p>
                            <p className="text-2xl font-bold">{acceptedJobs.length}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-md">
                        <FaHistory className="text-4xl text-orange-500" />
                        <div>
                            <p className="text-slate-500">Completed Today</p>
                            <p className="text-2xl font-bold">{deliveryHistory.length}</p>
                        </div>
                    </div>
                </div>

                {/* --- Job Tabs and Table --- */}
                <div className="bg-white rounded-lg shadow-md">
                    <div className="flex border-b border-slate-200">
                        <button onClick={() => setActiveTab('available')} className={`px-6 py-3 font-semibold ${activeTab === 'available' ? 'text-green-600 border-b-2 border-green-600' : 'text-slate-500'}`}>
                            Available ({availableJobs.length})
                        </button>
                        <button onClick={() => setActiveTab('accepted')} className={`px-6 py-3 font-semibold ${activeTab === 'accepted' ? 'text-green-600 border-b-2 border-green-600' : 'text-slate-500'}`}>
                            Active ({acceptedJobs.length})
                        </button>
                        <button onClick={() => setActiveTab('history')} className={`px-6 py-3 font-semibold ${activeTab === 'history' ? 'text-green-600 border-b-2 border-green-600' : 'text-slate-500'}`}>
                            History
                        </button>
                    </div>

                    <div className="p-4">
                        {status === 'loading' && <div className="flex justify-center p-8"><Loading/></div>}
                        {status !== 'loading' && (
                           <DisplayTable
                                data={dataMap[activeTab].data}
                                columns={dataMap[activeTab].columns}
                           />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AgentDashboard;