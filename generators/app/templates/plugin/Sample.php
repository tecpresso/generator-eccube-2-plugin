<?php

<% for (hookPoint of hookPointChoices) { %>
require_once 'plg_<%= props.class_name %><%= hookPoint.cammelcased %>.php';
<% } %>

class <%= props.class_name %>
{
    function install ($arrPlugin)
    {

        // インストール処理

    }

    function uninstall ($arrPlugin)
    {

        //アンインストール処理

    }

    function enable ($arrPlugin)
    {
        //有効化処理
    }

    function disable ($arrPlugin)
    {
        //無効化処理
    }

    function register ($objHelperPlugin, $priority) {
        <% for (hookPoint of hookPointChoices) { %>
          $objHelperPlugin->addAction('<%= hookPoint.original %>', array($this, '<%= hookPoint.cammelcased %>'));
        <% } %>
    }

    <% for (hookPoint of hookPointChoices) { %>
    function <%= hookPoint.cammelcased %>($objPage)
    {
        $<%= hookPoint.cammelcased %> = new plg_<%= props.class_name %><%= hookPoint.cammelcased %>;
        $<%= hookPoint.cammelcased %>->init($plg_head);
        $<%= hookPoint.cammelcased %>->process();
    }
    <% } %>

}
