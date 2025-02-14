import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PaymentPage = () => {
    const { payment_url } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = React.useState('loading');

    React.useEffect(() => {
        const handlePayment = async () => {
            try {
                if (!payment_url) {
                    throw new Error('Missing payment URL');
                }


                window.location.replace(`https://secure.cardcom.solutions/External/lowProfileClearing/1000.aspx?LowProfileCode=${payment_url}`);
            } catch (error) {
                setStatus('error');
                console.error('Payment error:', error);
            }
        };

        handlePayment();
    }, [payment_url]);

    if (status === 'loading') {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                flexDirection: 'column',
                gap: '20px'
            }}>
                <p>Processing payment...</p>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                flexDirection: 'column',
                gap: '20px'
            }}>
                <div style={{
                    padding: '20px',
                    backgroundColor: '#ffebee',
                    border: '1px solid #ffcdd2',
                    borderRadius: '4px',
                    maxWidth: '400px'
                }}>
                    <h3 style={{ color: '#c62828', marginTop: 0 }}>Payment Error</h3>
                    <button
                        onClick={() => navigate('/')}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#2196f3',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return null;
};

export default PaymentPage;
