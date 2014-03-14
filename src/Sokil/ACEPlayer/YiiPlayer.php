<?php

namespace Sokil\ACEPlayer;

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
    
    public function run()
    {
        echo $this->_player;
    }
}