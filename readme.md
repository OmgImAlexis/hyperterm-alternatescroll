# hyperterm-alternatescroll for [hyperterm](https://hyperterm.org/)

Mousewheel/trackpad scrolling for alternate screen. (less, git log, nano, etc...)

## Requirement

Hyperterm **0.7.2** or the latest master branch.


# Demo

#### Without hyperterm-alternatescroll

![Without hyperterm-alternatescroll](media/without.gif)

#### With hyperterm-alternatescroll

![With hyperterm-alternatescroll](media/with.gif)

# Installation

add `hyperterm-alternatescroll` to `~/.hyperterm.js`'s plugin list.

```javascript
{
	//...
	plugins:["hyperterm-alternatescroll"],
}
```

# Config

You can tweak the scroll speed of this plugin in `~/.hyperterm.js`.
```
module.exports = {
  config: {
    // for hyperterm-alternatescroll plugin
    alternateScroll: {
      scrollSpeed: 80 // 1 to 100 is supported
    }
    // ...
  }
  // ...
}
```

# License

The MIT License (MIT)

Copyright (c) 2016 lkzhao
