import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  try {
    const { searchParams } = new URL(req.url);
    const currency = searchParams.get("currency") || "INR";

    const { amount } = await req.json();

    const options = {
      amount: Math.round(amount * 100), // INR = paise, USD = cents
      currency,
      receipt: `receipt_${currency}_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return new Response(JSON.stringify(order), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
