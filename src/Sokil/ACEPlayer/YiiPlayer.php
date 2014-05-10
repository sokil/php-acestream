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
    
    public function run()
    {
        static $jsloaded = false;
        
        if(!$jsloaded) {
            $jsloaded = true;
            
            $path = \Yii::app()->clientScript
                ->getAssetManager()
                ->publish('../../../js');

            \Yii::app()->clientScript->registerScriptFile($path . '/code.js');
            \Yii::app()->clientScript->registerScriptFile($path . '/player.js');
            \Yii::app()->clientScript->registerScriptFile($path . '/ext.js');
        }
        
        echo $this->_player;
    }
}