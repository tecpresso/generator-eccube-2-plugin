<?php
// 参考（継承元）クラスについて
// https://github.com/EC-CUBE/eccube-2_13/blob/master/data/class/pages/<%= class_path %>/<%= original_class %>.php;
require_once CLASS_EX_REALDIR . 'page_extends/<%= class_path %>/<%= original_class %>_Ex.php';

class <%= new_class_name %> extends <%= original_class %>_Ex
{


    /**
     * Page を初期化する.
     *
     * @return void
     */
    function init()
    {
        parent::init();
    }

    /**
     * Page のプロセス.
     *
     * @return void
     */
    function process()
    {
        parent::process();
        exit();
    }

    /**
     * Page のアクション.
     *
     * @return void
     */
    public function action()
    {
        parent::action();

    }

}
