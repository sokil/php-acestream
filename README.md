ACE Stream Widget
=================

Installation
------------
```
"require": {
    "sokil/php-acestream": "dev-master"
}
```

Usage
-----

Incluging JS scripts can be done directry or through some asset manager.
Direct inclusion:
```
<script type="text/javascript" src="/js/core.js" />
<script type="text/javascript" src="/js/player.js" />
<script type="text/javascript" src="/js/ext.js" />
```
Inclusion through Yii's asset manager in config file:
```
array(
    'components'        => array(
        'clientScript' => array(
            'packages' => array(
                'bootstrap' => array(
                    'baseUrl' => '/path/to/js',
                    'js'      => array('core.js', 'player.js., 'ext.js'),
                    'css'     => array(),
                    'depends' => array('jquery'),
                ),
            ),
        ),
    ),
)
```

Common usage:
```
<?php echo new \Sokil\ACEPlayer\Player(array(
    'debug' => true,
    'media' => array(
        'url'   => 'http://example.com/film.torrent',
        'name'  => 'Film Title',
    ),
    'height' => '200px',
); ?>
```

Yii Framework template:
```
<?php $this->widget('application.extensions.ACEPlayer', array(
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