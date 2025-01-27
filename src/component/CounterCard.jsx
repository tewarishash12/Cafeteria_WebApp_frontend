import React from 'react'

function MerchantCard({merchant}) {
    return (
        <div key={merchant._id}>
            <p><strong>Merchant Name:</strong> {merchant.username}</p>
            <p><strong>Phone:</strong> {merchant.phoneNo}</p>
        </div>
    );
}

function CounterCard({counter}) {

    return (
        <div key={counter._id}
            className="border border-gray-300 rounded-lg p-4 shadow-md bg-white dark:bg-gray-800"
        >
            <h2 className="text-lg font-semibold mb-2">{counter.shop_name}</h2>
            <div className="text-sm text-gray-700 dark:text-gray-300">
                {counter.merchant_id.map((merchant) => (
                    <MerchantCard key={merchant._id} merchant={merchant} />
                ))}
            </div>
        </div>
    )
}

export default CounterCard