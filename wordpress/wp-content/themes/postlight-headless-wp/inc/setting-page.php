<?php
// create custom plugin settings menu
add_action('admin_menu', 'bdg_create_menu');

function bdg_create_menu() {

	//create new top-level menu
	add_menu_page('Bucharest Design Guide Settings', 'BDG Settings', 'administrator', __FILE__, 'bdg_settings_page'  );


}



function bdg_section_description () {
    echo '<p>This is the  description for bdg section. </p>';
}
function callback_textfield ($input) {
    echo '<textarea type="text" name="footer_description" style="width:100%;"> '. esc_attr( get_option($input['name']) )   .'</textarea>';
}

function register_bdg_settings() {

        //Create the Section group
        
    // add_settings_section (
    //     'bdg', //section name for the section to add
    //     'Custom Settings', //section title visible on the page
    //     'bdg_section_description', //callback for section description
    //     'general'//page to which section will be added.
    //     );
        //admin hook defined in functions.php. This calls the above function at
        // initialization time.

    $args = array(
        'type' => 'string',
        'sanitize_callback' => 'sanitize_text_field',
        'default' => NULL,
        'show_in_graphql' => true,
        );
  
    //register our settings

     register_setting( 'bdg', 'footer_description' , $args );
     register_setting( 'bdg', 'copyright_description' , $args );
	 register_setting( 'bdg', 'facebook_url' , $args );
     register_setting( 'bdg', 'insta_url' ,$args );
    
}
	//call register settings function
	add_action( 'init', 'register_bdg_settings' , 20  );

function bdg_settings_page() {
?>
<div class="wrap">
<h1>Bucharest Design Guide</h1>

<form method="post" action="options.php">
    <?php //settings_fields( 'bdgSettingsGroup', $args ); ?>
    
    <?php do_settings_sections( 'bdg' ); ?>
    <table class="form-table">
        <tr valign="top">
        <th scope="row">Footer Description</th>
        <td><textarea type="text" name="footer_description" value="<?php echo esc_attr( get_option('footer_description') ); ?>" style="width:100%;"><?php echo esc_attr( get_option('footer_description') ); ?></textarea></td>
        </tr>
        <tr valign="top">
        <th scope="row">Copyright Description</th>
        <td><textarea type="text" name="copyright_description" value="<?php echo esc_attr( get_option('copyright_description') ); ?>" style="width:100%;"><?php echo esc_attr( get_option('copyright_description') ); ?></textarea></td>
        </tr>
        <tr valign="top">
        <th scope="row">Facebook URL</th>
        <td><input type="text" name="facebook_url" value="<?php echo esc_attr( get_option('facebook_url') ); ?>" style="width:100%;"/></td>
        </tr>
        
        <tr valign="top">
        <th scope="row">Instagram URL</th>
        <td><input type="text" name="insta_url" value="<?php echo esc_attr( get_option('insta_url') ); ?>" style="width:100%;"/></td>
        </tr>
    </table>
    
    <?php submit_button(); ?>

</form>
</div>
<?php } ?>

