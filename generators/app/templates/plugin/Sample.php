<?php

<% for (hookPoint of hookPoints) { %>
require_once 'plg_<%= class_name %><%= hookPoint.cammelcased %>.php';
<% } %>

class <%= class_name %>
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
        <% for (hookPoint of hookPoints) { %>
          $objHelperPlugin->addAction('<%= hookPoint.original %>', array($this, '<%= hookPoint.cammelcased %>'));
        <% } %>
    }

    <% for (hookPoint of hookPoints) { %>
    function <%= hookPoint.cammelcased %>($objPage)
    {
        $<%= hookPoint.cammelcased %> = new plg_<%= class_name %><%= hookPoint.cammelcased %>;
        $<%= hookPoint.cammelcased %>->init($plg_head);
        $<%= hookPoint.cammelcased %>->process();
    }
    <% } %>

}
