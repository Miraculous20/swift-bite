import { useSelector } from "react-redux";
import { selectEateryAdmin } from "../../store/eateryAdminSlice";
import { FaClipboardList, FaUtensils, FaChartLine } from "react-icons/fa";

const EateryDashboard = () => {
    const eateryAdmin = useSelector(selectEateryAdmin);

    return (
        <div className="p-4 md:p-6">
            <h1 className="text-2xl md:text-3xl font-bold">Welcome, {eateryAdmin?.name}</h1>
            {/* FIX 1: Replaced ' with &apos; in "Here's" */}
            <p className="text-slate-600">Here&apos;s the summary for {eateryAdmin?.eateryName}.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="p-6 bg-green-100 rounded-lg shadow-md flex items-center gap-4">
                    <FaClipboardList className="text-4xl text-green-600"/>
                    <div>
                        {/* FIX 2: Replaced ' with &apos; in "Today's" */}
                        <p className="text-slate-700">Today&apos;s Orders</p>
                        <p className="text-2xl font-bold">15</p>
                    </div>
                </div>
                 <div className="p-6 bg-blue-100 rounded-lg shadow-md flex items-center gap-4">
                    <FaUtensils className="text-4xl text-blue-600"/>
                    <div>
                        <p className="text-slate-700">Active Menu Items</p>
                        <p className="text-2xl font-bold">42</p>
                    </div>
                </div>
                 <div className="p-6 bg-orange-100 rounded-lg shadow-md flex items-center gap-4">
                    <FaChartLine className="text-4xl text-orange-600"/>
                    <div>
                        {/* FIX 3: Replaced ' with &apos; in "Today's" */}
                        <p className="text-slate-700">Today&apos;s Revenue</p>
                        <p className="text-2xl font-bold">₦75,000</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EateryDashboard;