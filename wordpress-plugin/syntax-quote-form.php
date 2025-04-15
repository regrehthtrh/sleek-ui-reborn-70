
<?php
/**
 * Plugin Name: Syntax Quote Form
 * Plugin URI: https://syntax.agency
 * Description: A modern, responsive quote request form for your business
 * Version: 1.0.0
 * Author: Syntax Agency
 * Author URI: https://syntax.agency
 * Text Domain: syntax-quote-form
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('SYNTAX_QUOTE_FORM_VERSION', '1.0.0');
define('SYNTAX_QUOTE_FORM_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('SYNTAX_QUOTE_FORM_PLUGIN_URL', plugin_dir_url(__FILE__));

class Syntax_Quote_Form {
    
    /**
     * Constructor
     */
    public function __construct() {
        // Register activation hook
        register_activation_hook(__FILE__, array($this, 'activate'));
        
        // Register deactivation hook
        register_deactivation_hook(__FILE__, array($this, 'deactivate'));
        
        // Add shortcode
        add_shortcode('syntax_quote_form', array($this, 'render_quote_form'));
        
        // Enqueue scripts and styles
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        
        // Add admin menu
        add_action('admin_menu', array($this, 'add_admin_menu'));
        
        // Register REST API endpoint for form submissions
        add_action('rest_api_init', array($this, 'register_api_endpoints'));
    }
    
    /**
     * Plugin activation
     */
    public function activate() {
        // Create database tables if needed
        $this->create_tables();
        
        // Add default options
        $default_options = array(
            'smtp_host' => '',
            'smtp_port' => '587',
            'smtp_username' => '',
            'smtp_password' => '',
            'notification_email' => get_option('admin_email'),
            'form_language' => 'en'
        );
        
        add_option('syntax_quote_form_options', $default_options);
    }
    
    /**
     * Plugin deactivation
     */
    public function deactivate() {
        // Clean up if needed
    }
    
    /**
     * Create database tables
     */
    private function create_tables() {
        global $wpdb;
        
        $charset_collate = $wpdb->get_charset_collate();
        $table_name = $wpdb->prefix . 'syntax_quote_form_submissions';
        
        $sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            created_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
            fullname varchar(100) NOT NULL,
            email varchar(100) NOT NULL,
            phone varchar(50) NOT NULL,
            business_name varchar(100),
            service varchar(50),
            details text,
            budget decimal(10,2),
            additional_services text,
            PRIMARY KEY  (id)
        ) $charset_collate;";
        
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
    
    /**
     * Enqueue scripts and styles
     */
    public function enqueue_scripts() {
        // Only enqueue on pages where the shortcode is used
        global $post;
        if (is_a($post, 'WP_Post') && has_shortcode($post->post_content, 'syntax_quote_form')) {
            // Enqueue the bundled React app
            wp_enqueue_style(
                'syntax-quote-form-styles',
                SYNTAX_QUOTE_FORM_PLUGIN_URL . 'dist/assets/index.css',
                array(),
                SYNTAX_QUOTE_FORM_VERSION
            );
            
            wp_enqueue_script(
                'syntax-quote-form-js',
                SYNTAX_QUOTE_FORM_PLUGIN_URL . 'dist/assets/index.js',
                array(),
                SYNTAX_QUOTE_FORM_VERSION,
                true
            );
            
            // Pass variables to JavaScript
            wp_localize_script(
                'syntax-quote-form-js',
                'syntaxQuoteFormData',
                array(
                    'ajaxUrl' => admin_url('admin-ajax.php'),
                    'restUrl' => esc_url_raw(rest_url('syntax-quote-form/v1/submit')),
                    'nonce' => wp_create_nonce('wp_rest'),
                    'language' => get_option('syntax_quote_form_options')['form_language']
                )
            );
        }
    }
    
    /**
     * Add admin menu
     */
    public function add_admin_menu() {
        add_menu_page(
            'Syntax Quote Form',
            'Quote Form',
            'manage_options',
            'syntax-quote-form',
            array($this, 'render_admin_page'),
            'dashicons-feedback',
            30
        );
        
        add_submenu_page(
            'syntax-quote-form',
            'Submissions',
            'Submissions',
            'manage_options',
            'syntax-quote-form-submissions',
            array($this, 'render_submissions_page')
        );
        
        add_submenu_page(
            'syntax-quote-form',
            'Settings',
            'Settings',
            'manage_options',
            'syntax-quote-form-settings',
            array($this, 'render_settings_page')
        );
    }
    
    /**
     * Render admin page
     */
    public function render_admin_page() {
        echo '<div class="wrap">';
        echo '<h1>Syntax Quote Form</h1>';
        echo '<p>Use the shortcode <code>[syntax_quote_form]</code> to display the quote form on any page or post.</p>';
        echo '<h2>Quick Statistics</h2>';
        
        // Display submission statistics
        global $wpdb;
        $table_name = $wpdb->prefix . 'syntax_quote_form_submissions';
        $total_submissions = $wpdb->get_var("SELECT COUNT(*) FROM $table_name");
        $recent_submissions = $wpdb->get_var("SELECT COUNT(*) FROM $table_name WHERE created_at > DATE_SUB(NOW(), INTERVAL 30 DAY)");
        
        echo '<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-top: 20px;">';
        
        echo '<div style="background: #fff; border: 1px solid #ccc; padding: 20px; border-radius: 5px;">';
        echo '<h3>Total Submissions</h3>';
        echo '<p style="font-size: 24px; font-weight: bold;">' . esc_html($total_submissions) . '</p>';
        echo '</div>';
        
        echo '<div style="background: #fff; border: 1px solid #ccc; padding: 20px; border-radius: 5px;">';
        echo '<h3>Submissions (Last 30 Days)</h3>';
        echo '<p style="font-size: 24px; font-weight: bold;">' . esc_html($recent_submissions) . '</p>';
        echo '</div>';
        
        echo '</div>';
        echo '</div>';
    }
    
    /**
     * Render submissions page
     */
    public function render_submissions_page() {
        echo '<div class="wrap">';
        echo '<h1>Form Submissions</h1>';
        
        global $wpdb;
        $table_name = $wpdb->prefix . 'syntax_quote_form_submissions';
        $submissions = $wpdb->get_results("SELECT * FROM $table_name ORDER BY created_at DESC", ARRAY_A);
        
        if (empty($submissions)) {
            echo '<p>No submissions yet.</p>';
        } else {
            echo '<table class="wp-list-table widefat fixed striped">';
            echo '<thead>';
            echo '<tr>';
            echo '<th>Date</th>';
            echo '<th>Name</th>';
            echo '<th>Email</th>';
            echo '<th>Phone</th>';
            echo '<th>Service</th>';
            echo '<th>Budget</th>';
            echo '<th>Actions</th>';
            echo '</tr>';
            echo '</thead>';
            echo '<tbody>';
            
            foreach ($submissions as $submission) {
                echo '<tr>';
                echo '<td>' . esc_html(date('M j, Y H:i', strtotime($submission['created_at']))) . '</td>';
                echo '<td>' . esc_html($submission['fullname']) . '</td>';
                echo '<td>' . esc_html($submission['email']) . '</td>';
                echo '<td>' . esc_html($submission['phone']) . '</td>';
                echo '<td>' . esc_html($submission['service']) . '</td>';
                echo '<td>' . esc_html(number_format($submission['budget'], 2)) . '</td>';
                echo '<td>';
                echo '<a href="#" class="button view-details" data-id="' . esc_attr($submission['id']) . '">View Details</a>';
                echo '</td>';
                echo '</tr>';
            }
            
            echo '</tbody>';
            echo '</table>';
        }
        
        echo '</div>';
    }
    
    /**
     * Render settings page
     */
    public function render_settings_page() {
        if (isset($_POST['syntax_quote_form_save_settings'])) {
            // Save settings
            check_admin_referer('syntax_quote_form_settings');
            
            $options = array(
                'smtp_host' => sanitize_text_field($_POST['smtp_host']),
                'smtp_port' => sanitize_text_field($_POST['smtp_port']),
                'smtp_username' => sanitize_text_field($_POST['smtp_username']),
                'smtp_password' => sanitize_text_field($_POST['smtp_password']),
                'notification_email' => sanitize_email($_POST['notification_email']),
                'form_language' => sanitize_text_field($_POST['form_language'])
            );
            
            update_option('syntax_quote_form_options', $options);
            echo '<div class="notice notice-success"><p>Settings saved successfully!</p></div>';
        }
        
        $options = get_option('syntax_quote_form_options');
        
        echo '<div class="wrap">';
        echo '<h1>Form Settings</h1>';
        
        echo '<form method="post" action="">';
        wp_nonce_field('syntax_quote_form_settings');
        
        echo '<table class="form-table">';
        
        echo '<tr>';
        echo '<th scope="row"><label for="notification_email">Notification Email</label></th>';
        echo '<td><input type="email" id="notification_email" name="notification_email" value="' . esc_attr($options['notification_email']) . '" class="regular-text"></td>';
        echo '</tr>';
        
        echo '<tr>';
        echo '<th scope="row"><label for="form_language">Default Form Language</label></th>';
        echo '<td>';
        echo '<select id="form_language" name="form_language">';
        echo '<option value="en" ' . selected($options['form_language'], 'en', false) . '>English</option>';
        echo '<option value="fr" ' . selected($options['form_language'], 'fr', false) . '>French</option>';
        echo '<option value="ar" ' . selected($options['form_language'], 'ar', false) . '>Arabic</option>';
        echo '</select>';
        echo '</td>';
        echo '</tr>';
        
        echo '<tr>';
        echo '<th scope="row">SMTP Settings</th>';
        echo '<td>';
        echo '<p><label for="smtp_host">SMTP Host</label><br>';
        echo '<input type="text" id="smtp_host" name="smtp_host" value="' . esc_attr($options['smtp_host']) . '" class="regular-text"></p>';
        
        echo '<p><label for="smtp_port">SMTP Port</label><br>';
        echo '<input type="text" id="smtp_port" name="smtp_port" value="' . esc_attr($options['smtp_port']) . '" class="regular-text"></p>';
        
        echo '<p><label for="smtp_username">SMTP Username</label><br>';
        echo '<input type="text" id="smtp_username" name="smtp_username" value="' . esc_attr($options['smtp_username']) . '" class="regular-text"></p>';
        
        echo '<p><label for="smtp_password">SMTP Password</label><br>';
        echo '<input type="password" id="smtp_password" name="smtp_password" value="' . esc_attr($options['smtp_password']) . '" class="regular-text"></p>';
        echo '</td>';
        echo '</tr>';
        
        echo '</table>';
        
        echo '<p class="submit">';
        echo '<input type="submit" name="syntax_quote_form_save_settings" class="button button-primary" value="Save Settings">';
        echo '</p>';
        
        echo '</form>';
        echo '</div>';
    }
    
    /**
     * Register REST API endpoints
     */
    public function register_api_endpoints() {
        register_rest_route('syntax-quote-form/v1', '/submit', array(
            'methods' => 'POST',
            'callback' => array($this, 'handle_form_submission'),
            'permission_callback' => '__return_true'
        ));
    }
    
    /**
     * Handle form submission
     */
    public function handle_form_submission($request) {
        $params = $request->get_params();
        
        // Validate required fields
        if (empty($params['fullname']) || empty($params['email']) || empty($params['phone'])) {
            return new WP_Error('missing_fields', 'Required fields are missing', array('status' => 400));
        }
        
        // Save to database
        global $wpdb;
        $table_name = $wpdb->prefix . 'syntax_quote_form_submissions';
        
        $wpdb->insert(
            $table_name,
            array(
                'fullname' => sanitize_text_field($params['fullname']),
                'email' => sanitize_email($params['email']),
                'phone' => sanitize_text_field($params['phone']),
                'business_name' => isset($params['business']) ? sanitize_text_field($params['business']) : '',
                'service' => isset($params['service']) ? sanitize_text_field($params['service']) : '',
                'details' => isset($params['projectDescription']) ? sanitize_textarea_field($params['projectDescription']) : '',
                'budget' => isset($params['budget']) ? floatval($params['budget']) : 0,
                'additional_services' => isset($params['additionalServices']) ? json_encode($params['additionalServices']) : ''
            )
        );
        
        // Send email notification
        $this->send_notification($params);
        
        return array(
            'success' => true,
            'message' => 'Form submitted successfully!'
        );
    }
    
    /**
     * Send email notification
     */
    private function send_notification($params) {
        $options = get_option('syntax_quote_form_options');
        $to = $options['notification_email'];
        $subject = 'New Quote Request from ' . $params['fullname'];
        
        $message = "A new quote request has been submitted:\n\n";
        $message .= "Name: " . $params['fullname'] . "\n";
        $message .= "Email: " . $params['email'] . "\n";
        $message .= "Phone: " . $params['phone'] . "\n";
        
        if (!empty($params['business'])) {
            $message .= "Business: " . $params['business'] . "\n";
        }
        
        if (!empty($params['service'])) {
            $message .= "Service: " . $params['service'] . "\n";
        }
        
        if (!empty($params['budget'])) {
            $message .= "Budget: " . $params['budget'] . "\n";
        }
        
        if (!empty($params['projectDescription'])) {
            $message .= "Project Description: " . $params['projectDescription'] . "\n";
        }
        
        if (!empty($params['additionalServices'])) {
            $message .= "Additional Services:\n";
            foreach ($params['additionalServices'] as $service) {
                $message .= "- " . $service['name'] . " (" . $service['price'] . ")\n";
            }
        }
        
        // Configure mail if SMTP settings are provided
        if (!empty($options['smtp_host'])) {
            add_action('phpmailer_init', function($phpmailer) use ($options) {
                $phpmailer->isSMTP();
                $phpmailer->Host = $options['smtp_host'];
                $phpmailer->SMTPAuth = true;
                $phpmailer->Port = $options['smtp_port'];
                $phpmailer->Username = $options['smtp_username'];
                $phpmailer->Password = $options['smtp_password'];
                $phpmailer->SMTPSecure = 'tls';
            });
        }
        
        wp_mail($to, $subject, $message);
    }
    
    /**
     * Render quote form
     */
    public function render_quote_form($atts) {
        $atts = shortcode_atts(array(
            'language' => get_option('syntax_quote_form_options')['form_language'],
        ), $atts, 'syntax_quote_form');
        
        ob_start();
        ?>
        <div id="syntax-quote-form-root" data-language="<?php echo esc_attr($atts['language']); ?>"></div>
        <?php
        return ob_get_clean();
    }
}

// Initialize the plugin
$syntax_quote_form = new Syntax_Quote_Form();
