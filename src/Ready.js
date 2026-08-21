import { lazyPromise } from "@default-js/defaultjs-common-utils/src/PromiseUtils.js";

/**
 * @module Ready
 *
 * Re-export of {@link lazyPromise}: a promise whose resolution can be
 * triggered from the outside and that exposes a `resolved` flag. It backs the
 * `ready` lifecycle of {@link module:Component}.
 *
 * @type {function(): Promise}
 */
export default lazyPromise;
