<?php
/**
 * Theme for the Postlight Headless WordPress Starter Kit.
 *
 * Read more about this project at https://postlight.com/trackchanges/introducing-postlights-wordpress-react-starter-kit.
 *
 * @package  Postlight_Headless_WP
 */
//BDG settings page
require_once 'inc/setting-page.php';
// Frontend origin.
require_once 'inc/frontend-origin.php';

// ACF commands.
require_once 'inc/class-acf-commands.php';

// Logging functions.
require_once 'inc/log.php';

// CORS handling.
require_once 'inc/cors.php';

// Admin modifications.
require_once 'inc/admin.php';

// Add Menus.
require_once 'inc/menus.php';

// Add Headless Settings area.
require_once 'inc/acf-options.php';

// Add GraphQL resolvers.
require_once 'inc/graphql/resolvers.php';

//WP custom functions
require_once 'inc/wpfunctions.php';



//echo "hereee: ";

// add_filter( 'pods_register_post_type_location', 'add_pods_graphql_support' ,19, 2 );
// add_filter( 'pods_register_taxonomy_location_category', 'add_pods_graphql_support',19, 2   );

// function add_pods_graphql_support( $options ) {

//     $options['show_in_graphql'] = true;
//     $options['graphql_single_name'] = $options['labels']['name'];
//     $options['graphql_plural_name'] = $options['labels']['singular_name'];
//     echo "aiciii: ";
//     print_r($options['labels']['name']);
//     print_r($options['labels']['singular_name']);
//     return $options;

// }

function wp1482371_custom_post_type_args( $args, $post_type ) {
    if ( $post_type == "location" ) {
        $args['graphql_single_name'] = $args['labels']['name'];
        $args['graphql_plural_name'] = $args['labels']['singular_name'];
        $args['show_in_graphql'] = true;
    }
    if ( $post_type == "location_category" ) {
       print_r($args);
    }

    return $args;
}
add_filter( 'register_post_type_args', 'wp1482371_custom_post_type_args', 20, 2 );


function wp1482371_custom_taxonomy_args( $args, $taxonomy ) {
    
    if($taxonomy == "location_category" || $taxonomy == "category" ){
       // print_r($args);
        $args['show_in_graphql'] = true;
        $args['graphql_single_name'] = 'location_category';
        $args['graphql_plural_name'] = 'location_categories';
       // echo "hereisit";
    }
    return $args;
}
add_filter( 'register_taxonomy_args', 'wp1482371_custom_taxonomy_args', 20, 2 );



add_filter( 'graphql_locations_fields', 'register_location_fields'  , 20 ,2 );

function register_location_fields( $fields ) {

    $fields['lat'] = [
        'type' => WPGraphQL\Types::string(),
        'description' => __( 'The coordinates of the ', 'my-graphql-extension-namespace' ),
        'resolve' => function( \WP_Post $post, array $args, $context, $info ) {
            $latlng = get_field('coordinates',$post->ID);
            return ( ! empty( $latlng ) && is_string( $latlng['lat'] ) ) ? $latlng['lat'] : null;
        },
    ];
    $fields['lng'] = [
        'type' => WPGraphQL\Types::string(),
        'description' => __( 'The coordinates of the ', 'my-graphql-extension-namespace' ),
        'resolve' => function( \WP_Post $post, array $args, $context, $info ) {
            $latlng = get_field('coordinates',$post->ID);
            return ( ! empty( $latlng ) && is_string( $latlng['lng'] ) ) ? $latlng['lng'] : null;
        },
    ];
    
    return $fields;

}

add_filter( 'graphql_location_category_fields', 'register_location_category_fields'  , 20 ,2 );

function register_location_category_fields( $fields ) {

    $fields['thecolor'] = [
        'type' => WPGraphQL\Types::string(),
        'description' => __( 'color of the ', 'my-graphql-extension-namespace' ),
        'resolve' => function( \WP_Term $term, array $args, $context, $info ) {
            $thecolor = get_field('thecolor',$term);
        
            return ! empty( $term->term_id ) ? strval($thecolor): null;},
    ];

   // print_r($fields);

    return $fields;

}

