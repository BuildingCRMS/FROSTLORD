# Email Notifications Module

This module provides email notification functionality using Resend as the email provider.

## Features

- **Resend Integration**: Uses Resend API for reliable email delivery
- **React Email Templates**: Beautiful, responsive email templates built with React Email
- **Template System**: Extensible template system for different email types

## Templates

### Invite User Email
- **Template Key**: `invite-user`
- **Purpose**: Sent when a user is invited to join the admin dashboard
- **Data Required**: `inviteLink`, `preview` (optional)

### Order Placed Email
- **Template Key**: `order-placed`
- **Purpose**: Sent when a customer places an order
- **Data Required**: `order`, `shippingAddress`, `preview` (optional)

## Configuration

The module is configured in `medusa-config.js` with the following environment variables:

- `RESEND_API_KEY`: Your Resend API key
- `RESEND_FROM_EMAIL`: The sender email address

## Usage

The module is automatically used by the notification system when email notifications are triggered through event subscribers.
