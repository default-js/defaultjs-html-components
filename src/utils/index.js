import DefineComponentHelper from "./DefineComponentHelper.js";
import EventHelper from "./EventHelper.js";
import NodeHelper from "./NodeHelper.js";
import StyleHelper from "./StyleHelper.js";
import WeakData from "./WeakData.js";

/**
 * @module utils
 *
 * Aggregated helper modules of the component toolbox.
 *
 * @property {Object} DefineComponentHelper - helpers to register custom elements (see {@link module:utils/DefineComponentHelper}).
 * @property {Object} EventHelper - helpers to build component event names (see {@link module:utils/EventHelper}).
 * @property {Object} NodeHelper - helpers to traverse the DOM tree (see {@link module:utils/NodeHelper}).
 * @property {Object} StyleHelper - helpers to copy and load component styles (see {@link module:utils/StyleHelper}).
 * @property {typeof WeakData} WeakData - weakly referenced per-node data store (see {@link module:utils/WeakData}).
 */
export default {DefineComponentHelper, EventHelper, NodeHelper, StyleHelper, WeakData};
