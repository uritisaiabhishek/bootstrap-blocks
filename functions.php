<?php

function your_theme_enqueue_assets() {
    // Main CSS
    wp_enqueue_style(
        'wp-bootstrap-main-styles',
        get_template_directory_uri() . '/assets/css/style.min.css',
        [],
        filemtime(get_template_directory() . '/assets/css/style.min.css')
    );

    // Main JS
    wp_enqueue_script(
        'wp-bootstrap-main-scripts',
        get_template_directory_uri() . '/assets/js/main.js', [],
        filemtime(get_template_directory() . '/assets/js/main.js'),
        true
    );
}

add_action('wp_enqueue_scripts', 'your_theme_enqueue_assets');

function mytheme_register_blocks() {
    $blocks = [
        'blocks/accordion'
    ];

    foreach ( $blocks as $block ) {
        register_block_type( get_template_directory() . '/' . $block );
    }
}
add_action( 'init', 'mytheme_register_blocks' );
