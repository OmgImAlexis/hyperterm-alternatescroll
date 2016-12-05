# hyperterm-alternatescroll for [hyperterm](https://hyperterm.org/)

[![npm version](https://img.shields.io/npm/v/hyperterm-alternatescroll.svg)](https://www.npmjs.com/package/hyperterm-alternatescroll)

Missing feature for Hyper! This plugin allows you to use your scrollwheel/trackpad within apps like less, git log, nano, etc... 

## Requirement

Hyper **0.8.0** or the latest master branch.

# Demo

#### Without hyperterm-alternatescroll

<img src="media/without.gif" width="388"/>

#### With hyperterm-alternatescroll

<img src="media/with.gif" width="388"/>

# Installation

add `hyperterm-alternatescroll` to `~/.hyper.js`'s plugin list.

```javascript
{
	//...
	plugins:["hyperterm-alternatescroll"],
}
```

# Config

You can tweak the scroll speed in `~/.hyper.js`.
```javascript
module.exports = {
  config: {
    // for hyperterm-alternatescroll plugin
    alternateScroll: {
      // 1 to 100 is supported
      scrollSpeed: 80
    }
  }
}
```

# License

The MIT License (MIT)

Copyright (c) 2016 lkzhao
