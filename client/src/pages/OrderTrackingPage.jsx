import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import toast from 'react-hot-toast';

// --- CORRECTED IMPORT PATHS ---
import { fetchOrderDetails, selectCurrentOrder } from '../store/orderSlice';
import Loading from '../components/Loading';
import { IoArrowBack } from 'react-icons/io5';

// Fix for default marker icon issue with webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom Icons
const userIcon = new L.Icon({ iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png' });
const eateryIcon = new L.Icon({ iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png' });
const agentIcon = new L.Icon({ iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png' });


const OrderTrackingPage = () => {
    const { orderId } = useParams();
    const dispatch = useDispatch();
    const orderDetails = useSelector(selectCurrentOrder);
    const { status } = useSelector(state => state.order);

    // Simulate notifications
    useEffect(() => {
        if (orderDetails) {
            toast.dismiss(); // Clear previous toasts
            setTimeout(() => toast.success('Eatery has accepted your order.'), 1000);
            setTimeout(() => toast.success('Your order is being processed.'), 4000);
            setTimeout(() => toast.success('Your order is out for delivery!'), 8000);
        }
    }, [orderDetails]);

    useEffect(() => {
        if (orderId) {
            dispatch(fetchOrderDetails(orderId));
        }
    }, [orderId, dispatch]);

    if (status === 'loading' || !orderDetails) {
        return <div className="flex items-center justify-center h-screen"><Loading /></div>;
    }

    const { eatery, customer, agent, etaMinutes } = orderDetails;
    const polyline = [
        [eatery.location.lat, eatery.location.lng],
        [agent.location.lat, agent.location.lng],
        [customer.location.lat, customer.location.lng]
    ];

    return (
        <section className="flex flex-col h-screen">
            <div className="container p-4 mx-auto bg-white shadow-md">
                 <Link to="/dashboard/myorders" className="flex items-center gap-2 mb-4 text-slate-600 hover:text-green-600">
                    <IoArrowBack />
                    <span>Back to My Orders</span>
                </Link>
                <h1 className="text-2xl font-bold">Tracking Order: {orderDetails.orderId}</h1>
            </div>

            <div className="flex-grow w-full">
                <MapContainer center={[agent.location.lat, agent.location.lng]} zoom={13} style={{ height: '100%', width: '100%' }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    <Marker position={[customer.location.lat, customer.location.lng]} icon={userIcon}>
                        <Popup>Your Location: {customer.address}</Popup>
                    </Marker>
                    <Marker position={[eatery.location.lat, eatery.location.lng]} icon={eateryIcon}>
                        <Popup>Eatery: {eatery.name}</Popup>
                    </Marker>
                     <Marker position={[agent.location.lat, agent.location.lng]} icon={agentIcon}>
                        <Popup>Agent: {agent.name}</Popup>
                    </Marker>

                    <Polyline pathOptions={{ color: 'blue' }} positions={polyline} />
                </MapContainer>
            </div>

            <div className="p-4 bg-white border-t-2">
                <div className="container grid grid-cols-1 gap-4 mx-auto md:grid-cols-3">
                    <div className="p-4 text-center bg-green-100 rounded-lg">
                        <p className="font-bold text-green-800">Order Status</p>
                        <p className="text-xl font-semibold">{orderDetails.status}</p>
                    </div>
                     <div className="p-4 text-center bg-blue-100 rounded-lg">
                        <p className="font-bold text-blue-800">Estimated Arrival</p>
                        <p className="text-xl font-semibold">{etaMinutes} minutes</p>
                    </div>
                     <div className="p-4 text-center bg-slate-100 rounded-lg">
                        <p className="font-bold text-slate-800">Delivery Agent</p>
                        <p className="text-xl font-semibold">{agent.name}</p>
                        <p className="text-sm text-slate-500">{agent.phone}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrderTrackingPage;
