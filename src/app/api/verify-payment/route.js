import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      rzp_checkout_anon_id,
      rzp_device_id,
      rzp_stored_checkout_id,
    } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !userId) {
      return NextResponse.json({ success: false, message: "Missing payment details" }, { status: 400 });
    }

    // Verify signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 400 });
    }

    // Connect to DB
    await connectDB();

    console.log("Payment data received:", {
      userId,
      rzp_checkout_anon_id,
      rzp_device_id,
      rzp_stored_checkout_id
    });

    // Update user: subscribed + store Razorpay IDs
    const user = await User.findByIdAndUpdate(
      userId,
      {
        subscribed: true,
        rzp_checkout_anon_id,
        rzp_device_id,
        rzp_stored_checkout_id,
      },
      { new: true }
    );
    console.log("Updated user:", user);

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Payment successful!",
      subscribed: user.subscribed,
      rzp_checkout_anon_id: user.rzp_checkout_anon_id,
      rzp_device_id: user.rzp_device_id,
      rzp_stored_checkout_id: user.rzp_stored_checkout_id,
    }, { status: 200 });

  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json({ success: false, message: "Verification failed" }, { status: 500 });
  }
}
