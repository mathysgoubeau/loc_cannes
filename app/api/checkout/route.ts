import Stripe from "stripe";
import { NextResponse, type NextRequest } from "next/server";
import { formatEuro, getPack } from "@/lib/data";

const requiredFiles = ["identity", "licenseFront", "licenseBack", "proofAddress"] as const;

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const pack = getPack(String(formData.get("packId") ?? "signature"));
  const acceptedDocuments = formData.get("acceptedDocuments") === "true";
  const acceptedClause = formData.get("acceptedClause") === "true";
  const acceptedCashClause = formData.get("acceptedCashClause") === "true";
  const guaranteeMethod = String(formData.get("guaranteeMethod") ?? "bank");
  const missingFiles = requiredFiles.filter((key) => {
    const value = formData.get(key);
    return !(value instanceof File) || value.size === 0;
  });

  const customer = {
    fullName: String(formData.get("fullName") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    arrivalDate: String(formData.get("arrivalDate") ?? "")
  };

  if (Object.values(customer).some((value) => value.trim().length < 3)) {
    return NextResponse.json({ ok: false, message: "Informations incomplètes." }, { status: 400 });
  }

  if (!["bank", "cash"].includes(guaranteeMethod)) {
    return NextResponse.json({ ok: false, message: "Mode de caution invalide." }, { status: 400 });
  }

  if (guaranteeMethod === "cash" && !acceptedCashClause) {
    return NextResponse.json({ ok: false, message: "Clause caution espèces non validée." }, { status: 400 });
  }

  if (missingFiles.length > 0 || !acceptedDocuments || !acceptedClause) {
    return NextResponse.json({ ok: false, message: "Documents ou clauses incomplets." }, { status: 400 });
  }

  const deposit = Math.round(pack.price * pack.depositRate);
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? request.nextUrl.origin;

  if (process.env.STRIPE_SECRET_KEY) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      success_url: `${origin}/checkout?status=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout?status=cancelled`,
      customer_email: customer.email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: deposit * 100,
            product_data: {
              name: `Acompte ${pack.name}`,
              description: `Acompte 25% - ${formatEuro(pack.price)}`
            }
          }
        }
      ],
      payment_method_options: {
        card: {
          request_three_d_secure: "any"
        }
      },
      payment_intent_data: {
        metadata: {
          packId: pack.id,
          caution: String(pack.caution),
          guaranteeMethod,
          arrivalDate: customer.arrivalDate,
          internalNotification: "queued",
          emailConfirmation: "queued"
        }
      }
    });

    return NextResponse.json({
      ok: true,
      mode: "stripe",
      url: session.url,
      deposit,
      emailQueued: true,
      internalNotificationQueued: true
    });
  }

  return NextResponse.json({
    ok: true,
    mode: "mock",
    deposit,
    guaranteeMethod,
    requiresAction: true,
    threeDSecure: "simulated",
    emailQueued: true,
    internalNotificationQueued: true
  });
}
