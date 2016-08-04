# hyperterm-alternatescroll for [hyperterm](https://hyperterm.org/)

Mousewheel/trackpad scrolling for alternate screen. (less, git log, nano, etc...)

## NOTE: This won't work for the current version of hyperterm.
You will need the following patch to your hyperterm in order for this plugin to work:

[Fix mapXDispatch && allow plugin to access onWheel](https://github.com/zeit/hyperterm/pull/563)

You can manually apply this patch to your local copy of hyperterm or just wait for hyperterm to update.

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

# License

The MIT License (MIT)

Copyright (c) 2016 lkzhao
