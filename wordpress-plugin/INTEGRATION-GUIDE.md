
# Syntax Quote Form WordPress Integration Guide

This guide will help you properly install and setup the Syntax Quote Form WordPress plugin.

## Installation Process

1. **Build the React Application**
   ```
   npm run build
   ```
   This will create a `dist` folder with all the compiled assets.

2. **Install the Plugin**
   - Create a folder named `syntax-quote-form` in your WordPress plugins directory (`wp-content/plugins/`)
   - Copy the following files/folders into the `syntax-quote-form` directory:
     - The entire `dist` folder from your React build
     - The `syntax-quote-form.php` file
   - Your plugin structure should look like this:
     ```
     wp-content/plugins/syntax-quote-form/
     ├── dist/
     │   ├── assets/
     │   │   ├── index.js
     │   │   ├── index.css
     │   │   └── ... (other assets)
     │   └── index.html
     └── syntax-quote-form.php
     ```

3. **Activate the Plugin**
   - Go to WordPress admin dashboard
   - Navigate to Plugins
   - Find "Syntax Quote Form" and click "Activate"

## Using the Shortcode

To display the form on any page or post, add the following shortcode:

```
[syntax_quote_form]
```

You can also specify a language:

```
[syntax_quote_form language="fr"]
```

Available languages:
- `en` (English)
- `fr` (French)
- `ar` (Arabic)

## Troubleshooting

If the form doesn't appear:

1. **Check Console Errors**
   - Open your browser's developer tools (F12)
   - Look for any JavaScript errors in the console

2. **Check File Paths**
   - Ensure the path to your dist/assets folder is correct
   - The plugin should be able to access files at: `/wp-content/plugins/syntax-quote-form/dist/assets/`

3. **Plugin Settings**
   - Check the plugin settings page in WordPress admin
   - Verify that the form language is set correctly

4. **Theme Compatibility**
   - Some WordPress themes might have CSS that conflicts with the form
   - Try using the form on a default WordPress theme to test

## Updating the Plugin

When you make changes to the React application:

1. Rebuild the app with `npm run build`
2. Replace the existing `dist` folder in the WordPress plugin directory
3. If you've made changes to the PHP file, replace that as well

## Support

If you need further assistance, please contact support@syntax.agency.
