export default function PaymentMethods() {

    const paymentMethods = [
        { id: "visa", label: "VISA", className: "font-bold text-sm tracking-tight" },
        { id: "mastercard", label: "MasterCard", className: "font-semibold text-xs" },
        { id: "amex", label: "AMERICAN\nEXPRESS", className: "font-bold text-[10px] tracking-wider leading-tight" },
        { id: "paypal", label: "PayPal", className: "font-semibold text-sm" },
        { id: "applepay", label: "Apple Pay", className: "font-medium text-sm" },
        { id: "stripe", label: "stripe", className: "font-semibold text-sm" },
    ]

    return (
        <div className="mt-6">
            <p className="text-sm tracking-wider text-anna-cement-200 mb-3">Payment Methods</p>
            <div className="flex items-center gap-2 flex-wrap">
                {paymentMethods.map((method) => (
                    <div
                        key={method.id}
                        className="bg-anna-cement-200 opacity-50 rounded px-3 py-1.5 h-6 min-w-[50px] flex items-center justify-center"
                    >
                        <span className={`text-xs text-anna-green-900 whitespace-pre-line text-center ${method.className}`}>
                            {method.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
