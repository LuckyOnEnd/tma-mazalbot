// PaymentPage.tsx - Copy this entire file
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PaymentPage = () => {
    const { payment_url } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = React.useState('loading');

    React.useEffect(() => {
        const handlePayment = async () => {
            try {
                // Make sure we have a payment URL
                if (!payment_url) {
                    throw new Error('Missing payment URL');
                }

                // Clean up the URL
                const cleanUrl = payment_url
                    .replace(/\*\*/g, '/')
                    .replace(/[<>'"]/g, '');

                window.location.href = cleanUrl;
            } catch (error) {
                setStatus('error');
                console.error('Payment error:', error);
            }
        };

        handlePayment();
    }, [payment_url]);

    // Show loading spinner
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
                <div style={{
                    width: '50px',
                    height: '50px',
                    border: '5px solid #f3f3f3',
                    borderTop: '5px solid #3498db',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }} />
                <style>
                    {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
                </style>
                <p>Processing payment...</p>
            </div>
        );
    }

    // Show error message
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