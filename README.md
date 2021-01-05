ACE Stream Widget
=================

Client for torrent player [AceStream](http://www.acestream.org/en/)

[![Latest Stable Version](https://poser.pugx.org/sokil/php-acestream/v/stable.png)](https://packagist.org/packages/sokil/php-acestream)
[![Total Downloads](http://img.shields.io/packagist/dt/sokil/php-acestream.svg)](https://packagist.org/packages/sokil/php-acestream)

Installation
------------
```
"require": {
    "sokil/php-acestream": "dev-master"
}
```

Common Usage
------------

Incluging JS scripts can be done directry or through some asset manager. Direct inclusion:
```html
<script type="text/javascript" src="/js/core.js" />
<script type="text/javascript" src="/js/player.js" />
<script type="text/javascript" src="/js/ext.js" />
```

Call widget in your template:
```php
<?php echo new \Sokil\ACEPlayer\Player(array(
    'debug' => true,
    'media' => array(
        'url'   => 'http://example.com/film.torrent',
        'name'  => 'Film Title',
    ),
    'height' => '200px',
); ?>
```

Usage in Yii Framework
----------------------

Add namespace 'vendor' somewhere in entry point file to register composer's vedror dir.
```php
define('APPLICATION_PATH', realpath(dirname(__FILE__) . '/../application'));
Yii::setPathOfAlias('vendor', APPLICATION_PATH . '/../vendor/');
```

Register static files in your controller
```php
Yii::import('vendor.sokil.php-acestream.src.Sokil.ACEPlayer.YiiPlayer');
YiiPlayer::registerStaticFiles();
```

Call widget in template
```php
<?php $this->widget('vendor.sokil.php-acestream.src.Sokil.ACEPlayer.YiiPlayer', array(
    'debug' => true,
    'media' => array(
        'url'   => 'http://example.com/film.torrent',
        'name'  => 'Film Title',
    ),
    'height' => '200px',
)); ?>
```

Parameters
----------
Parameter|Description
---------|-----------
debug    | Write debug data to console's log
media    | This can be url or array {'url' => '', 'name' => ''}. Url may be in any format: unicast, multicast, torrent link or even number of media in playlist
height   | Height of player. Width is always 100%
notInstalledPlayerMessage | Message that will be shown if AceStream Plugin not installed
