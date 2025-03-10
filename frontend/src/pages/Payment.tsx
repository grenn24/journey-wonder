import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const Payment = () => {
	const stripe = useStripe();
	const elements = useElements();

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		if (!stripe || !elements) return;

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card: elements.getElement(CardElement)!,
		});

		if (error) {
			console.log(error);
		} else {
			console.log("Payment Method:", paymentMethod);
			// Send paymentMethod.id to your backend
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<CardElement />
			<button type="submit" disabled={!stripe}>
				Pay
			</button>
		</form>
	);
};

export default Payment;
