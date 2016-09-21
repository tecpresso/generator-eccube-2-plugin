<?php
class plugin_info {
    static $PLUGIN_CODE = '<%= code %>';
    static $PLUGIN_NAME = '<%= name %>';
    static $PLUGIN_VERSION = '<%= version %>';
    static $COMPLIANT_VERSION = '<%= eccube_version %>';
    static $AUTHOR = '<%= author %>';
    static $DESCRIPTION = '<%= description %>';
    static $CLASS_NAME = '<%= class_name %>';
    static $HOOK_POINTS = array(
        <% for (hookPoint of hookPointsmenu) { %>
        array('<%= hookPoint.original %>', '<%= hookPoint.cammelcased %>'),
        <% } %>
    );
    static $LICENSE = '<%= license %>';
}
