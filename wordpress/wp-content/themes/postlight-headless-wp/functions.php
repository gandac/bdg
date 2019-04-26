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
function dateDifference($date_1 , $date_2 )
{
    $datetime1 = date_create($date_1);
    $datetime2 = date_create($date_2);

    $interval = date_diff($datetime1, $datetime2);

    return $interval->format('%a');

}
function wp1482371_custom_post_type_args( $args, $post_type ) {
    if ( $post_type == "location" ) {
        $args['graphql_single_name'] = $args['labels']['name'];
        $args['graphql_plural_name'] = $args['labels']['singular_name'];
        $args['show_in_graphql'] = true;
    }
    if ( $post_type == "event" ) {
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

    $fields['isNew'] = [
        'type' => WPGraphQL\Types::boolean(),
        'description' => __( 'The coordinates of the ', 'my-graphql-extension-namespace' ),
        'resolve' => function( \WP_Post $post, array $args, $context, $info ) {
            $date1 = date('Y-m-d', strtotime(get_the_date('Y-m-d',$post->ID))) ;
            $current_date1 = date('Y-m-d', time()) ;
            $days = dateDifference($date1, $current_date1);
            return ( ! empty( $days ) && $days < 30 )  ? true : false;
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

// EVENTS 

add_filter( 'graphql_events_fields', 'register_event_fields'  , 20 ,2 );

function register_event_fields( $fields ) {

    $fields['location'] = [
        'type' => WPGraphQL\Types::list_of(WPGraphQL\Types::post_object('location')),
        'description' => __( 'The coordinates of the ', 'my-graphql-extension-namespace' ),
        'resolve' => function( \WP_Post $post, array $args, $context, $info ) {
            $eventLocation = get_field('event_location',$post->ID);
      
            return ( ! empty( $eventLocation )  ) ? $eventLocation : null;
        },
    ];
    $fields['datetime'] = [
        'type' => WPGraphQL\Types::string(),
        'description' => __( 'The coordinates of the ', 'my-graphql-extension-namespace' ),
        'resolve' => function( \WP_Post $post, array $args, $context, $info ) {
            $eventDate = get_field('event_date',$post->ID);
            if( !empty($eventDate)){
                // $eventDate = get_field('event_date',82);
                // $format_in = 'd/m/Y g:i a';
                // $date = new DateTime();
                // $newDate = $date->createFromFormat($format_in, $eventDate);
                // return $date->format('M j D');
                return $eventDate;
            }else{
                return null;
            }
            
        },
    ];
    
    return $fields;

}


