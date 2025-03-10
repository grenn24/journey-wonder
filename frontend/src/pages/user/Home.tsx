import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "../Payment";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);
const UserHome = () => {
	return (
		<>
			<title>Journey Wonder</title>

		</>
	);
};

export default UserHome;
