<?php

use \Sokil\ACEPlayer\Player;

class YiiPlayer extends \CWidget
{
    private $_player;
    
    public function __construct($owner=null)
    {
        parent::__construct($owner);
        
        $this->_player = new Player;
    }
    
    public function __call($name, $arguments) {
        $result = call_user_func_array(array($this->_player, $name), $arguments);
        if($result instanceof Player) {
            return $this;
        }
        
        return $result;
    }
    
    public function __set($name, $value)
    {
        $this->_player->{$name} = $value;
    }
    
    public static function registerStaticFiles()
    {
        $path = \Yii::app()
            ->getAssetManager()
            ->publish(__DIR__ . '/../../../js');

        \Yii::app()->clientScript->registerScriptFile($path . '/core.js');
        \Yii::app()->clientScript->registerScriptFile($path . '/player.js');
        \Yii::app()->clientScript->registerScriptFile($path . '/ext.js');
    }
    
    public function run()
    {
        echo $this->_player;
    }
}