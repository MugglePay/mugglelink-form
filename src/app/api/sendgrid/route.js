import { NextResponse } from "next/server";
import { sendEmail } from "../../../lib/sendgrid";

export async function GET(req) {
	const { searchParams } = new URL(req.url);
	const email = searchParams.get("email");
	const name = searchParams.get("name");
	const description = searchParams.get("description");
	const address = searchParams.get("address");
	const price = searchParams.get("price");

	try {
		await sendEmail(
			email,
			`Product ${name} has been Added Successfuly`,
			`<!DOCTYPE html>
			<html lang="en">
				<head>
					<meta charset="UTF-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<title>Invoice Email</title>
				</head>
				<body>
				<h1 style="padding: 20px; background-color: #f1f1f1">Product Added</h1>
		  <h2 style="margin-top: 20px;">Product Information:</h2>
					<p>Product Name: ${name}</p>
					<p>Product Description: ${description}</p>
					<p>Wallet Address: ${address}</p>
					<p>Price: ${price}</p>
				</body>
			</html>					
		`
		);
		return NextResponse.json({ message: "Email sent successfully" });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Internal Server Error" });
	}
}
