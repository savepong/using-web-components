## Useful Resources & Links

### Useful resources:

- Official Docs on Stencil.js Config: https://stenciljs.com/docs/config

- Official Distribution Guide: https://stenciljs.com/docs/distribution

- Official Guide on Framework Integration: https://stenciljs.com/docs/overview

### IE & Polyfills

At this point of time, the automatic polyfill-loading of Stencil.js-generated components unfortunately is a bit buggy when it comes to CSS properties and IE11. See this issue thread: https://github.com/ionic-team/stencil/issues/1257

Though, as you can tell by the discussion in this thread, we might never see a fix for that bug.

So if you need to support IE11 right now, it's best to not use CSS properties or bring your own polyfill.
