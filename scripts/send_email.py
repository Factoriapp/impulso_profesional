#!/usr/bin/env python3
import os
import argparse
import smtplib
import ssl
from email.message import EmailMessage


def send_email(smtp_host, smtp_port, smtp_user, smtp_pass, sender, to, subject, body, html=False):
    msg = EmailMessage()
    msg["From"] = sender
    msg["To"] = to
    msg["Subject"] = subject

    if html:
        msg.add_alternative(body, subtype="html")
    else:
        msg.set_content(body)

    context = ssl.create_default_context()

    # Use STARTTLS (submission) by default
    with smtplib.SMTP(smtp_host, smtp_port, timeout=30) as server:
        server.starttls(context=context)
        if smtp_user and smtp_pass:
            server.login(smtp_user, smtp_pass)
        server.send_message(msg)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Send a simple email using SMTP (reads SMTP credentials from env vars).")
    parser.add_argument("--to", required=True, help="Recipient email address")
    parser.add_argument("--subject", default="(no subject)", help="Email subject")
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--body", help="Email body text (literal string)")
    group.add_argument("--body-file", help="Path to a file whose contents will be used as the body")
    parser.add_argument("--html", action="store_true", help="Send body as HTML")

    args = parser.parse_args()

    smtp_host = os.getenv("SMTP_HOST")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    smtp_user = os.getenv("SMTP_USER")
    smtp_pass = os.getenv("SMTP_PASS")
    sender = os.getenv("EMAIL_FROM") or smtp_user

    if not smtp_host:
        raise SystemExit("Environment variable SMTP_HOST is required")
    if not sender:
        raise SystemExit("Sender address is required: set EMAIL_FROM or SMTP_USER in environment")

    if args.body_file:
        with open(args.body_file, "r", encoding="utf-8") as f:
            body_text = f.read()
    else:
        body_text = args.body

    try:
        send_email(smtp_host, smtp_port, smtp_user, smtp_pass, sender, args.to, args.subject, body_text, html=args.html)
        print("Email sent to", args.to)
    except Exception as e:
        print("Failed to send email:", e)
        raise
