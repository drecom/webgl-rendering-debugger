export default interface Inspector {
    /**
     * Returns tasks that will be invoked in WebGLRenderingContext method.
     * Returning function should not be named since it causes call stack loop.
     */
    getInvokingTasks(): {
        [key: string]: Function[];
    };
}
