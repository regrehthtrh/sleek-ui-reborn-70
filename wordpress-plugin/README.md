
# Syntax Quote Form WordPress Plugin

This plugin allows you to integrate the Syntax Quote Form into your WordPress website.

## Installation

1. Upload the `syntax-quote-form` folder to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Place the shortcode `[syntax_quote_form]` in your page or post where you want the form to appear

## Features

- Modern, responsive quote request form
- Multi-language support (English, French, Arabic)
- Admin dashboard to view and manage form submissions
- Email notifications for new submissions
- Customizable settings

## Usage

### Basic Shortcode

```
[syntax_quote_form]
```

This will display the form with the default language settings.

### Language Selection

```
[syntax_quote_form language="fr"]
```

Available language options:
- `en` - English
- `fr` - French
- `ar` - Arabic

## Admin Dashboard

The plugin adds a new menu item called "Quote Form" in your WordPress admin dashboard. From there, you can:

1. View form submission statistics
2. Browse and search through all form submissions
3. Configure form settings including:
   - Email notification settings
   - Default language
   - SMTP configuration for reliable email delivery

## Integration Guide

### Building the React App for WordPress

To build the React app for WordPress integration:

1. In your React project directory, run:
   ```
   npm run build
   ```

2. Copy the contents of the `dist` folder to the `syntax-quote-form/dist` directory in your WordPress plugin

### API Integration

The plugin provides a REST API endpoint for form submissions:

```
/wp-json/syntax-quote-form/v1/submit
```

You can customize the React app to send form data to this endpoint.

## Troubleshooting

If you encounter any issues with the plugin, please check:

1. WordPress error logs
2. That your server meets the minimum requirements (PHP 7.4+)
3. That any SMTP settings are correctly configured if using email notifications

## Support

For support, please contact support@syntax.agency or visit our website at https://syntax.agency.
