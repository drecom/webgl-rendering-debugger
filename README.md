# webgl-rendering-debugger

webgl-rendering-debugger is a debug tool for WebGL.

It adds debug process to WebGLRenderingContext method.

Overloaded methods are executed as before.

# Usage

## Attach debugger
```
import WebGLRenderingDebugger, { DrawCall } from 'webgl-rendering-debugger';

var webglDebug = new WebGLRenderingDebugger(webglContext);
webglDebug.attach(WebGLRenderingDebugger.Inspectors.DRAW_CALLS);
```


## Inspecting draw calls
```
const inspector = webglDebug.getAttachedInstpector(WebGLRenderingDebugger.Inspectors.DRAW_CALLS);
console.log("drawCall", inspector.count);
inspector.resetCount();
```

### Detach debugger
```
webglDebug.detach(WebGLRenderingDebugger.Inspectors.DRAW_CALLS);
```

# Notice

It adds debugging process to WebGLRenderingContext methods.

Therefore, performance affect should be expected.
